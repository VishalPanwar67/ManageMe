class apiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { apiResponse };

// const registerUser = asyncHandler(async (req, res) => {
//   if (existingUser) {
//     throw new apierror(409, "user with username exist");
//   }

//   if (!avatarLocalPath) {
//     throw new apierror(404, "avatar file is required");
//   }
//   return res
//     .status(201)
//     .json(new apiresponse(200, createdUser, "user registered successfully"));
// });
