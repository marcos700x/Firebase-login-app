import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc';
import { notifyError, notifySuccess } from '../Alerts';
import { ToastContainer } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Register = () => {

  const  { signUp, verificarEmail, currentUser  } = useAuth()
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
    
    if(userInfo.password !== userInfo.confirmPassword){
      notifyError("The password confirmation does not match")
      return
    }
    if(userInfo.password.length < 6 || userInfo.confirmPassword.length < 6){
      notifyError('Password must be at least 6 characters long ')
    }
    if(userInfo.password === userInfo.confirmPassword && userInfo.password.length >= 6){

      try {
        await signUp(userInfo.email, userInfo.password).then(() => verificarEmail())
        notifySuccess('Your account has been succesfully created')
        setTimeout(() => {
          navigate('/verify')
        }, 2300);
      } catch (error) {
        notifyError(error.message)
      }
    }
  }

  if(currentUser && currentUser.emailVerified) return <Navigate to={'/'}/>

  return (
    <main>
  <ToastContainer/>
      <div className="sm-container bg-white form-container p-4 shadow rounded-2">
        <form className='d-flex gap-3 flex-column' onSubmit={handleSubmit}>
          <h1 className='lead display-4'>Register</h1>
          <div className="form-floating">
            <input type="email" className="form-control" name="email" placeholder=" " onChange={handleChange} />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" name="password" placeholder=" " onChange={handleChange} />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" name="confirmPassword" placeholder=" " onChange={handleChange} />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className='btn btn-primary fs-5'>Sign Up</button>
          <button className="btn btn-light ">Sign Up With Google <FcGoogle size={'1.5rem'} onClick={handleSubmit}/></button>
          <Link to="/login" className='btn btn-link'>Already have an account?</Link>

        </form>
      </div>
    </main>
  )
}

export default Register