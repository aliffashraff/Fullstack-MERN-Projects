import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import Header from '../../components/Header/Header';
import './Home.css';
import { useState } from 'react';

const Home = () => {
  // state will passed as prop to ExploreMenu
  const [category, setCategory] = useState('All');
  return (
    <div className="home-page">
      <Header />
      <ExploreMenu category={category} setCategory={setCategory}/>
    </div>
  );
};

export default Home;
