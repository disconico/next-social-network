import AuthForm from '../../components/authentication/AuthForm';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

const SignUpPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSession()
      .then((session) => {
        if (session) {
          router.replace('/app');
        } else {
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  }, [router]);

  if (loading) {
    return <p></p>;
  }

  return <AuthForm isLoggingIn={false} />;
};

export default SignUpPage;
