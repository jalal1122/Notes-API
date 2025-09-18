class ApiResponse {
  constructor(message, statusCode, data = null) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}

export default ApiResponse;
