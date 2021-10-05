import {useState} from 'react'
import {useFormik } from 'formik';
import { GoogleLogin } from 'react-google-login'
import {Link} from 'react-router-dom'
import axios from 'axios'


const SignIn = () => {

    const [error, setError] = useState('')

    let formik = useFormik({
        initialValues: {email: '', password: '', google: false},
        onSubmit: (values) => {
            console.log(values)
            axios.post('http://localhost:4000/api/login', values)
                .then(res => {
                    console.log(res.data)
                })
                .catch(e => {
                    console.log(e)
                })
        }
    })

    const responseGoogle = (res) => {
        let userGoogle = {
            email: res.profileObj.email,
            password: res.profileObj.googleId,
            google: true
        }

        try {
            axios.post('http://localhost:4000/login', userGoogle)
                .then(res => {
                    console.log(res.data)
                    localStorage.setItem('token', res.data.response.token)
                })
                .catch(e => {
                    console.log(e)
                    setError(e)
                })
        } catch (error) {
            console.log(error)
            setError(error)
        }
    }

    return (
        <>
            <div className='headerLogo'>
                <h1>Ludotech</h1>
            </div>
            <div className='flex'>
                <div className='main-sign'>
                    <div>
                        <h2>Sign in</h2>
                        <p>Enter in your account to buy</p>
                    </div>
                    <GoogleLogin
                        clientId="459150618424-3jfl8j0539f5fj34h0e3utqvao05ib8m.apps.googleusercontent.com"
                        buttonText="Sign in with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        className="google"
                        render={renderProps => (
                            <div 
                                className='buttonGoogle'
                                onClick={renderProps.onClick} 
                                disabled={renderProps.disabled}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                                </svg>
                                <p>Create account with Google</p>
                            </div>
                        )}
                    />
                    <div className='signupEmailOption'>
                        <div></div>
                        <p>or sign in with email</p>
                        <div></div>
                    </div>
                    <div className='inputContainer'>
                        <label className='labelSign' htmlFor='email'>Email</label>
                        <input 
                            placeholder='example@email.com'
                            name='email'
                            type='email'
                            value={formik.values.email}
                            onChange={formik.handleChange('email')}
                            onBlur={formik.handleBlur('email')}
                        />
                    </div>
                    <div className='inputContainer'>
                        <label className='labelSign' htmlFor='password'>Password</label>
                        <input 
                            placeholder='Password'
                            name='password'
                            type='password'
                            value={formik.values.password}
                            onChange={formik.handleChange('password')}
                            onBlur={formik.handleBlur('password')}
                        />
                    </div>
                    {error && <p>{error}</p>}
                    <div className='signupButtonSignup flex' onClick={formik.handleSubmit}>Sign in</div>
                    <div className='signupEmailOption'>
                        <div></div>
                        <p>Create an account</p>
                        <div></div>
                    </div>
                    <Link to='/signup'><div className='flex signinButtonSignup'>Sign up</div></Link>
                </div>
            </div>
        </>
    )
}

export default SignIn