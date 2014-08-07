module.exports = function () {

    return function (err, req, res, next) {
        // respect err.status
        if (err.status) {
            res.statusCode = err.status
        }

        // default status code to 500
        if (res.statusCode < 400) {
            res.statusCode = 500
        }

        // since this is for fun always log to console.
        console.error(err.stack || String(err));

        // we always respond in json
        var error = { message: err.message };
        // for (var prop in err) error[prop] = err[prop];
        var json = JSON.stringify({ error: error });


        res.setHeader('Content-Type', 'application/json');
        res.end(json);
    };
};