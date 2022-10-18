import { sendEmailVerification } from 'firebase/auth'
import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import email_img from '../../img/email.png'
import { notifyError, notifySuccess } from '../Alerts'

const VerifyMail = () => {

    const { currentUser, loading, logout } = useAuth()
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const handleLogOut = async() => {
        try {
            await logout()
        } catch (error) {
            notifyError(error.mesage)
        }
    }

    console.log(currentUser)

    const resendEmailVerification = async() => {
        try {
            await sendEmailVerification(currentUser)
            notifySuccess(`A verification email has been sent to ${currentUser.email}`)
        } catch (error) {
            notifyError(error.message)
        }
    }

    if(loading) return <h1>Loading</h1>
    if(currentUser && currentUser.emailVerified) return <Navigate to={'/'}/>
    if(!currentUser) return <Navigate to={'/login'}/>
  return (
    <main>
        <div className="container bg-white shadow rounded p-4">
            <div className="row text-center">
                <div className="col-12 col-md-6 d-flex flex-column gap-3 justify-content-center align-items-center">
            <h1 className="display-4 text-center w-100">Verify your email adress</h1>
            <div className='container-fluid'>
            <p className=' fs-4 m-0 lead'>We sent a verification email to:</p>
            <span className='fs-4 lead fw-bold'>{currentUser.email}</span>
            </div>
            <p className=' fs-5 m-0 lead w-100'>Follow the instructions in the email to verify your account</p>
            <div className="row w-100">
                <div className="col-12 col-md-6 mb-3 mb-md-0 p-0 pe-1">
                <button className='btn btn-primary fs-5 text-nowrap w-100' disabled={buttonDisabled} onClick={resendEmailVerification}>Resend Email</button>
                </div>
                <div className="col-12 col-md-6 p-0 pe-1">
                <button className="btn btn-secondary fs-5 text-nowrap w-100" onClick={handleLogOut}>Change email</button>
                </div>
            </div>
                </div>
                <div className="col-12 col-md-6 d-flex justify-content-center flex-column">
                    <img className='img-fluid mt-3 mt-sm-0' src={email_img}/>
                </div>
            </div>
        </div>
    </main>
  )
}

export default VerifyMail