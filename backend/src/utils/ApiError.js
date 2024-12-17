// Api Error message for Each Errors
class ApiError {
  constructor(
    status,
    message = "Internal server error",
    success = false,
    errors = []
  ) {
    // super(message);
    this.status = status;
    this.success = success;
    this.message = message;
    this.errors = errors;
  }
}

export default ApiError;
