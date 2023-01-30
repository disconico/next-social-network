import { hashPassword, isAlphanumeric } from '../../../lib/auth';
import dbConnect from '../../../lib/db/dbConnect';
import User from '../../../models/User';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  console.log('req.body: ', req.body);

  const { firstName, lastName, email, password, isAwesome } = req.body;

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 8 ||
    password.trim().length > 20
  ) {
    res.status(422).json({
      message:
        'Invalid input - password should also be at least 7 characters long.',
    });
    return;
  }

  console.log('firstName : ', firstName, isAlphanumeric(firstName));

  // Add alphanumerical check for password, firstName, lastName
  if (
    !firstName ||
    !lastName ||
    !firstName.trim().length ||
    !lastName.trim().length ||
    isAlphanumeric(firstName) === false ||
    isAlphanumeric(lastName) === false
  ) {
    res.status(422).json({
      message: 'Invalid input - firstName and lastName should be alphanumeric.',
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
  const user = await User.create({
    user: firstName.trim(),
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim(),
    password: hashedPassword,
    isAwesome,
  });
  console.log(user);
  // return success message
  res.status(201).json({ message: 'Created user!' });
}

export default handler;
