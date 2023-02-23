import multer from 'multer';
import nc from 'next-connect';
import AWS from 'aws-sdk';
import dbConnect from '../../../lib/db/dbConnect';
import { getSession } from 'next-auth/react';
import User from '../../../models/User';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const handler = nc({
  onError(error, req, res) {
    res.status(501).json({ message: 'Sorry something went wrong' });
    console.log('error: ', error);
  },
  onNoMatch(req, res) {
    res.status(405).json({ message: 'Method not allowed' });
  },
})
  .use(multer().single('image'))
  .post(async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const userId = session.user.id;

    // get parsed image from multer
    console.log('req.file: ', req.file);
    const image = req.file;

    try {
      // upload image to s3 bucket
      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Body: image.buffer,
        Key: `${userId}/${image.originalname}`,
        ACL: 'public-read',
      };
      const uploadedResponse = await s3.upload(params).promise();

      // returning image
      const imageUrl = uploadedResponse.Location;
      const publicId = uploadedResponse.key;
      const imageSignature = uploadedResponse.ETag;

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
      console.log('Image POST API :', err);
      res.status(406).json({ message: err.message });
    }
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
