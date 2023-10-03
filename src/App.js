import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Loan from './components/Loan/Loan';
import Deposit from './components/Deposit/Deposit';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="loan" element={<Loan />} />
          <Route path="deposit" element={<Deposit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
