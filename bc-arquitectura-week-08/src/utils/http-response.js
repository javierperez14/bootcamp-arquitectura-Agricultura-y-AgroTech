export class HttpResponse {
  static success(data, statusCode = 200) {
    return {
      statusCode,
      body: {
        success: true,
        data,
        timestamp: new Date().toISOString()
      }
    };
  }

  static successWithMeta(data, meta, statusCode = 200) {
    return {
      statusCode,
      body: {
        success: true,
        data,
        meta,
        timestamp: new Date().toISOString()
      }
    };
  }

  static created(data) {
    return this.success(data, 201);
  }

  static noContent() {
    return {
      statusCode: 204,
      body: null
    };
  }

  static error(message, statusCode = 500, details = null) {
    return {
      statusCode,
      body: {
        success: false,
        error: {
          message,
          ...(details && { details }),
          statusCode
        },
        timestamp: new Date().toISOString()
      }
    };
  }

  static badRequest(message, details = null) {
    return this.error(message, 400, details);
  }

  static notFound(message = 'Recurso no encontrado') {
    return this.error(message, 404);
  }

  static conflict(message) {
    return this.error(message, 409);
  }

  static internalError(message = 'Error interno del servidor') {
    return this.error(message, 500);
  }
}
