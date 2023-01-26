import Head from 'next/head';
import Field from '../ui/Field';
import Input from '../ui/Input';
import Button from '../ui/Button';
import H1 from '../ui/headings/H1';
import H2 from '../ui/headings/H2';

import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

import { comparePasswords } from '../../lib/auth';

const AuthForm = ({ isLoggingIn }) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmedPassword: '',
  });

  const [signInError, setSignInError] = useState(null);

  const router = useRouter();

  const signUserIn = async () => {
    try {
      const status = await signIn('credentials', {
        redirect: false,
        email: user.email,
        password: user.password,
      });
      console.log('status:', status);
      if (!status.error) {
        router.push('/');
      } else if (status.error) {
        setSignInError(status.error);
        console.log(status.error);
      }
    } catch (err) {
      console.log(err);
      setSignInError(
        err.response.data.message ||
          `Oups ! Something went wrong : ${err.message}!`
      );
    }
  };

  const handleSubmit = async (e) => {
    setSignInError(null);
    e.preventDefault();

    if (isLoggingIn) {
      await signUserIn();
    } else if (!isLoggingIn) {
      try {
        const isValid = await comparePasswords(
          user.password,
          user.confirmedPassword
        );
        if (!isValid) {
          setSignInError('Passwords do not match!');
          return;
        }

        const res = await axios.post('/api/auth/sign-up', { ...user });
        if (res.status === 201) {
          console.log('res: ', res);
          await signUserIn();
          router.push('/app');
        }
      } catch (err) {
        setSignInError(
          err.response.data.message ||
            `Oups ! Something went wrong : ${err.message}!`
        );
        console.log('error :', err);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <Head>
        <title>{'Authentication - DiscoNetwork'}</title>
      </Head>
      <section className=' mx-auto h-full'>
        <main className='max-w-screen-lg mx-auto h-full flex flex-col items-center  justify-center'>
          <div className='sm:max-w-lg max-w-full w-96 p-4'>
            <H1>あなたの運命へようこそ</H1>
            <p>
              It&apos;s time to meet your destiny, register and chose your path
              between, <strong>Rōnin</strong>, <strong>Hatamoto</strong> and{' '}
              <strong>Shogun</strong>.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className='sm:max-w-lg max-w-full w-96 p-4'
          >
            <H2>Authentication form</H2>
            {!isLoggingIn && (
              <>
                <Field label={'First name :'}>
                  <Input
                    type='text'
                    name='firstName'
                    placeholder={'Jane *'}
                    value={user.firstName}
                    onChange={handleChange}
                    required
                  />
                </Field>
                <Field label={'Last name :'}>
                  <Input
                    type='text'
                    name='lastName'
                    placeholder={'Doe *'}
                    value={user.lastName}
                    onChange={handleChange}
                    required
                  />
                </Field>
              </>
            )}

            <Field label={'E-mail address :'}>
              <Input
                type='email'
                name='email'
                placeholder={'janedoe@letsgo.com *'}
                value={user.email}
                onChange={handleChange}
                autoComplete='username'
                required
              />
            </Field>
            <Field label={'Password :'}>
              <Input
                type='password'
                name='password'
                placeholder={'8-20 characters *'}
                value={user.password}
                onChange={handleChange}
                autoComplete='current-password'
                required
                minLength={8}
                maxLength={20}
              />
            </Field>

            {!isLoggingIn && (
              <>
                <Field label={'Confirm password :'}>
                  <Input
                    type='password'
                    name='confirmedPassword'
                    placeholder={'8-20 characters *'}
                    value={user.confirmedPassword}
                    onChange={handleChange}
                    autoComplete='current-password'
                    required
                    minLength={8}
                    maxLength={20}
                  />
                </Field>
              </>
            )}

            <Button type={'submit'}>{`${
              isLoggingIn ? 'Log In' : 'Sign up'
            }`}</Button>
            {signInError && <p className='text-red-700 mt-4'>{signInError}</p>}
          </form>
        </main>
      </section>
    </>
  );
};

AuthForm.propTypes = {
  isLoggingIn: PropTypes.bool,
};

export default AuthForm;
