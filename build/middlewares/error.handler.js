"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.logError = void 0;
const logError = (err, req, res, next) => {
    console.log("logError");
    console.log(err);
    next(err);
};
exports.logError = logError;
// function logError (err:error, req:Request, res:Response, next:NextFunction) {
//     console.log('logError');
//     console.log(err);
//     next(err);
// }
const errorHandler = (err, req, res, next) => {
    console.log("function -> errorHandler");
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    });
};
exports.errorHandler = errorHandler;
// module.exports = {
//     logError,
//     errorHandler
// }
