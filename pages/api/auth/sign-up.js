import { hashPassword } from '../../../lib/auth';
import dbConnect from '../../../lib/db/dbConnect';
import User from '../../../models/User';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  console.log('req.body: ', req.body);

  const { email, password } = req.body;

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        'Invalid input - password should also be at least 7 characters long.',
    });
    return;
  }

  await dbConnect();

  // MongoDB check if user with given email already exists
  const existingUser = await User.findOne({ email });
  // return error if user already exists
  if (existingUser) {
    console.log('existingUser:', existingUser);
    res.status(422).json({ message: 'User exists already!' });
    return;
  }

  // hash password
  const hashedPassword = await hashPassword(password);

  // MongoDB insert user into database
  const user = await User.create({ email, password: hashedPassword });
  console.log(user);
  // return success message
  res.status(201).json({ message: 'Created user!' });
}

export default handler;