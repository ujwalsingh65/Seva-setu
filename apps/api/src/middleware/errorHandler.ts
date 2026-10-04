import type { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  public statusCode: number;
  public code: string;

  constructor(message: string, statusCode = 400, code = 'BAD_REQUEST') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  const requestId = (req.headers['x-request-id'] as string) || `req_${Date.now()}`;
  const statusCode = 'statusCode' in err ? err.statusCode : 500;
  const errorCode = 'code' in err ? err.code : 'INTERNAL_SERVER_ERROR';

  // Safe message to the user; do not expose internal database errors or stack traces
  const message =
    statusCode === 500
      ? 'An unexpected error occurred. Please try again later.'
      : err.message || 'Operation failed';

  if (process.env.NODE_ENV !== 'production' && statusCode === 500) {
    console.error(`[Error] ${requestId}:`, err);
  }

  res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message,
    },
    requestId,
  });
}
