import {useFormik } from 'formik';
import * as Yup from "yup"
import { GoogleLogin } from 'react-google-login'

const SignIn = () => {

    let formik = useFormik({
        initialValues: {email: '', password: ''},
        onSubmit: (values) => {
            console.log(values)
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Email invalido').required('Required'),
            password: Yup.string().min(4, 'Minimo 4 caracteres').required('Required')
        })
    })

    const responseGoogle = res => {
        let userGoogle = {
            email: res.profileObj.email,
            password: res.profileObj.googleId,
        }
    }

    return (
        <div>
            <div>
                <label for='email'>Email</label>
                <input 
                    name='email'
                    type='email'
                    className=''
                    value={formik.values.email}
                    onChange={formik.handleChange('email')}
                    onBlur={formik.handleBlur('email')}
                />
                {formik.touched.email && formik.errors.email && (
                    <p>{formik.errors.email}</p>
                )}
                <label for='password'>Password</label>
                <input 
                    name='password'
                    type='password'
                    className=''
                    value={formik.values.password}
                    onChange={formik.handleChange('password')}
                    onBlur={formik.handleBlur('password')}
                />
                {formik.touched.password && formik.errors.password && (
                    <p>{formik.errors.password}</p>
                )}
                <input type='submit' onClick={formik.handleSubmit} value='Sing in' />
            </div>
            <GoogleLogin
                clientId="478587460975-giu0a4b1k75e7l2j3otss7oevhdccfdu.apps.googleusercontent.com"
                buttonText="Create account with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                className="google"
                render={renderProps => (
                    <button 
                        style={googleButton}
                        onClick={renderProps.onClick} 
                        disabled={renderProps.disabled}
                    >Create account with Google
                    </button>
                  )}
            />
        </div>
    )
}

export default SignIn

const googleButton = {
    height: 40,
    width: '30%',
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
    cursor: 'pointer'
}