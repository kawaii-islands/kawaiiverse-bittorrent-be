exports.successResponse = (res, msg) => {
    const data = {
        status: 1,
        message: msg,
    };
    return res.status(200).json(data);
};

exports.successResponseWithData = (res, msg, data) => {
    const resData = {
        status: 1,
        message: msg,
        data,
    };
    return res.status(200).json(resData);
};

exports.ErrorResponse = (res, msg) => {
    const data = {
        status: 0,
        message: msg,
    };
    return res.status(500).json(data);
};

exports.notFoundResponse = (res, msg) => {
    const data = {
        status: 0,
        message: msg,
    };
    return res.status(404).json(data);
};

exports.validationErrorWithData = (res, msg, data) => {
    const resData = {
        status: 0,
        message: msg,
        data,
    };
    return res.status(400).json(resData);
};

exports.unauthorizedResponse = (res, msg) => {
    const data = {
        status: 0,
        message: msg,
    };
    return res.status(401).json(data);
};
