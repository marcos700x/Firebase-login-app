import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  deleteUser,
  updateEmail,
  updatePassword,
  sendPasswordResetEmail
} from 'firebase/auth'
import {
  auth,
  storage
} from '../firebase'
import {
  notifyError,
  notifyInfo,
  notifySuccess
} from '../components/Alerts';
import {
  getDownloadURL,
  ref,
  uploadBytes
} from 'firebase/storage';


export const Context = createContext();

export const useAuth = () => {
  const aux = useContext(Context)
  return aux
}



export const AuthContext = ({
  children
}) => {


  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth)
  const verificarEmail = () => sendEmailVerification(auth.currentUser).then(() => {
    notifyInfo('A verification email has been sent')
  });
  const updateUserInfo = (objInfo) => updateProfile(currentUser, objInfo)
  const upload = async (file, currentUser, setLoading) => {
    const fileRef = ref(storage, `pfp_${currentUser.uid}.png`)
    setLoading(true)
    await uploadBytes(fileRef, file)
    const photo = await getDownloadURL(fileRef)
    updateProfile(currentUser, {
      photoURL: photo
    })
    setLoading(false)
  }
  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleProvider)
  }
  const deleteCurrentUser = async () => {
    try {
      await deleteUser(currentUser)
    } catch (error) {
      if (error.message === "Firebase: Error (auth/requires-recent-login).") {
        notifyError('Please log out and log back in to and try again')
      }
    }
  }
  const changeEmail = (newEmail) => updateEmail(auth.currentUser, newEmail)
  const changePassword = async(newPassword) => {
    try {
      await updatePassword(currentUser, newPassword)
      sendPasswordResetEmail(auth, currentUser.email)
    } catch (error) {
      notifyError(error.message)
    }
  }


  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      setCurrentUser(currentUser)
      setLoading(false)
    })
  }, [])



  return ( 
    <Context.Provider value = {
      {
        signUp,
        currentUser,
        loading,
        login,
        logout,
        verificarEmail,
        updateUserInfo,
        upload,
        loginWithGoogle,
        deleteCurrentUser,
        changeEmail,
        changePassword,
      }}> 
    {  children } 
    </Context.Provider>
  )
}

export default AuthContext