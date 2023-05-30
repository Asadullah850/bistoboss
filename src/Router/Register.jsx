import React, { useContext, useEffect, useRef, useState } from 'react';
import login from '../../src/assets/others/authentication1.png'
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from './AuthProviders';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const captchaRef = useRef(null)
    const [disabled, setDisabled] = useState(true)
    const [err, seterr] = useState('')
    const { newUser, updateUser } = useContext(AuthContext)
    const navigate = useNavigate()
    // https://i.ibb.co/WWR0dZk/person.jpg
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])
    const handelRegister = (event) => {
        event.preventDefault();
        const form = event.target;
        const displayName = form.displayName.value;
        const email = form.email.value;
        const photoURL = form.photoURL.value;
        const pass = form.pass.value;
        const userData = {
            email, pass, displayName, photoURL
        }
        console.log(userData);
        newUser(email, pass).then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            updateUser(displayName, photoURL)
                .then((data) => {
                    // Profile updated!
                    console.log(data);
                    navigate('/')
                }).catch((error) => {
                    // An error occurred
                    // ...
                });

            // ...
        })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                seterr(errorMessage)
                // ..
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
                    <img src={login} alt="" srcset="" />
                </div>
                <form onSubmit={handelRegister} className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <h1 className="text-5xl font-bold my-5">Register!</h1>
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input required name='displayName' type="text" placeholder="name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input required name='email' type="email" placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo url</span>
                            </label>
                            <input name='photoURL' type="url" placeholder="Photo Url" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input required type="pass" name='pass' placeholder="password" className="input input-bordered" />
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
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;