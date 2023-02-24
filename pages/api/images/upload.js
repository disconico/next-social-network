import multer from 'multer';
import nc from 'next-connect';
import path from 'path';
import DatauriParser from 'datauri/parser';
import cloudinary from '../../../lib/cloud/cloudinary';
import dbConnect from '../../../lib/db/dbConnect';
import { getToken } from 'next-auth/jwt';
import User from '../../../models/User';
import Comment from '../../../models/Comment';

const handler = nc({
  onError(error, req, res) {
    res.status(501).json({ message: 'Sorry something went wrong' });
    console.log('error: ', error);
  },
  onNoMatch(req, res) {
    res.status(405).json({ message: 'Method not allowed' });
  },
})
  // This code uses the multer package to handle file uploads. The multer.any() function
  // is called to handle any file upload. The multer package is used to handle file uploads
  // in the app.
  .use(multer().any())
  .post(async (req, res) => {
    await dbConnect();
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const userId = token.uid;

    // get parsed image from multer
    const image = req.files[0];

    // create datauri parser
    const parser = new DatauriParser();

    try {
      // convert buffer to base64
      const base64img = parser.format(
        path.extname(image.originalname).toString(),
        image.buffer
      ).content;

      // upload image to cloudinary
      const uploadedResponse = await cloudinary.uploader.upload(
        base64img,
        'DiscoNetwork',
        { resource_type: 'image' }
      );

      // returning image
      const imageUrl = uploadedResponse.secure_url;
      const publicId = uploadedResponse.public_id;
      const imageSignature = uploadedResponse.signature;

      const user = await User.findById(userId);

      // update user with new profile image
      const profileImage = {
        imageUrl,
        publicId,
        imageSignature,
      };

      user.profilePicture = profileImage;
      await user.save();
      console.log('user: ', user.profilePicture);

      res.status(200).json({ profileImage });
    } catch (err) {
      console.log('Image POST API :', err);
      res.status(406).json({ message: err.message });
    }
  });

// This code initializes the Next.js API with a custom configuration
// that disables the body parser. This is necessary because the Next.js
// API doesn't support parsing binary data, which is required by
// the documentation generation process.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
