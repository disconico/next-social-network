import Field from '../ui/Field';
import Input from '../ui/Input';
import Button from '../ui/Button';
import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const PasswordForm = () => {
  const [userCredentials, setUserCredentials] = useState({
    oldPassword: '',
    newPassword: '',
    confirmedPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { oldPassword, newPassword, confirmedPassword } = userCredentials;

    if (newPassword !== confirmedPassword) {
      console.log('Passwords do not match!');
      setPasswordError('Passwords do not match!');
      return;
    }

    try {
      await toast
        .promise(axios.patch('/api/user', { oldPassword, newPassword }), {
          pending: 'Updating password...',
          success: 'Password updated!',
          error: 'Error updating password',
        })
        .then((res) => {
          console.log('Toast res :', res);
          setUserCredentials({
            oldPassword: '',
            newPassword: '',
            confirmedPassword: '',
          });
          setPasswordError('');
        });
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        setPasswordError(err.response?.data.message || err.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='username'
        value='username'
        autoComplete='username'
        readOnly
        hidden
      />

      <Field label={'Current password :'}>
        <Input
          type='password'
          name='oldPassword'
          placeholder='Current password'
          value={userCredentials.oldPassword}
          onChange={handleChange}
          autoComplete='current-password'
          required
          minLength={8}
          maxLength={20}
        />
      </Field>
      <Field label={'New password :'}>
        <Input
          type='password'
          name='newPassword'
          placeholder='New password'
          value={userCredentials.newPassword}
          onChange={handleChange}
          autoComplete='new-password'
          required
          minLength={8}
          maxLength={20}
        />
      </Field>
      <Field label={'Confirm new password :'}>
        <Input
          type='password'
          name='confirmedPassword'
          placeholder='Confirm new password'
          value={userCredentials.confirmedPassword}
          onChange={handleChange}
          autoComplete='new-password'
          required
          minLength={8}
          maxLength={20}
        />
      </Field>
      {passwordError && <p>{passwordError}</p>}
      <Button type='submit'>Update password</Button>
    </form>
  );
};

export default PasswordForm;
