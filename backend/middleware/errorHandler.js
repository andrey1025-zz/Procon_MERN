const responseStatus = require('../enums/responseStatus');
const { unauthorized } = require('../enums/responseStatus');

function errorHandler(err, req, res, next) {
    var response = {
        status: responseStatus.failure
    };

    switch (true) {
        case typeof err === 'string':
            // custom application error
            const is404 = err.toLowerCase().endsWith('not found');
            const statusCode = is404 ? 404 : 400;
            return res.status(statusCode).json({
                ...response,
                errorMessage: {
                    ...response.errorMessage,
                    fatalError: err
                }
            });
        case err.name === 'ValidationError':
            // mongoose validation error
            return res.status(400).json({
                ...response,
                errorMessage: {
                    ...response.errorMessage,
                    fatalError: err.message
                }
            });
        case err.name === 'UnauthorizedError':
            // jwt authentication error
            return res.status(401).json({
                ...response,
                status: responseStatus.failure,
                errorMessage: {
                    ...response.errorMessage,
                    authError: responseStatus.unauthorized
                }
            });
        default:
            return res.status(500).json({
                ...response,
                errorMessage: {
                    ...response.errorMessage,
                    fatalError: err.message
                }
            });
    }
}
module.exports = errorHandler;