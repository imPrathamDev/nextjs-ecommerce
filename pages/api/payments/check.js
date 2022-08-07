import PaytmChecksum from "paytmchecksum";

export default async function handler(req, res) {
    // var paytmChecksum = "";
    var paytmParams = {};
    const received_data = req.body;
//     for (var key in received_data) {
//         if (key == "CHECKSUMHASH") {
//             paytmChecksum = received_data[key];
//         } else {
//             paytmParams[key] = received_data[key];
//         }
//     }

//     var isValidChecksum = PaytmChecksum.verifychecksum(paytmParams, "TIugJQ46281608378767", paytmChecksum);
//     if (isValidChecksum) {
//         console.log("Checksum Matched");
//         return res.json({ status: 'Checksum Matched' })
//     } else {
//         console.log("Checksum Mismatched");
//         return res.json({ status: 'Checksum Mismatched' })
//     }

var paytmChecksum = req.body.CHECKSUMHASH;

var isVerifySignature = PaytmChecksum.verifySignature(received_data, "TIugJQ46281608378767", paytmChecksum);
if (isVerifySignature) {
	console.log("Checksum Matched");
} else {
	console.log("Checksum Mismatched");
}
}