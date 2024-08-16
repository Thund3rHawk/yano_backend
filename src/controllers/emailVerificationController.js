const twilio = require("twilio");

exports.emailSendOTP = async (req, res) => {
  const { email } = req.body; // Phone Number format +1234567890
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const emailServiceId = process.env.TWILIO_EMAIL_SERVICE_ID;
    const client = twilio(accountSid, authToken);

    const verification = await client.verify.v2
      .services(emailServiceId)
      .verifications.create({
        channel: "email",
        to: email,
      });

    res.send("Verification code send successfully" + verification.sid);
  } catch (error) {
    res.status(500).send(`Error sending verification code: ${error.message}`);
  }
};

exports.emailOTPVerification = async (req, res) => {
  const { email, code } = req.body; //Phone Number format +1234567890
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const emailServiceId = process.env.TWILIO_EMAIL_SERVICE_ID;
    const client = twilio(accountSid, authToken);

    const verificationCheck = await client.verify.v2
      .services(emailServiceId)
      .verificationChecks.create({
        code: code,
        to: email,
      });

    if (verificationCheck.status === "approved") {
      res.send("Email verified!" + verificationCheck.sid);
    } else {
      res.send("Invalid verification code.");
    }
  } catch (error) {
    res.send("Error verifying code:" + error);
  }
};
