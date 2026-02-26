import { HttpResponse } from '../utils/http-response.js';
import { ApiError } from '../utils/api-error.js';

export function errorHandler(err, req, res, next) {
  console.error('Error:', err);

  if (err instanceof ApiError) {
    const response = HttpResponse.error(err.message, err.statusCode, err.details);
    return res.status(response.statusCode).json(response.body);
  }

  // Error genérico
  const response = HttpResponse.internalError(
    process.env.NODE_ENV === 'production' 
      ? 'Error interno del servidor' 
      : err.message
  );
  
  res.status(response.statusCode).json(response.body);
}
