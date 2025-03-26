const { constants } = require('../constants');
// HANDLE ROUTE ERRORS
const routeNotFound = (req, res, next) =>{
    const error = new Error(`Routes Not Found ${req.originalUrl}` );
    res.status(404);
    next(error);
}


// HANDLE ERROR
// const errorHandler = (err, req, res, next) => {
//     let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//     let message = err.message;
//     // res.status(statusCode).json({
//     //     message: error.message,
//     //     stack: process.env.NODE_ENV === 'production' ? null : error.stack,
//     // });


//      if(err.name === 'CastError' && err.kind === 'ObjectId'){
//         statusCode = 404;
//         message = 'Resource not found';
//     };

//     res.status(statusCode).json({
//         message: message,
//         stack: process.env.NODE_ENV === 'production' ? null : err.stack,
//     });
// };

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    // res.json({ Message: err.message, stackTrace: err.stack });

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: "VALIDATION ERROR", Message: err.message, stackTrace: err.stack });
            break;
        case constants.NOT_FOUND:
            res.json({ title: "NOT FOUND", Message: err.message, stackTrace: err.stack });

        case constants.FORBIDDEN:
            res.json({ title: "FORBIDDEN:", Message: err.message, stackTrace: err.stack });

        case constants.UNAUTHORIZED:
            res.json({ title: "UNAUTHORIZED:", Message: err.message, stackTrace: err.stack });

        case constants.SERVER_ERROR:
            res.json({ title: "SERVER ERROR:", Message: err.message, stackTrace: err.stack });

        default:
            console.log("No Error Found");
            break;
    }
};


module.exports = {errorHandler, routeNotFound};