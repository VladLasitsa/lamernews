module.exports = function(res, isLoginRequest) {
    return function(err) {
        if (isLoginRequest) {
            return res(null, null);
        } else {
            return res.status(500).json({
                error: err
            });
        }
    };
};
