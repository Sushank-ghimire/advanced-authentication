// Api Error message for Each Errors
class ApiError extends Error {
  constructor(
    status,
    message = "Internal server error",
    success = false,
    errors = []
  ) {
    super(message);
    this.status = status;
    this.success = success;
    this.errors = errors;
  }
}

export default ApiError;
