import { useEffect } from "react";
import ReactDOM from "react-dom";
import { useSnackbar } from "notistack";
import { useHistory} from 'react-router-dom';
import { register } from "../../components/service";
import "./Register.css"
import { Formik, Form,useField } from "formik";
import * as Yup from "yup";

const Register=()=>{
  const {enqueueSnackbar}=useSnackbar()
  const navigate = useHistory();
  const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
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
    // React treats radios and checkbox inputs differently other input types, select, and textarea.
    // Formik does this too! When you specify `type` to useField(), it will
    // return the correct bag of props for you -- a `checked` prop will be included
    // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
      <div>
        <label className="checkbox-input">
          <input type="checkbox" {...field} {...props} />
          {children}
        </label>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    );
  };
    return (
        <>
        <h1>Sign Up</h1>
        <Formik
          initialValues={{
            email: '',
            username:'',
            password: '',
            confirmPassword: '',
            acceptedTerms: false
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required('Username is required'),
            email: Yup.string()
              .email('Email is invalid')
              .required('Email is required'),
            password: Yup.string()
              .min(6, 'Password must be at least 6 characters')
              .required('Password is required'),
            confirmPassword: Yup.string()
              .required('Confirm Password is required')
              .oneOf([Yup.ref('password'), null], 'Passwords do not match'),
            acceptedTerms: Yup.boolean()
            .required("Required")
            .oneOf([true], "You must accept the terms and conditions."),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
    
              let dataToSubmit = {
                username:values.username,
                email: values.email,
                password: values.password
              };
    
              register(dataToSubmit)
              .then((response)=>{
                  enqueueSnackbar('Register was successful',{
                      variant:'success',
                      anchorOrigin:{
                          vertical:'bottom',horizontal:'center',
                      },
                  });
                      navigate('./login');

              }).catch((error)=>{
                  enqueueSnackbar('Register failed',{
                      variant:'error',
                      anchorOrigin:{
                          vertical:'bottom',horizontal:'center'
                      },
                  });
              });
              setSubmitting(false);
            }, 500);
          }}
        >
          
          <Form>
         <MyTextInput
             label="Username"
             name="username"
             type="text"
             placeholder="Username"
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
             name="confirmPassword"
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