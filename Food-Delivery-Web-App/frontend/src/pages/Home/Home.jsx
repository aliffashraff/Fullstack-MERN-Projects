import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import Header from '../../components/Header/Header';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <ExploreMenu />
    </div>
  );
};

export default Home;
