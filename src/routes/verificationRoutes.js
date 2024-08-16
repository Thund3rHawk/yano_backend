const express = require("express");
const router = express.Router();
const { phoneSendOTP, phoneOTPVerification } = require("../controllers/phoneVerificationController");
const { emailOTPVerification, emailSendOTP } = require("../controllers/emailVerificationController");

router.post ('/phone/send-phone-verification-code', phoneSendOTP);

router.post ('/phone/verify-phone', phoneOTPVerification);

router.post ('/email/send-email-verification-code', emailSendOTP);

router.post ('/email/verify-email', emailOTPVerification);

module.exports = router;
