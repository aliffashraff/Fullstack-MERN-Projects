import { Route, Routes, Navigate } from 'react-router-dom';

import HomePage from './pages/home/HomePage';
import SignUpPage from './pages/auth/signup/SignUpPage';
import LoginPage from './pages/auth/login/LoginPage';
import Sidebar from './components/common/Sidebar';
import RightPanel from './components/common/RightPanel';
import NotificationPage from './pages/notification/NotificationPage';
import ProfilePage from './pages/profile/ProfilePage';

import { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from './components/common/LoadingSpinner';

const App = () => {
  // useQuery used to fetch and cache data.
  const { data: authUser, isLoading } = useQuery({
    // queryKey is used to refer to the queries later on
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const response = await axios.get('/api/auth/me');
        if (response.data.success) {
          // console.log(response.data.data);
          return response.data.data;
        }
      } catch (error) {
        // to make sure redirect to login page when logout
        if (error.response.status === 401) return null;
        console.error(error);
        throw new Error(error.response?.data?.error || 'Something went wrong');
      }
    },
    // will try to query only once
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex max-w-6xl mx-auto">
      {/* common component - not wrapped in Routes */}
      <Toaster />
      {authUser && <Sidebar />}
      <Routes>
        <Route
          path="/"
          // navigaet to login page if not authenticated
          element={authUser ? <HomePage /> : <Navigate to={'/login'} />}
        ></Route>
        <Route
          path="/signup"
          element={authUser ? <Navigate to={'/'} /> : <SignUpPage />}
        ></Route>
        <Route
          path="/login"
          element={authUser ? <Navigate to={'/'} /> : <LoginPage />}
        ></Route>
        <Route
          path="/notifications"
          element={authUser ? <NotificationPage /> : <Navigate to={'/'} />}
        ></Route>
        <Route
          path="/profile/:username"
          element={authUser ? <ProfilePage /> : <Navigate to={'/'} />}
        ></Route>
      </Routes>
      {authUser && <RightPanel />}
    </div>
  );
};

export default App;
