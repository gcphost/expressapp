const search = require('./lib');

module.exports = async (req, res) => {
    // TO-DO: Better error reporting based on what's invalid. Translate errors.
    if (
        !Object.keys(req.query).length ||
        typeof req.query.companies !== 'object' ||
        !req.query.companies.length ||
        req.query.companies.length > 25
    ) {
        return res.status(400).send('Invalid query.');
    }

    // TO-DO: cache entire results
    const data = await search(req.query.companies);

    return res.json({
        data,
        length: data.length,
    });
}

