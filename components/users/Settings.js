import PropTypes from 'prop-types';
import ImageUploader from '../ui/ImageUploader';
import PasswordForm from './PasswordForm';

const Settings = ({ data }) => {
  console.log(data);
  return (
    <div>
      <h1>Settings</h1>
      <div className=''>
        <h3 className='text-xl font-bold'>Change your profile picture</h3>
        <ImageUploader />
      </div>
      <div>
        <h3 className='text-xl font-bold'>Change your password</h3>
        <PasswordForm />
      </div>
    </div>
  );
};

Settings.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Settings;
