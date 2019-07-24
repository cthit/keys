const asPromise = request => {
    return new Promise((resolve, reject) => {
        request().end((err, res) => {
            resolve(err, res);
        });
    });
};

module.exports = {
    asPromise
};
