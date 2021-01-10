const functions = require("firebase-functions");
// const Vision = require('@google-cloud/vision');
// const vision = Vision();
// const admin = require("firebase-admin");
// admin.initializeApp(functions.config().firebase);





// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.helloWorld = functions.https.onRequest((req, res) => {
    res.status(200).send('Hello, World!');
  });

exports.textDetection = functions.https.onRequest(async (req, res) => {
    
    const vision = require('@google-cloud/vision');

    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    // const bucketName = 'Bucket where the file resides, e.g. my-bucket';
    // const fileName = 'Path to file within bucket, e.g. path/to/image.png';

    // Performs text detection on the gcs file
    const [result] = await client.textDetection(`gs://nwhacks-80c9d.appspot.com/Movingout-1280x960-768x432-1507137849.jpg`);
    const detections = result.textAnnotations;
    console.log('Text:');
    var finalText = "";
    detections.forEach(text => {
        // console.log(text["description"])
        finalText += text["description"];
    });
    res.status(200).send(finalText);
})