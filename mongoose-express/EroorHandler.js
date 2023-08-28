// class ErrorHandler extends Error {
//     constructor(message, statusCode){
//         super(message);
//         this.statusCode = statusCode;
//         this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
//         this.isOperasional = true;
//         Error.captureStackTrace(this, this.constructor);
//     }
// }

class ErrorHandler extends Error {
    constructor(message, status){
        super();
        this.message = message;
        this.status = status
    }
}

module.exports = ErrorHandler