const Token = require('../../../models').Token;

// TO-DO: Better error reporting based on what's invalid. Translate errors.
module.exports = async (req, res, next) => {
    if (!req.get('Authorization')) {
        return res.status(401).send('Invalid token.');
    }

    const authorization = req.get('Authorization').split(' ');

    if (authorization.length !== 2) {
        return res.status(401).send('Invalid token.');
    }

    const data = await Token.findOne({
        where: {
            token: authorization[1],
        },
    });

    if (!data) {
        return res.status(401).send('Invalid token.');
    }

    return next();
}