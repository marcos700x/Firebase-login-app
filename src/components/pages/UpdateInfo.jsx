import React, { useRef, useState } from 'react'
import Topbar from '../Topbar'
import noprofilepic from '../../img/no-profile-pic.png'
import { useAuth } from '../../context/AuthContext'
import { notifyError, notifySuccess } from '../Alerts'
import Modal from 'react-bootstrap/Modal';
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const UpdateInfo = () => {

    const { currentUser, updateUserInfo, upload, deleteCurrentUser, changeEmail, changePassword } = useAuth()
    const navigate = useNavigate()
    const fileInput = useRef(null)

    const [infoToUpdate, setInfoToUpdate] = useState({})
    const [photo, setPhoto] = useState()
    const [email, setEmail] = useState()
    const [previewPicture, setPreviewPicture] = useState(currentUser.photoURL)
    const [loading, setLoading] = useState(false)
    const [disableUpdateButton, setDisableUpdateButton] = useState(true)
    const [disableDeleteButton, setDisableDeleteButton] = useState(true)
    const [updateShow, setUpdateShow] = useState(false);
    const [deleteShow, setDeleteShow] = useState(false);
    const [showPasswordsFields, setShowPasswordsFields] = useState(false)
    const [newPassword, setNewPassword] = useState({
        password: '',
        confirmPassword: '',
    })

    const renderProfilePicture = (e) => {
        if (e.target.files[0]) {
            setPreviewPicture(URL.createObjectURL(e.target.files[0]))
            setPhoto(e.target.files[0])
        }
    }
    const handleChange = ({ target: { name, value } }) => {
        setInfoToUpdate({
            [name]: value,
        })
    }
    const handleUpdateInfo = () => {
        try {
            updateUserInfo(infoToUpdate)
            if(photo){
                upload(photo, currentUser, setLoading)
            }
            if(currentUser.email !== email){
                changeEmail(email)
            }
            if(newPassword.password === newPassword.confirmPassword){
                changePassword(newPassword.password)
            }
            notifySuccess('Your profile has been updated')
            setUpdateShow(false)
            setTimeout(() => {
                navigate('/updateInfo')
            }, 2300);
        } catch (error) {
            notifyError(error.message)
        }
    }
    const handleNewPassword = ({ target: {name, value} }) => {
        setNewPassword({
            ...newPassword,
            [name]: value,
        })
    }


    return (
        <>
            <Topbar />
            <main>
                <div className="bg-white rounded shadow p-3 d-flex flex-column align-items-center justify-content-center">
                    <div className="row w-100">
                        <div className="col-12 col-md-4 d-flex justify-content-center align-items-center p-0">
                            <img src={previewPicture ? previewPicture : currentUser.photoURL && previewPicture ? previewPicture : !currentUser.photoURL ? noprofilepic : currentUser.photoURL} className='rounded-circle' width={100} style={{ objectFit: 'cover', aspectRatio: '1' }} />
                        </div>
                        <div className="col-12 col-md-8 d-flex justify-content-center align-items-center flex-column align-items-md-start">
                            <span className='fs-4 mt-3 mt-md-0 text-wrap' >{currentUser.displayName || currentUser.email}</span>
                            <button className="btn btn-link p-0 " onClick={() => fileInput.current.click()}>Change profile picture</button>
                            <input type="file" ref={fileInput} name="photoURL" className='d-none' accept='image/png, image/jpg, image/jpeg' onChange={renderProfilePicture} />
                        </div>
                    </div>
                    <hr className='w-100' />
                    <div className='w-100'>
                        <div className="row mb-3">
                            <div className="col-12 col-md-4 d-flex align-items-center">
                                <label htmlFor="actualEmail" className="form-label fw-bold m-0">Email address</label>
                            </div>
                            <div className="col-12 col-md-8 ">
                                <input type="email" className="form-control" name="actualEmail" placeholder="name@example.com" defaultValue={currentUser.email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-12 col-md-4 d-flex align-items-center">
                                <label htmlFor="actualUsername" className="form-label fw-bold m-0">Username</label>
                            </div>
                            <div className="col-12 col-md-8">
                                <input type="email" className="form-control" name="displayName" placeholder="Example: John Doe" defaultValue={currentUser.displayName} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-auto">
                                <button className={`btn btn-link p-0 ${showPasswordsFields ? 'mb-3' : ''}`} onClick={() => setShowPasswordsFields(!showPasswordsFields)}>{showPasswordsFields ? 'Close ' : 'Change your password'}</button>
                            </div>
                            <div className="col-12 col-md-auto"></div>
                        </div>
                        <div className={`${showPasswordsFields ? 'd-block' : 'd-none'}`}>
                        <div className="row mb-3">
                                 <div className="col-12 col-md-4 d-flex align-items-center">
                                    <label htmlFor="newPassword" className='form-label fw-bold m-0'>New <br className='d-none d-md-block'/>Password</label>
                                 </div>
                                 <div className="col-12 col-md-8 d-flex align-items-center">
                                    <input type="password" className='form-control'  name='password' onChange={handleNewPassword}/>
                                 </div>
                            </div>
                            <div className="row">
                                 <div className="col-12 col-md-4 d-flex align-items-center">
                                    <label htmlFor="confirmPassword" className='form-label fw-bold m-0'>Confirm <br className='d-none d-md-block'/>Password</label>
                                 </div>
                                 <div className="col-12 col-md-8 d-flex align-items-center">
                                    <input type="password" className='form-control' name='confirmPassword' onChange={handleNewPassword}/>
                                 </div>
                            </div>
                        </div>

                        <hr className='w-100' />
                        <div className="d-flex gap-3">
                        <button className="btn btn-primary" onClick={() => setUpdateShow(true)} disabled={loading}>Update</button>
                        <button className="btn btn-danger" onClick={() => setDeleteShow(true)}>Delete Account</button>
                        </div>
                    </div>
                </div>

                <Modal
                    centered
                    size="sm"
                    show={updateShow}
                    onHide={() => setUpdateShow(false)}
                    aria-labelledby="example-modal-sizes-title-sm"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-sm">
                            Update Profile
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <p className='m-0 mb-2'>Type "CONFIRM" to save all changes</p>
                            <input type="text" className='form-control' placeholder='CONFIRM' onChange={(e) => { if (e.target.value === "CONFIRM") {setDisableUpdateButton(false)}else{setDisableUpdateButton(true)} }} />
                        </div>
                        <button disabled={disableUpdateButton || loading} className="btn btn-primary mt-3" onClick={handleUpdateInfo}>Save Changes</button>
                    </Modal.Body>
                </Modal>

                <Modal
                    centered
                    size="sm"
                    show={deleteShow}
                    onHide={() => setDeleteShow(false)}
                    aria-labelledby="example-modal-sizes-title-sm"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-sm">
                            This action can't be undone!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <p className='m-0 mb-2'>Type "DELETE" to delete permanently your account </p>
                            <input type="text" className='form-control' placeholder='DELETE' onChange={(e) => { if (e.target.value === "DELETE") {setDisableDeleteButton(false)}else{setDisableDeleteButton(true)} }} />
                        </div>
                        <button disabled={disableDeleteButton } className="btn btn-danger mt-3" onClick={deleteCurrentUser}>Delete my account</button>
                    </Modal.Body>
                </Modal>

            </main>
            <ToastContainer/>
        </>
    )
}

export default UpdateInfo