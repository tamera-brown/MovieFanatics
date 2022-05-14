import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login.css"
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";

const Login=()=>{
    const MyTextInput = ({ label, ...props }) => {
        // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
        // which we can spread on <input> and alse replace ErrorMessage entirely.
        const [field, meta] = useField(props);
        return (
          <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
              <div className="error">{meta.error}</div>
            ) : null}
          </>
        );
      };
      
    return (
        <>
          <h1>Login</h1>
          <Formik
            initialValues={{
              email: "",
              password: ""
        
            }}
            
            validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email('Email is invalid')
                  .required('Email is required'),
                password: Yup.string()
                  .min(6, 'Password must be at least 6 characters')
                  .required('Password is required'),
              })}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  let dataToSubmit = {
                    email: values.email,
                    password: values.password
                  };
            //       dispatch(loginUser(dataToSubmit))
            // .then(response => {
            //   if (response.payload.loginSuccess) {
            //     window.localStorage.setItem('userId', response.payload.userId);
            //     if (rememberMe === true) {
            //       window.localStorage.setItem('rememberMe', values.id);
            //     } else {
            //       localStorage.removeItem('rememberMe');
            //     }
            //     props.history.push("/");
            //   } else {
            //     setFormErrorMessage('Check out your Account or Password again')
            //   }
            // })
            // .catch(err => {
            //   setFormErrorMessage('Check out your Account or Password again')
            //   setTimeout(() => {
            //     setFormErrorMessage("")
            //   }, 3000);
            // });
          setSubmitting(false);
        }, 500);
      }}
          >
            <Form>
              <MyTextInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="Email"
              />
               <MyTextInput
                label="Password"
                name="password"
                type="password"
                placeholder="Password"
              />
              
              <button type="submit">Submit</button>
              <div>
                Or <Link to={"/register"}>register now!</Link>
                </div>
            </Form>
          </Formik>
        </>
      );
}
export default Login;