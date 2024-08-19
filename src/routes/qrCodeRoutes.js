const express = require("express");
const router = express.Router();
const { generateQR } = require("../controllers/qrFunctioalityController");
const { linkFamilyMember } = require("../controllers/userPatientControllers");

router.post('/generateQr/:patientId', generateQR)
router.post('/scanToLink', linkFamilyMember)

module.exports = router;
