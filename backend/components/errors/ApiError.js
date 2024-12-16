class ApiError extends Error
{
    status;
    errors;

    constructor(status, message, errors = [])
    {
        super(message);
        this.status = status;
        this.message = message;
    }

    static UnathorizedError()
    {
        return new ApiError(401, 'Пользователь не авторизован');
    }

    static BadRequest(message, errors = [])
    {
        return new ApiError(404, message, errors);
    }

    static forbidden(message)
    {
        return new ApiError(403, message);
    }

    static IsAdmin()
    {
        return new ApiError(401, 'Недостаточно прав');
    }
    //test
    static CnotBf(message, errors = [])
    {
        return new ApiError(402, message, errors);
    }
}

module.exports = ApiError;