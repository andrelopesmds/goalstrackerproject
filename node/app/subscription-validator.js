exports.isValid = function(data) {
    if (data && data.endpoint && data.keys && data.keys.p256dh && data.keys.auth) {
        return true;
    }

    return false;
}
