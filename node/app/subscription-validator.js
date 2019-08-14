exports.isValid = function(data) {
    if (data &&
        data.endpoint && typeof data.endpoint === 'string' && data.endpoint.includes('https') &&
        data.keys && typeof data.keys === 'object' &&
        data.keys.p256dh && typeof data.keys.p256dh === 'string' &&
        data.keys.auth && typeof data.keys.auth === 'string'
    ) return true;

    return false;
}
