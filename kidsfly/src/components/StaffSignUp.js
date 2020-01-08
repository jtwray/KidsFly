import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { withFormik, Form, Field } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { SignUpWrapper, SubmitBtn, SubmitWrapper,
   halfWidth, fullWidth, formFlex, RedirectWrap } from './styles';
import SignUpAs from "./SignUpAs";


const StaffSignUp = ({ values, errors, touched, status }) => {
   const [staff, setStaff] = useState([]);

   useEffect(() => {
      console.log('status has changed', status);
      status && setStaff(staff => [...staff, status]);
   }, [status]);

   return (
      <div>
         <SignUpAs />
         <SignUpWrapper>
            <Form style={formFlex}>  
               <Field style={halfWidth} type='text' name='fname' placeholder='First Name' />
               {touched.fname && errors.fname && (
                  <p className='errors'>{errors.fname}</p>
               )}

               <Field style={halfWidth} type='text' name='lname' placeholder='Last Name' />
               {touched.lname && errors.lname && (
                  <p className='errors'>{errors.lname}</p>
               )} 

               <Field style={fullWidth} type='email' name='email' placeholder='Email' />
               {touched.email && errors.email && (
                  <p className='errors'>{errors.email}</p>
               )}
                       
               <Field style={fullWidth} type='password' name='password' placeholder='Password' />
               {touched.password && errors.password && (
                  <p className='errors'>{errors.password}</p>
               )}
            
               <Field style={fullWidth} type='password' name='confirm' placeholder='Confirm Password' />
               {touched.confirm && errors.confirm && (
                  <p className='errors'>{errors.confirm}</p>
               )}

               <SubmitWrapper>
                  <SubmitBtn type='submit'>Apply</SubmitBtn>
               </SubmitWrapper>
            </Form>
         </SignUpWrapper>

         <RedirectWrap>
            <div>If you already have an account, please <Link to='/log-in'>Log-In here</Link></div>
         </RedirectWrap>

         {staff.map(employee => {
            return (
               <ul key={employee.lname}>
                  <li>{employee.fname}</li>
                  <li>{employee.lname}</li>
                  <li>{employee.email}</li>
                  <li>{employee.password}</li>
               </ul>
            );
         })}
      </div>
   );
};

const FormikStaffSignUp = withFormik({
   mapPropsToValues(props) {
      return {
         fname: props.fname || '',
         lname: props.lname || '',
         email: props.email || '',
         password: props.password || '',
         confirm: props.confirm || '',
         tos: props.tos || false,
      };
   },

   validationSchema: Yup.object().shape({
      fname: Yup
         .string()
         .required('please enter your first name'),
      lname: Yup
         .string()
         .required('please enter your last name'),
      email: Yup
         .string()
         .required('please enter your email'),
      password: Yup
         .string()
         .min(6, 'your password must be 6 characters or longer')
         .required('please enter a password'),
      confirm: Yup
         .string()
         .min(6, 'your password must be 6 characters or longer')
         .required('please confirm your password'),
      tos: Yup
         .bool()
         .oneOf([true], 'You must accept the terms of service to continue')
         .required()
   }),

   handleSubmit(values, { setStatus, resetForm }) {
      console.log('submitting', values);
      axios
      .post('https://reqres.in/api/users', values)
      .then(res => {
         console.log('success', res);
         setStatus(res.data);
         resetForm();
      })
      .catch(err => console.log('NOOOOO!!!', err.response));
   },
})(StaffSignUp);

export default FormikStaffSignUp;
