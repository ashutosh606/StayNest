module.exports = function (fn) {
    return function (req, res, next) {
        // Ensure fn is an async function
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
