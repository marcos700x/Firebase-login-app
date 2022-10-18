import React, { useContext } from 'react'
import { Context } from '../../context/AuthContext'
import Topbar from '../Topbar'
import emptyPng from '../../img/notFound.svg'



const Home = () => {

    const { currentUser, loading } = useContext(Context)
    console.log(currentUser)
    if(loading) return <h1>Loading</h1>


  return (
    <div className='vh-100 d-flex justify-content-center align-items-center'>
      <Topbar/>
      <div className="d-flex justify-content-center align-items-center flex-column gap-3">
      <img src={emptyPng} width={300} />
      <p className='fs-4 text-light fw-bold'>Oops! No post yet</p>
      </div>
    </div>
  )
}

export default Home