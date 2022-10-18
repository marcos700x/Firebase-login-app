import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from './context/AuthContext';
import ProtectedRoute from './components/pages/ProtectedRoute';
import VerifyMail from './components/pages/VerifyMail';
import UpdateInfo from './components/pages/UpdateInfo';


function App() {
  return (
    <div className='App'>
      <AuthContext>
  <Routes>
    <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/verify' element={<VerifyMail/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/updateInfo' element={<ProtectedRoute><UpdateInfo/></ProtectedRoute>}/>
  </Routes>
      </AuthContext>
    </div>
  );
}

export default App;
