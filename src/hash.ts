'use strict';
interface Hash {
    salt: string;
    hashedPassword: string;
}

import crypto from 'crypto';

let logger = func => {
    console.log(func)
}

let generateSalt = rounds => {
    if (rounds >= 15) {
        throw new Error(`${rounds} is greater than 15, Must be less that.`)
    }
    if (typeof rounds !== 'number') {
        throw new Error('rounds must be a number')
    }
    if (rounds === null) {
        rounds = 12
    }

    return crypto
        .randomBytes(Math.ceil(rounds / 2))
        .toString('hex')
        .slice(0, rounds)
}

let hasher = async (password: string, salt: string) => {
    let hash = crypto.createHmac('sha512', salt)
    hash.update(password)
    let value = hash.digest('hex')
    return {
        salt: salt,
        hashedPassword: value
    }
}

let hash = async (password: string, salt: string) => {
    if (password === null || salt === null) {
        throw new Error('Must provide password and salt values.')
    }
    if (typeof password !== 'string' || typeof salt !== 'string') {
        throw new Error('password must be a string and salt must either be a salt string or a number of rounds')
    }
    return hasher(password, salt)
}
let compare = async (password: string, hash: Hash) => {
    if (password === null || hash === null) {
        throw new Error('Must provide password and hash values.')
    }
    if (typeof password !== 'string' || typeof hash !== 'object') {
        throw new Error('password must be a string and hash must either be a salt string or a number of rounds')
    }
    let passwordData = await hasher(password, hash.salt)
    if (passwordData.hashedPassword === hash.hashedPassword) {
        return true
    }
    return false
}

export { generateSalt, hash, compare };
