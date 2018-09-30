const Metric = require('../../../models').Metric;

module.exports = (req, res, next) => {
    req.start = Date.now();

    res.once('finish', () => Metric.create({
        url: req.originalUrl,
        duration: Date.now() - req.start,
    }));

    next();
}