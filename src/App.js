import { Route, Routes } from 'react-router-dom';
import './App.css';

//components
import ToDos from './components/ToDos';
import NavBar from './components/NavBar';
import NewsFeed from './components/NewsFeed';

function App() {
  return (
    <>
      <div className="container">
        <NavBar />
        <Routes>
          <Route path="/" element={<ToDos />} />
          <Route path="/news" element={<NewsFeed />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
