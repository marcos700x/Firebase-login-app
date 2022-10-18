import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { notifyInfo } from './Alerts'
import Dropdown from 'react-bootstrap/Dropdown';
import noprofilepic from '../img/no-profile-pic.png'
import { Link } from 'react-router-dom';

const Topbar = () => {

    const { currentUser, logout } = useAuth()

    const handleLogOut = async() => {
        await logout()
        notifyInfo('Logged Out Successfully')
        }

  return (
    <div className='container-fluid bg-white topbar d-flex justify-content-between align-items-center pt-1 pb-1 shadow'>
      <Link className='display-4 text-dark fs-1' to={'/'} style={{textDecoration: 'none'}}>Firebase App</Link>
      
      <Dropdown>
      <Dropdown.Toggle variant="" id="dropdown-basic">
        <img src={currentUser.photoURL || noprofilepic } alt="" width={40} height={40} className='rounded-circle' style={{ objectFit: 'cover' }}/>
      </Dropdown.Toggle>

      <Dropdown.Menu className='p-3'>
        <h1 className='fs-5'>{currentUser.displayName || currentUser.email}</h1>
        <li><hr className="dropdown-divider"/></li>
        <Link className='text-dark dropdown-item ' style={{textDecoration: 'none'}} to={'/'}>Home</Link>
        <Link className='text-dark dropdown-item' style={{textDecoration: 'none'}} to={'/updateInfo'}>Manage your account</Link>
        <li><hr className="dropdown-divider"/></li>
        <button className='btn btn-danger' onClick={handleLogOut}>Sign out</button>
      </Dropdown.Menu>
    </Dropdown>

    </div>
  )
}

export default Topbar