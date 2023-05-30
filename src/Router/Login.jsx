import React, { useContext, useEffect, useRef, useState } from 'react';
import logins from '../../src/assets/others/authentication1.png'
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from './AuthProviders';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const captchaRef = useRef(null)
    const [disabled, setDisabled] = useState(true)
    const [err, seterr] = useState('')
    const { login, googleLogin } = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()

    const from = location.state?.from?.pathname || '/'

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handelSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const pass = form.pass.value;
        const userData = {
            email, pass
        }
        login(email, pass)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                navigate(from, { replace: true })

                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(err);
            });
    }

    const handelGoogleLog = () => {
        googleLogin()
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            navigate(from, { replace: true })
            // ...
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });
    }

    const handelCaptcha = () => {
        seterr('')
        const user_captcha_value = captchaRef.current.value;
        // console.log(value);
        if (validateCaptcha(user_captcha_value) == true) {
            setDisabled(false)
        }

        else {
            seterr('Captcha Does Not Match')
        }
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex max-sm:flex-col">
                <div className="text-center lg:text-left">
                    <img src={logins} alt="" srcset="" />
                </div>
                <form onSubmit={handelSubmit} className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <h1 className="text-5xl font-bold my-5">Login now!</h1>
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name='email' type="text" placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="pass" name='pass' placeholder="password" className="input input-bordered" />
                            <div className=" p-5">
                                <LoadCanvasTemplateNoReload />
                            </div>
                            <input type="text" name='captcha' placeholder="type captcha" className="input input-bordered mb-1" ref={captchaRef} />
                            <p>{err}</p>
                            <button onClick={handelCaptcha} className='btn h-2'>Validate Captcha</button>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button disabled={disabled} type='submit' className="btn btn-primary">Login</button>
                            <button onClick={handelGoogleLog} type='submit' className="btn btn-primary">Google</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;