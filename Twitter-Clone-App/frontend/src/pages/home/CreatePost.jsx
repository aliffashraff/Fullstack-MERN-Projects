import { CiImageOn } from 'react-icons/ci';
import { BsEmojiSmileFill } from 'react-icons/bs';
import { useRef, useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const CreatePost = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const imgRef = useRef(null);

  const { data: authUser } = useQuery({ queryKey: ['authUser'] });

  const queryClient = useQueryClient();

  const {
    mutate: createPostMutation,
    error,
    isError,
    isPending,
  } = useMutation({
    mutationFn: async ({ text, image }) => {
      try {
        const response = await axios.post('/api/post/create', { text, image });
        if (response.data.success) {
          // console.log(response.data.data);
          return response.data.data;
        }
      } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.error || 'Something went wrong');
      }
    },
    onSuccess: () => {
      toast.success('Post created successfully');
      setText('');
      setImage(null);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPostMutation({ text, image });
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex p-4 items-start gap-4 border-b border-gray-700">
      <div className="avatar">
        <div className="w-8 rounded-full">
          <img src={authUser.profileImage || '/avatar-placeholder.png'} />
        </div>
      </div>
      <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
        <textarea
          className="textarea w-full p-0 text-lg resize-none border-none focus:outline-none  border-gray-800"
          placeholder="What is happening?!"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {image && (
          <div className="relative w-72 mx-auto">
            <IoCloseSharp
              className="absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer"
              onClick={() => {
                setImage(null);
                imgRef.current.value = null;
              }}
            />
            <img
              src={image}
              className="w-full mx-auto h-72 object-contain rounded"
            />
          </div>
        )}

        <div className="flex justify-between border-t py-2 border-t-gray-700">
          <div className="flex gap-1 items-center">
            <CiImageOn
              className="fill-primary w-6 h-6 cursor-pointer"
              onClick={() => imgRef.current.click()}
            />
            <BsEmojiSmileFill className="fill-primary w-5 h-5 cursor-pointer" />
          </div>
          <input
            accept="image/*"
            type="file"
            hidden
            ref={imgRef}
            onChange={handleImgChange}
          />
          <button className="btn btn-primary rounded-full btn-sm text-white px-4">
            {isPending ? 'Posting...' : 'Post'}
          </button>
        </div>
        {isError && (
          <div className="text-red-500">{error.message}</div>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
