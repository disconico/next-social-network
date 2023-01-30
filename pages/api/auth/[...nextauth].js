import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

import { verifyPassword } from '../../../lib/auth';
import dbConnect from '../../../lib/db/dbConnect';
import User from '../../../models/User';

export default NextAuth({
  session: {
    jwt: true,
    strategy: 'jwt',
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days * 2
  },
  secret: process.env.AUTH_SECRET,
  debug: true,
  // Specify Provider
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      credentials: {
        email: { label: 'E-mail', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error('No user found!');
        }

        // compare given password with hashed password from database
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error('Wrong Password !');
        }
        user.id && console.log('user:', user);

        if (user) {
          return {
            email: user.email,
            name: user.firstName,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
  },
});
