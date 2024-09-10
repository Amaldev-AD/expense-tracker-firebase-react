import React from 'react'
import { auth, provider } from '../../config/firebase-config'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate,Navigate } from 'react-router-dom'
import { userGetUserInfo } from '../../hooks/useGetUserInfo'


function Auth() {

  const navigate=useNavigate();
  const { isAuth } = userGetUserInfo()

  const signInWithGoogle = async() => {


    const results = await signInWithPopup(auth,provider);
    const authInfo = {
      userId:results.user.uid,
      name:results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth:true,
    }
    localStorage.setItem("auth",JSON.stringify(authInfo))
    navigate('/expense-track')
  }

  if(isAuth){
    return <Navigate to="/expense-track" />
  }
  return (
    <div className='login-page flex flex-col items-center'>
      <p className='text-5xl font-medium my-10 '>Sign In With Google to Countinue</p>
      <button className='border-2 bg-slate-300 px-6  text-lg font-medium flex items-center text-black' onClick={signInWithGoogle}><img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="" height={"50px"} width={"50px"} /> Sign In With Google</button>
    </div>
  )
}

export default Auth
