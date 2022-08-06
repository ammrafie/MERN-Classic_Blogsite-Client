import './App.css';
import {
  BrowserRouter as Router,
  Route, Routes
} from 'react-router-dom';
import Navbar from './pages/Navbar';
import HomePage  from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticleListPage from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/about' element={<AboutPage/>} />
          <Route path='/article-list' element={<ArticleListPage/>} />
          <Route path='/article/:name' element={<ArticlePage/>} />
          <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;



