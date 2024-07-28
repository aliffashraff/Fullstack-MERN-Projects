import Post from './Post';
import PostSkeleton from '../skeletons/PostSkeleton';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';

const Posts = ({ feedType, username, userId }) => {
  const getPostEndPoint = () => {
    switch (feedType) {
      case 'forYou':
        return '/api/post/all';
      case 'following':
        return '/api/post/followings';
      case 'posts':
        return `/api/post/user/${username}`;
      case 'likes':
        return `/api/post/likes/${userId}`;
      default:
        return '/api/post/all';
    }
  };

  const POST_ENDPOINT = getPostEndPoint();

  const {
    data: posts,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      try {
        const response = await axios.get(POST_ENDPOINT);

        if (response.data.success) {
          // console.log(response.data.data);
          return response.data.data;
        }
      } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.error || 'Something went wrong');
      }
    },
  });

  useEffect(() => {
    // refetch everytime feedType state changes
    refetch();
  }, [feedType, refetch, username, userId]);

  return (
    <>
      {(isLoading || isRefetching) && (
        <div className="flex flex-col justify-center">
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}
      {!isLoading && !isRefetching && posts?.length === 0 && (
        <p className="text-center my-4">No posts in this tab. Switch 👻</p>
      )}
      {!isLoading && !isRefetching && posts && (
        <div>
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  );
};
export default Posts;
