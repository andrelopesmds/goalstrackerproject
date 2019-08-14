var response = {};

response.created = {
    statusCode: 201,
    message: 'Subscription successfully created!'
};

response.badRequest = {
    statusCode: 400,
    message: 'Bad request'
};

response.internalError = {
    statusCode: 500,
    message: 'Internal server error'
};

module.exports = response;
