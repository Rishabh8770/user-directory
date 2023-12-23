import './App.css';
import Navbar from './components/Navbar';
import Cards from './components/Cards';
import UserDetails from './components/UserDetails'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>  {/* Updated to Routes */}
          <Route path="/" element={<Cards />} />
          <Route path="/user/:userId" element={<UserDetails />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
