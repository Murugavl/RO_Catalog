import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Models from './pages/Models';
import ModelDetail from './pages/ModelDetail';
import Compare from './pages/Compare';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="models" element={<Models />} />
          <Route path="models/:id" element={<ModelDetail />} />
          <Route path="compare" element={<Compare />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
