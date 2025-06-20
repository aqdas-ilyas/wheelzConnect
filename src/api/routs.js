export const BASE_URL = 'http://ec2-13-60-3-16.eu-north-1.compute.amazonaws.com/api/v1/';

export default {
  // -----AUTH------//
  socialLogin: BASE_URL + 'user/socialLogin',
  signIn: BASE_URL + 'user/login',
  signUp: BASE_URL + 'user/signup',
  otpVerifyEmail: BASE_URL + 'user/verify',
  sendOTP: BASE_URL + 'user/sendOTP',
  uploadFile: BASE_URL + 'user/upload',
  accountSetup: BASE_URL + 'user/acount-setup',
  updateProfile: BASE_URL + 'user/',
  forgetPassword: BASE_URL + 'user/forgotPassword',
  verifyOTPResetPassword: BASE_URL + 'user/verifyOTPResetPassword',
  resetPassword: BASE_URL + 'user/resetPassword',
  updateMyPassword: BASE_URL + 'user/updateMyPassword',
  logout: BASE_URL + 'user/logout',

  // -----USER------//
};
