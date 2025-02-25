import { Route, Routes } from 'react-router-dom';
import IndexPage from '@/pages/index';
import UploadPage from '@/pages/upload';
import PricingPage from '@/pages/pricing';
import AboutPage from '@/pages/about';
import Projects from '@/pages/projects';
import ProjectInfo from './pages/project-info';


function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<UploadPage />} path="/upload" />
      <Route element={<Projects />} path="/projects" />
      <Route element={<ProjectInfo/>} path="/projects/:projectid" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route element={<AboutPage />} path="/about" />
    </Routes>
  );
}

export default App;
