import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage.js';
import AboutPage from './pages/AboutPage.js';
import ArticleListPage from './pages/ArticlesListPage.js';
import ArticlePage from './pages/Article.js';
import NavBar from './NavBar.js';
import NotFoundPage from './pages/NotFoundPage.js';
import LogInPage from './pages/LogInPage.js';
import SignUpPage from './pages/SignUpPage.js';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <div id='page-body'> 
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/articles' element={<ArticleListPage />} />
            <Route path='/login' element={<LogInPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/articles/:articleid' element={<ArticlePage />} />
            <Route path='/*' element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
