export class ApiError extends Error {
  constructor(message, statusCode = 500, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.name = 'ApiError';
  }

  static badRequest(message, details = null) {
    return new ApiError(message, 400, details);
  }

  static notFound(message = 'Recurso no encontrado') {
    return new ApiError(message, 404);
  }

  static conflict(message) {
    return new ApiError(message, 409);
  }

  static internalError(message = 'Error interno del servidor') {
    return new ApiError(message, 500);
  }
}
