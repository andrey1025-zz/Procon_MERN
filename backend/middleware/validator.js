const responseStatus = require('../enums/responseStatus');

module.exports = (schema) => validator = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error)
        return res.json({ status: responseStatus.failure, errorMessage: formatError(error) });
    next();
};

const formatError = ({ details }) => {
    return Object.assign({}, ...details.map(item => ({ [item.context.key]: item.message })));
}