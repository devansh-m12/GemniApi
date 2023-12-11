class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors =[],
        statch =""
    ){
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.data = data;
        this.message = message;
        this.succes = false;
        
        if(statch){
            this.statch = statch;
        }
        else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;