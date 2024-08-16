const twilio = require("twilio");

exports.phoneSendOTP = async (req, res) => {
  const { phoneNumber } = req.body; // Phone Number format +1234567890
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const serviceId = process.env.TWILIO_PHONE_SERVICE_SID;
    const client = twilio(accountSid, authToken);
    
    const verification = await client.verify.v2
    .services(serviceId)
    .verifications.create({ to: phoneNumber, channel: "sms" });
    
    res.status(200).send(`Verification code sent: ${verification.sid}`);
  } catch (error) {
    res.status(500).send(`Error sending verification code: ${error.message}`);
  }
};

exports.phoneOTPVerification = async (req, res) => {
  const { phoneNumber, code } = req.body; //Phone Number format +1234567890
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const serviceId = process.env.TWILIO_PHONE_SERVICE_SID;
    const client = require("twilio")(accountSid, authToken);

    const verificationCheck = await client.verify.v2
      .services(serviceId)
      .verificationChecks.create({ to: phoneNumber, code: code });

    if (verificationCheck.status === "approved") {
      res.send("Phone number verified!");
    } else {
      res.send("Invalid verification code.");
    }
  } catch (error) {
    res.send("Error verifying code:" + error);
  }
};
