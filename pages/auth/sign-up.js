import Page from '../../components/layout/Page';
import Field from '../../components/layout/ui/Field';
import Input from '../../components/layout/ui/Input';
import Button from '../../components/layout/ui/Button';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import axios from 'axios';

const SignUpPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const res = axios.post('/api/auth/sign-up', { email, password });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Page title={'Sign Up'}>
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
        <Field label={'Confirm Password'}>
          <Input
            type='password'
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
            autoComplete='current-password'
            required
          />
        </Field>
        <Button type={'submit'}>Sign Up</Button>
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

export default SignUpPage;
