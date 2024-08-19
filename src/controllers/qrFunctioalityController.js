const QRCode = require("qrcode");

exports.generateQR = async (req, res) => {
  const { patientId } = req.params;
  const qrData = `${patientId}`;
  try {
    const qrCode = await QRCode.toDataURL(qrData);
    res.json({ qrCode });
  } catch (error) {
    res.send("Qr making error" + error);
  }
};

