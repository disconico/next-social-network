import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { validateSize, isImage } from '../../lib/fileValidation';
import axios from 'axios';

const ImageUploader = () => {
  const { data: session, status } = useSession();
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
      setImageError('File must be less or equal to 5MB');
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

    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await fetch('api/images', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setImageSrc('');
      setImage(null);
      setIsLoading(false);
    }
  };

  return (
    <div className=' p-5 dark:bg-black w-full dark:text-white'>
      <form onSubmit={handleSubmit}>
        <div className='my-5'>
          <div className=''>
            <label>
              Select Picture{' '}
              <span className='text-red-500 text-xs'>(Max 10MB)</span>
              <span className='text-red-400'>*</span>
            </label>
            <p className='my-5 text-red-400'>{imageError}</p>
            <input type='file' onChange={handleImageChange} className='block' />
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
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            {isLoading ? 'Loading...' : 'Upload'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ImageUploader;