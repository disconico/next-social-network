import Page from '../../components/layout/Page';
import Field from '../../components/ui/Field';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { signIn, getSession } from 'next-auth/react';

const SignInPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace('/app');
      } else {
        setLoading(false);
      }
    });
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // optional: Add validation

    try {
      const status = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      console.log('status:', status);
      if (!status.error) {
        router.push('/');
      } else if (status.error) {
        console.log(status.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Page title={'Sign In'}>
      <form onSubmit={handleSubmit}>
        <Field label={'E-mail'}>
          <Input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='username'
            required
          />
        </Field>

        <Field label={'Password'}>
          <Input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='current-password'
            required
          />
        </Field>
        <Button type={'submit'}>Submit</Button>
        {/* {signInError && <p className='text-red-700'>Invalid credentials</p>}
        {signInLoading ? (
          <p>Loading....</p>
        ) : (
          <Button type={'submit'}>Submit</Button>
        )} */}
      </form>
    </Page>
  );
};

export default SignInPage;
