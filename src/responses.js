// function to send a json object
const respond = (request, response, status, content, type) => {
    
    response.writeHead(status, { 'Content-Type': type });

    response.write(content);

    response.end();
};

// success function
const success = (request, response, acceptedTypes) => {
    // message to send
    const responseObj = {
        message: 'This is a successful response',
    };

    if(acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${responseObj.message}</message>`;
        responseXML = `${responseXML} </response>`;

        return respond(request, response, 200, responseXML, 'text/xml');
    }

    const responseString = JSON.stringify(responseObj);

    return respond(request, response, 200, responseString, 'application/json');

};

// bad request function
const badRequest = (request, response, params, acceptedTypes) => {
    // message to send
    const responseObj = {
        message: 'This request has the required parameters',
    };

    // if request does not contain valid=true query param
    if(!params.valid || params.valid !== 'true') {
        // set error msg
        responseObj.message = 'Missing valid query parameter set to true';
        // give the error an id
        responseObj.id = 'badRequest';

        if(acceptedTypes[0] === 'text/xml') {
            let responseXML = '<response>';
            responseXML = `${responseXML} <message>${responseObj.message}</message>`;
            responseXML = `${responseXML} <id>${responseObj.id}</id>`;
            responseXML = `${responseXML} </response>`;
    
            return respond(request, response, 400, responseXML, 'text/xml');
        }

            const responseString = JSON.stringify(responseObj);
            return respond(request, response, 400, responseString, 'application/json');
    }

    if(acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${responseObj.message}</message>`;
        responseXML = `${responseXML} </response>`;

        return respond(request, response, 200, responseXML, 'text/xml');
    }

    const responseString = JSON.stringify(responseObj);

    // if query param is here, send json with success
    return respond(request, response, 200, responseString, 'application/json');
};

// unauthorized function
const unauthorized = (request, response, params, acceptedTypes) => {
    // message to send
    const responseObj = {
        message: 'This request has the required parameters',
    };

    // if request does not contain loggedIn=yes param
    if(!params.loggedIn || params.loggedIn !== 'yes') {
        // set error msg
        responseObj.message = 'Missing loggedIn query parameter set to yes';
        // give the error an id
        responseObj.id = 'unauthorized';
        
        if(acceptedTypes[0] === 'text/xml') {
            let responseXML = '<response>';
            responseXML = `${responseXML} <message>${responseObj.message}</message>`;
            responseXML = `${responseXML} <id>${responseObj.id}</id>`;
            responseXML = `${responseXML} </response>`;
    
            return respond(request, response, 401, responseXML, 'text/xml');
        }

        const responseString = JSON.stringify(responseObj);

        return respond(request, response, 401, responseString, 'application/json');
    }

    if(acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${responseObj.message}</message>`;
        responseXML = `${responseXML} </response>`;

        return respond(request, response, 200, responseXML, 'text/xml');
    }

    const responseString = JSON.stringify(responseObj);

    // if query param is here, send json with success
    return respond(request, response, 200, responseString, 'application/json');
};


// forbidden function
const forbidden = (request, response, acceptedTypes) => {
    // message to send 
    const responseObj = {
        message: 'You do not have access to this content',
    };

    if(acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${responseObj.message}</message>`;
        responseXML = `${responseXML} </response>`;

        return respond(request, response, 403, responseXML, 'text/xml');
    }

    const responseString = JSON.stringify(responseObj);

    respond(request, response, 403, responseString, 'application/json');
};

// internal function
const internal = (request, response, acceptedTypes) => {
    // message to send
    const responseObj = {
        message: 'Internal server error. Something went wrong.',
    };

    if(acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${responseObj.message}</message>`;
        responseXML = `${responseXML} </response>`;

        return respond(request, response, 500, responseXML, 'text/xml');
    }

    const responseString = JSON.stringify(responseObj);

    respond(request, response, 500, responseString, 'application/json');
};

// notImplemented function
const notImplemented = (request, response, acceptedTypes) => {
    // message to send
    const responseObj = {
        message: 'A get request for this page has not been implemented yet. Check again later for updated content',
    };

    if(acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${responseObj.message}</message>`;
        responseXML = `${responseXML} </response>`;

        return respond(request, response, 501, responseXML, 'text/xml');
    }

    const responseString = JSON.stringify(responseObj);

    respond(request, response, 501, responseString, 'application/json');
};

// not found function
const notFound = (request, response, acceptedTypes) => {
    // message to send
    const responseObj = {
        message: 'The page you are looking for was not found.',
        id: 'notFound',
    };

    if(acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${responseObj.message}</message>`;
        responseXML = `${responseXML} </response>`;

        return respond(request, response, 404, responseXML, 'text/xml');
    }

    const responseString = JSON.stringify(responseObj);

    respond(request, response, 404, responseString, 'application/json');
};


module.exports = {
    success,
    badRequest,
    unauthorized,
    forbidden,
    internal,
    notImplemented,
    notFound,
};