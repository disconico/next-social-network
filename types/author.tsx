type Author = {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  profilePicture: {
    imageUrl: string;
    public_url: string;
    imageSignature: string;
  };
};

export default Author;
