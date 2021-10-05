import {useFormik } from 'formik';
import * as Yup from "yup"
import { GoogleLogin } from 'react-google-login'

const SignUp = () => {

    let formik = useFormik({
        initialValues: {firstname: '', lastname: '', email: '', password: '', photo: '', phone: '1111'},
        onSubmit: (values) => {
            console.log(values)
        },
        validationSchema: Yup.object({
            firstname: Yup.string().min(2, 'Firstname must have 2+ characters').required('Required'),
            lastname: Yup.string().min(2, 'Lastname must have 2+ characters').required('Required'),
            email: Yup.string().email('Invalid email').required('Required'),
            password: Yup.string().min(4, 'Password must have 4+ characters').required('Required'),
            photo: Yup.string().required('Required')
        })
    })

    const responseGoogle = res => {
        let newUserGoogle = {
            firstname: res.profileObj.givenName,
            lastname: res.profileObj.familyName,
            email: res.profileObj.email,
            photo: res.profileObj.imageUrl,
            password: res.profileObj.googleId,
            phone: '1111',
            google: true
        }
    }

    return (
        <>
            <div className='headerLogo'>
                <h1>Ludotech</h1>
            </div>
            <div className='main-sign'>
                <GoogleLogin
                    clientId="478587460975-giu0a4b1k75e7l2j3otss7oevhdccfdu.apps.googleusercontent.com"
                    buttonText="Create account with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    className="google"
                    render={renderProps => (
                        <button 
                            className='buttonGoogle'
                            onClick={renderProps.onClick} 
                            disabled={renderProps.disabled}
                        >Create account with Google
                        </button>
                    )}
                />
                <div className='signupEmailOption'>
                    <div className='lineSign'></div>
                    <p>or sign up with email</p>
                    <div className='lineSign'></div>
                </div>
                <div className='inputContainer'>
                    <label className='labelSign' htmlFor='firstname'>Firstname</label>
                    <input 
                        name='firstname'
                        type='text'
                        placeholder='Must have 2+ characters'
                        value={formik.values.firstname}
                        onChange={formik.handleChange('firstname')}
                        onBlur={formik.handleBlur('firstname')}
                    />
                    {formik.touched.firstname && formik.errors.firstname && (
                        <p>{formik.errors.firstname}</p>
                    )}
                </div>
                <div className='inputContainer'>
                    <label className='labelSign' htmlFor='lastname'>Lastname</label>
                        <input 
                            name='lastname'
                            type='text'
                            placeholder='Must have 2+ characters'
                            value={formik.values.lastname}
                            onChange={formik.handleChange('lastname')}
                            onBlur={formik.handleBlur('lastname')}
                        />
                        {formik.touched.lastname && formik.errors.lastname && (
                            <p>{formik.errors.lastname}</p>
                        )}
                </div>
                <div className='inputContainer'>
                    <label className='labelSign' htmlFor='photo'>Photo</label>
                    <input 
                        name='photo'
                        placeholder='Must be an url'
                        type='text'
                        value={formik.values.photo}
                        onChange={formik.handleChange('photo')}
                        onBlur={formik.handleBlur('photo')}
                    />
                    {formik.touched.photo && formik.errors.photo && (
                        <p>{formik.errors.photo}</p>
                    )}
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
                    {formik.touched.email && formik.errors.email && (
                        <p>{formik.errors.email}</p>
                    )}
                </div>
                <div className='inputContainer'>
                    <label className='labelSign' htmlFor='password'>Password</label>
                    <input 
                        placeholder='Must have 4+ characters'
                        name='password'
                        type='password'
                        value={formik.values.password}
                        onChange={formik.handleChange('password')}
                        onBlur={formik.handleBlur('password')}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <p>{formik.errors.password}</p>
                    )}
                </div>
                <button className='signupButtonSignup' onClick={formik.handleSubmit}>Sign up</button>
                <div className='signupEmailOption'>
                    <div className='lineSign'></div>
                    <p>Already have an account?</p>
                    <div className='lineSign'></div>
                </div>
                <button className='signinButtonSignup'>Sign In</button>
            </div>
        </>
    )
}

export default SignUp