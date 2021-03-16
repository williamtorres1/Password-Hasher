import { Router } from 'express';
import { hash, generateSalt, compare } from './hash';

import User from './models/User';

const routes = Router();

routes.post('/login', async (request, response) => {
    try {
        const { email, password } = request.body;

        const user = await User.findOne({
            email: email
        })
        if (!user) {
            return response.status(400).json({ error: "User not found" })
        }
        const matchedRequest = await compare(password, user.password)
        if (matchedRequest) {
            return response.status(200).json(user)
        }
    }
    catch (error) {
        return response.status(400).json({ error: error.message })
    }
})

routes.post('/register', async (request, response) => {
    try {
        const { email } = request.body;

        const userExists = await User.findOne({ email })

        if (userExists) {
            return response.status(400).json({ error: 'User already exists.' })
        }

        const salt = generateSalt(10);
        const user = new User({
            name: request.body.name,
            email: request.body.email,
            password: await hash(request.body.password, salt)
        });
        const userSaved = await user.save();

        return response.status(201).json(userSaved);

    }
    catch (error) {
        return response.status(400).json({ error: error.message });
    }
})

export default routes;