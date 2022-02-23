const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const authenticationMiddleware = async (req, res, next)  => {
    const authHeaders = req.headers.authorization
    if(!authHeaders || !authHeaders.startsWith('Bearer ')){
        throw new UnauthenticatedError('No Token')
    }

    const token = authHeaders.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {id, username} = decoded
        req.user = {id, username}
        next()
    } catch (error) {
        throw new UnauthenticatedError('No Authorized to access this route')
    }
}

module.exports = authenticationMiddleware