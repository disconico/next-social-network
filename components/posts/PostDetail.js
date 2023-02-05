import PropTypes from 'prop-types';
import LikeButton from './LikeButton';
import { gsap } from 'gsap';

const Post = ({
  author,
  title,
  content,
  likes,
  likedBy,
  session,
  status,
  postId,
}) => {
  const { _id, firstName, lastName } = author;

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   console.log('clicked');
  //   const button = e.target.closest('button');
  //   button.classList.toggle('liked');
  //   if (button.classList.contains('liked')) {
  //     gsap.fromTo(
  //       button,
  //       {
  //         '--hand-rotate': 8,
  //       },
  //       {
  //         ease: 'none',
  //         keyframes: [
  //           {
  //             '--hand-rotate': -45,
  //             duration: 0.16,
  //             ease: 'none',
  //           },
  //           {
  //             '--hand-rotate': 15,
  //             duration: 0.12,
  //             ease: 'none',
  //           },
  //           {
  //             '--hand-rotate': 0,
  //             duration: 0.2,
  //             ease: 'none',
  //             clearProps: true,
  //           },
  //         ],
  //       }
  //     );
  //   }
  // };

  return (
    <div>
      <h1 className='text-xg font-bold'>{title}</h1>
      <p>
        by {firstName} {lastName}
      </p>
      {/* <p>{content}</p>
      <button onClick={handleClick} className=' button dark'>
        <div className='hand'>
          <div className='thumb'></div>
        </div>
        <span>
          Like<span>d</span>
        </span>
      </button>

      <button onClick={handleClick} className='button'>
        <div className='hand'>
          <div className='thumb'></div>
        </div>
        <span>
          Like<span>d</span>
        </span>
      </button> */}

      <div className='text-gray-500 flex gap-1'>
        <p>Likes :</p>
        <p key={likes} className='roll-out'>
          {likes}
        </p>
      </div>

      <LikeButton
        session={session}
        status={status}
        postId={postId}
        likedBy={likedBy}
      />
    </div>
  );
};

Post.propTypes = {
  author: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  likedBy: PropTypes.array.isRequired,
  session: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
};

export default Post;
