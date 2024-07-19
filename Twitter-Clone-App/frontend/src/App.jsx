import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/home/HomePage';
import SignUpPage from './pages/auth/signup/SignUpPage';
import LoginPage from './pages/auth/login/LoginPage';
import Sidebar from './components/common/Sidebar';
import RightPanel from './components/common/RightPanel';
import NotificationPage from './pages/notification/NotificationPage';
import ProfilePage from './pages/profile/ProfilePage';

import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div className="flex max-w-6xl mx-auto">
      {/* common component - not wrapped in Routes */}
      <Toaster />
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/notifications" element={<NotificationPage />}></Route>
        <Route path="/profile/johndoe" element={<ProfilePage />}></Route>
      </Routes>
      <RightPanel />
    </div>
  );
};

export default App;
