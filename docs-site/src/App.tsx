import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { ScrollToTop } from './components/ScrollToTop';
import Home from './pages/Home';
import GettingStarted from './pages/GettingStarted';
import UserGuide from './pages/UserGuide';
import Features from './pages/Features';

function App() {
  return (
    <BrowserRouter basename="/DocForge/docs">
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/getting-started" element={<GettingStarted />} />
          <Route path="/user-guide" element={<UserGuide />} />
          <Route path="/features" element={<Features />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
