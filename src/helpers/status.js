const responseStatus = (success, status, message = "Success", data) => {
  if (success) {
    if (status === "ok") {
      return { success, status: 200, message, data };
    } else if (status === "created") {
      return {
        success,
        status: 201,
        message: `New ${message} is Successfully Created.`,
        data,
      };
    } else if (status === "no-content") {
      return { success, status: 204, message: `${message}` };
    }
  } else {
    if (status === "bad") {
      return { success, status: 400, message };
    } else if (status === "unauthorized") {
      return { success, status: 401, message };
    } else if (status === "forbidden") {
      return { success, status: 403, message };
    } else if (status === "not-found") {
      return { success, status: 404, message };
    } else if (status === "conflict") {
      return { success, status: 409, message };
    } else if (status === "internal-server-error") {
      return { success, status: 500, message };
    } else if (status === "service-unavailable") {
      return { success, status: 503, message };
    }
  }
};

module.exports = responseStatus;

// 200 OK: This status code indicates that the request was successful and that the server has returned the requested data.
// 201 Created: This status code is used to indicate that a new resource has been created as a result of a POST request.
// 204 No Content: This status code is used to indicate that the server successfully processed a DELETE or PATCH request and that there is no additional information to return.
// 400 Bad Request: This status code is used when the server cannot or will not process a request because it is malformed or otherwise invalid.
// 401 Unauthorized: This status code is used when the server requires authentication and the request is missing credentials or the provided credentials are invalid.
// 403 Forbidden: This status code is used when the server understands the request, but refuses to authorize it.
// 404 Not Found: This status code is used when the server cannot find the requested resource.
// 409 Conflict: This status code is used when a request would cause a conflict with the current state of the resource.
// 500 Internal Server Error: This status code is used when an unexpected error occurs on the server.
// 503 Service Unavailable: This status code is used when the server is temporarily unable to handle the request.
