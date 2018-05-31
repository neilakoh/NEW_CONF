module.exports = {
    TestCallback: function(val, callback) {
        callback(val);
        this.TestCallback(callback);
    },
    TestPromise: function(value) {
        return new Promise((resolve) => {
            resolve({
                success: true,
                data: value
            });
        });
    }
}