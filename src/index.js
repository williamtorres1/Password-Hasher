'use strict';

import crypto from 'crypto';
let logger = func => {
    console.log(func)
}

let generateSalt = rounds => {
    if (rounds >= 15) {
        throw new Error(`${rounds} is greather than 15, Must be less that.`)
    }
    if(typeof rounds !== 'number') {
        throw new Error('rounds must be a number')
    }
    if(rounds === null) {
        rounds = 12
    }

    return crypto
        .randomBytes(Math.ceil(rounds/2))
        .toString('hex')
        .slice(0, rounds)
}

let hasher = (password, salt) => {
    let hash = crypto.createHmac('sha512', salt)
    hash.update(password)
    let value = hash.digest('hex')
    return {
        salt: salt,
        hashedPassword: value
    }
}

let hash = (password, salt) => {
    if(password === null || salt === null) {
        throw new Error('Must provide password and salt values.')
    }
    if(typeof password !== 'string' || typeof salt !== 'string'){
        throw new Error('password must be a string and salt must either be a salt string or a number of rounds')
    }
    return hasher(password, salt)
}
let compare = (password, hash) => {
    hash = {
        salt: 'f844b09ff50c',
        hashedPassword: '2d2528d4534394d1e2702f53826d11c16ed4422f6bd466745cb4f1aa0e042b52b98fc5e65b86d73a6ce4807679b773fb955c4824b0471015354e1a872d42cb62'
    }
    if(password === null || hash === null) {
        throw new Error('Must provide password and hash values.')
    }
    if(typeof password !== 'string' || typeof hash !== 'object'){
        throw new Error('password must be a string and hash must either be a salt string or a number of rounds')
    }
    let passwordData = hasher(password, hash.salt)
    if(passwordData.hashedPassword === hash.hashedPassword) {
        return true        
    }
    return false
}

module.exports = {
    generateSalt,
    hash,
    compare
}