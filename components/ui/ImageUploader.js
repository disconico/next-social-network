import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { validateSize, isImage } from '../../lib/fileValidation';
import LoadingButton from '../ui/LoadingButton';
import axios from 'axios';
import { toast } from 'react-toastify';
import { compress, compressAccurately } from 'image-conversion';

const ImageUploader = () => {
  const { status } = useSession();
  const [imageSrc, setImageSrc] = useState('');
  const [image, setImage] = useState();
  const [imageError, setImageError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (status === 'loading') return <div>Loading...</div>;

  const handleImageChange = (e) => {
    setImageSrc('');
    setImage(null);
    setImageError('');

    const img = e.target.files[0];

    if (!img) {
      setImageError('Please select an image');
      return;
    }

    // check if image
    const result = isImage(img.name);
    if (!result) {
      setImageError('File type is not supported');
      return;
    }

    // check size
    const size = validateSize(img.size);
    if (!size) {
      setImageError('File must be less or equal to 10MB');
      return;
    }

    const reader = new FileReader();
    // convert image to base64 string
    reader.readAsDataURL(img);
    reader.addEventListener('load', () => {
      setImageSrc(reader.result);
      setImage(img);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setImageError('Please select an image');
      return;
    }

    setIsLoading(true);

    const compressedImage = await compressAccurately(image, 600).then((res) => {
      console.log('Compressed image :', res);
      return res;
    });

    const formData = new FormData();
    formData.append('image', compressedImage);

    try {
      await toast
        .promise(axios.post('/api/images/upload', formData), {
          pending: 'Uploading image...',
          success: 'Image uploaded!',
          error: 'Error uploading image',
        })
        .then((res) => {
          console.log('Toast res :', res);
        });
    } catch (error) {
      console.log(error);
    } finally {
      document.getElementById('imageUploader').value = '';
      setImageSrc('');
      setImage(null);
      setIsLoading(false);
    }
  };

  return (
    <div className=' p-5  w-[90%] dark:text-white'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col justify-center items-center'
      >
        <div className='my-5'>
          <div className=''>
            <label>
              Select Picture{' '}
              <span className='text-red-500 text-xs'>(Max 10MB)</span>
              <span className='text-red-400'>*</span>
            </label>
            <p className='my-5 text-red-400'>{imageError}</p>
            <input
              type='file'
              name='image'
              id='imageUploader'
              onChange={handleImageChange}
              // className='block'
              className='block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
            />
          </div>
          {image && (
            <Image
              alt='profile picture'
              height={200}
              width={200}
              src={imageSrc}
              className='basis-1/2 h-auto w-48 my-5'
              accept='image/*'
            />
          )}
        </div>

        <div className='my-5'>
          {isLoading ? (
            <LoadingButton />
          ) : (
            <button
              type='submit'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-32 '
            >
              Upload
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ImageUploader;
