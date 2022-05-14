import { useEffect } from "react";
import ReactDOM from "react-dom";
import "../Login/Login.css"
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";

const Register=()=>{
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
      const MyCheckbox = ({ children, ...props }) => {
        const [field, meta] = useField({ ...props, type: "checkbox" });
        return (
          <>
            <label className="checkbox">
              <input {...field} {...props} type="checkbox" />
              {children}
            </label>
            {meta.touched && meta.error ? (
              <div className="error">{meta.error}</div>
            ) : null}
          </>
        );
      };
      
    return (
        <>
        <h1>Sign Up</h1>
        <Formik
          initialValues={{
            email: '',
            lastName: '',
            firstName: '',
            password: '',
            confirmPassword: '',
            acceptedTerms: false
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string()
                .max(15, "Must be 15 characters or less")
                .required('Name is required'),
            lastName: Yup.string()
            .max(15, "Must be 20 characters or less")
            .required('Last Name is required'),
            email: Yup.string()
              .email('Email is invalid')
              .required('Email is required'),
            password: Yup.string()
              .min(6, 'Password must be at least 6 characters')
              .required('Password is required'),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref('password'), null], 'Passwords must match')
              .required('Confirm Password is required'),
            acceptedTerms: Yup.boolean()
            .required("Required")
            .oneOf([true], "You must accept the terms and conditions."),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
    
              let dataToSubmit = {
                email: values.email,
                password: values.password,
                name: values.name,
                lastname: values.lastname,
              
              };
    
              setSubmitting(false);
            }, 500);
          }}
        >
          
          <Form>
          <MyTextInput
            label="First Name"
            name="firstName"
            type="text"
            placeholder="First Name"
          />
          <MyTextInput
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Last Name"
          />
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
           <MyTextInput
            label="Confirm Password"
            name="confirmpassword"
            type="password"
            placeholder="Confirm Password"
          />
          <MyCheckbox name="acceptedTerms">
            I accept the terms and conditions
          </MyCheckbox>

          <button type="submit">Submit</button>
        </Form>
        
        </Formik>
        </>
      );
}
export default Register;