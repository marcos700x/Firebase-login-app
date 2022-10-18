import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc';
import { notifyError, notifySuccess } from '../Alerts';
import { ToastContainer } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';


const Login = () => {

  const  { login, currentUser, loginWithGoogle } = useAuth()
  const [userInfo, setUserInfo] = useState({ })
  const navigate = useNavigate()

  const handleChange = ({ target: {name, value} }) => {
    setUserInfo({
        ...userInfo,
        [name]: value,
      }
    )
  }
  const handleSubmit = async(e) => {
    e.preventDefault()

      try {
        await login(userInfo.email, userInfo.password);
        notifySuccess('Welcome back!')
        setTimeout(() => {
          navigate('/')
        }, 2300);
      } catch (error) {
        notifyError(error.message)
      }
    }
  const handleLoginWithGoogle = async() => {
    // try {
      await loginWithGoogle()
      // notifySuccess('Welcome!')
      // setTimeout(() => {
          navigate('/')
      // }, 2300);
    // } catch (error) {
      // notifyError(error.message)
    // }
  }

if(currentUser && currentUser.emailVerified) return <Navigate to={'/'}/>
return (
    <main>
  <ToastContainer/>
      <div className="sm-container bg-white form-container p-4 shadow rounded-2">
        <div className='d-flex gap-3 flex-column'>
          <h1 className='lead display-4'>Login</h1>
          <div className="form-floating">
            <input type="email" className="form-control" name="email" placeholder=" " onChange={handleChange} />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" name="password" placeholder=" " onChange={handleChange} />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button className='btn btn-primary fs-5' onClick={handleSubmit}>Login</button>
          <button className="btn btn-light " onClick={handleLoginWithGoogle}>Login With Google <FcGoogle size={'1.5rem'}/></button>
          <Link to="/register" className='btn btn-link'>Don't have an account?</Link>

        </div>
      </div>
    </main>
  )
  
  
}

export default Login