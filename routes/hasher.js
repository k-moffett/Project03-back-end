const crypto = require('crypto')

const hasher = (pass) => {
        const hash = crypto.createHash('sha256').update(`${pass}`).digest('hex')
        return hash
    }

module.exports = hasher;
