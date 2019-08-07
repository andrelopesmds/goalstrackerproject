function reflect(promise) {
    return promise.then(
        (v) => {
            return { status: 'fulfilled', value: v };
        },
        (error) => {
            return { status: 'rejected', reason: error };        
        }
    );
}

module.exports = reflect;
