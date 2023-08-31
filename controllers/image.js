import Clarifai from "clarifai";

// const returnClarifaiRequestOptions = (imageUrl) => {
//   // Your PAT (Personal Access Token) can be found in the portal under Authentification
//   const PAT = 'fe32381332784883bd5893daeb917e86';
//   // Specify the correct user_id/app_id pairings
//   // Since you're making inferences outside your app's scope
//   const USER_ID = 'julesdowork';       
//   const APP_ID = 'smart-brain-2023';
//   // Change these to whatever model and image URL you want to use
//   const MODEL_ID = 'face-detection';   
//   const IMAGE_URL = imageUrl;

//   const raw = JSON.stringify({
//     "user_app_id": {
//         "user_id": USER_ID,
//         "app_id": APP_ID
//     },
//     "inputs": [
//       {
//         "data": {
//           "image": {
//             "url": IMAGE_URL
//           }
//         }
//       }
//     ]
//   });

//   const requestOptions = {
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Authorization': 'Key ' + PAT
//     },
//     body: raw
//   };

//   return requestOptions;
// }

const app = new Clarifai.App({
  apiKey: process.env.API_KEY
});

const handleApiCall = (req, res) => {
  // fetch("https://api.clarifai.com/v2/models/face-detection/outputs",
  //   returnClarifaiRequestOptions(req.body.input))
  app.models.predict("face-detection", req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json("Unable to work with API"))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users").where("id", '=', id)
  .increment("entries", 1)
  .returning("entries")
  .then(entries => {
    res.json(entries[0].entries);
  })
  .catch(err => res.status(400).json("Unable to get entries"))
}

export { handleImage, handleApiCall };