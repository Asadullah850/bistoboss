import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../Router/AuthProviders';
import { useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";


const SocailLogin = () => {
    const { googleLogin } = useContext(AuthContext)
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/'

    const handelGoogleLog = () => {
        googleLogin()
        .then((result) => {
            const user = result.user;
            const email = user.email
            const displayName = user.displayName
            const photoURL= user.photoURL

            // console.log(user);
            const userData = {displayName, email, photoURL}
            // console.log(userData);
                    // console.log('32',userData);

                    // Profile updated!

                    fetch(`http://localhost:3000/users`,{
                        method:"POST",
                        headers:{
                            'content-type':'application/json'
                        },
                        body: JSON.stringify(userData)
                    })
                    .then(res => res.json())
                    .then(data =>{
                        // console.log('43',data);
                        if(data.insertedId){
                          navigate(from, { replace: true })
                        }
                    })
                    navigate(from, { replace: true })
            
            // ...
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            console.log(errorMessage);
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });
    }
    return (
        <button onClick={handelGoogleLog} type='submit' className="btn btn-circle bg-white mx-auto"><FcGoogle className='text-xl'></FcGoogle></button>
    );
};

export default SocailLogin;