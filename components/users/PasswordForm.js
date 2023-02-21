import Field from '../ui/Field';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const PasswordForm = () => {
  const [userCredentials, setUserCredentials] = useState({
    oldPassword: '',
    newPassword: '',
    confirmedPassword: '',
  });
  const [passwordError, setPasswordError] = useState(null);

  const handleChange = (e) => {
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
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
          setPasswordError(null);
        });
    } catch (err) {
      console.log(err);
      setPasswordError(err.response.data.message);
    }

    //   axios
    //     .patch('/api/user', {
    //       oldPassword,
    //       newPassword,
    //     })
    //     .then((res) => {
    //       console.log('res:', res);
    //       setUserCredentials({
    //         oldPassword: '',
    //         newPassword: '',
    //         confirmedPassword: '',
    //       });
    //       setPasswordError(null);
    //     });
    // } catch (err) {
    //   console.log(err);
    //   setPasswordError(err.response.data.message);
    // }
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
