const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// configure Multer to handle multipart/form-data
const storage = multer.diskStorage({});
const upload = multer({ storage });

// define the route handler for the image upload
export default async function handler(req, res) {
  try {
    upload.single('image')(req, res, async function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
      }

      // upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      // send the response with the uploaded image URL
      res.status(200).json({ url: result.secure_url });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
