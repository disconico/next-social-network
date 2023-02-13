import multer from 'multer';
import nc from 'next-connect';
import path from 'path';
import DatauriParser from 'datauri/parser';
import cloudinary from '../../../lib/cloud/cloudinary';
import dbConnect from '../../../lib/db/dbConnect';
import { getSession } from 'next-auth/react';
import User from '../../../models/User';

const handler = nc({
  onError(error, req, res) {
    res.status(501).json({ message: 'Sorry something went wrong' });
    console.log('error: ', error);
  },
  onNoMatch(req, res) {
    res.status(405).json({ message: 'Method not allowed' });
  },
})
  .use(multer().any())
  .post(async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const userId = session.user.id;

    // get parsed image from multer
    const image = req.files[0];

    // create datauri parser
    const parser = new DatauriParser();

    try {
      // create image
      const createImage = async (img) => {
        // convert buffer to base64
        const base6img = parser.format(
          path.extname(img.originalname).toString(),
          img.buffer
        ).content;

        // upload image to cloudinary
        const uploadedResponse = await cloudinary.uploader.upload(
          base6img,
          'DiscoNetwork',
          { resource_type: 'image' }
        );

        // return image
        return uploadedResponse;
      };

      // saving information about image
      const createdImage = await createImage(image);
      console.log('createdImage: ', createdImage);
      const imageUrl = createdImage.secure_url;
      const publicId = createdImage.public_id;
      const imageSignature = createdImage.signature;

      // saving image to database
      await dbConnect();

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
      console.log('Image POST API :', err.message);
      res.status(406).json({ message: err.message });
    }
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
