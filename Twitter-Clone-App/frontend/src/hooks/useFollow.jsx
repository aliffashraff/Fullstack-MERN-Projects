import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const useFollow = () => {
  const queryClient = useQueryClient();
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const { mutate: followUnfollowMutation, isPending } = useMutation({
    mutationFn: async (userId) => {
      try {
        const url = `${apiBaseUrl}/api/user/follow/${userId}`;
        const response = await axios.post(url);

        if (response.data.success) {
          // console.log(response.data.message);
          return response.data.message;
        }
      } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.error || 'Something went wrong');
      }
    },
    // onSuccess receive data from mutationFn
    onSuccess: (data) => {
      toast.success(data);
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['suggestedUsers'] }),
        queryClient.invalidateQueries({ queryKey: ['authUser'] }),
      ]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { followUnfollowMutation, isPending };
};

export default useFollow;
