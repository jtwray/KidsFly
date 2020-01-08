import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { withFormik, Form, Field } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { SignUpWrapper, SubmitBtn, SubmitWrapper,
   halfWidth, fullWidth, formFlex, RedirectWrap } from './styles';
import SignUpAs from "./SignUpAs";


const TravelerSignUp = ({ values, errors, touched, status }) => {
   const [travelers, setTravelers] = useState([]);

   useEffect(() => {
      console.log('status has changed', status);
      status && setTravelers(travelers => [...travelers, status]);
   }, [status]);

   return (
      <div>
         <SignUpAs />
         <SignUpWrapper>
            <Form style={formFlex}>  
               <Field style={halfWidth} type='text' name='first_name' placeholder='First Name' />
               {touched.first_name && errors.first_name && (
                  <p className='errors'>{errors.first_name}</p>
               )}

               <Field style={halfWidth} type='text' name='last_name' placeholder='Last Name' />
               {touched.last_name && errors.last_name && (
                  <p className='errors'>{errors.last_name}</p>
               )} 

               <Field style={fullWidth} type='email' name='username' placeholder='Email' />
               {touched.username && errors.username && (
                  <p className='errors'>{errors.username}</p>
               )}
                       
               <Field style={fullWidth} type='password' name='password' placeholder='Password' />
               {touched.password && errors.password && (
                  <p className='errors'>{errors.password}</p>
               )}
            
               {/* <Field style={fullWidth} type='password' name='confirm' placeholder='Confirm Password' /> */}
               {/* {touched.confirm && errors.confirm && (
                  <p className='errors'>{errors.confirm}</p>
               )} */}

               <Field style={halfWidth} type='text' name='street_address' placeholder='Street Address' />
               {touched.street_address && errors.street_address && (
                  <p className='errors'>{errors.street_address}</p>
               )}

               <Field style={halfWidth} type='text' name='city' placeholder='City' />
               {touched.city && errors.city && (
                  <p className='errors'>{errors.city}</p>
               )}

               <Field style={halfWidth} type='text' name='state' placeholder='State' />
               {touched.state && errors.state && (
                  <p className='errors'>{errors.state}</p>
               )}

               <Field style={halfWidth} type='text' name='zip' placeholder='Zip Code' />
               {touched.zip && errors.zip && (
                  <p className='errors'>{errors.zip}</p>
               )}

               <Field style={halfWidth} type='text' name='home_airport' placeholder='Home Airport Code' />
               {touched.home_airport && errors.home_airport && (
                  <p className='errors'>{errors.home_airport}</p>
               )}

               <Field style={halfWidth} type='tel' name='phone_number' placeholder='Phone Number' />
               {touched.phone_number && errors.phone_number && (
                  <p className='errors'>{errors.phone_number}</p>
               )}

               <SubmitWrapper>
                  <SubmitBtn type='submit'>Submit</SubmitBtn>
               </SubmitWrapper>
            </Form>
         </SignUpWrapper>

         <RedirectWrap>
            <div>If you already have an account, please <Link to='/log-in'>Log-In here</Link></div>
         </RedirectWrap>

         {travelers.map(traveler => {
            return (
               <ul key={traveler.last_name}>
                  <li>{traveler.first_name}</li>
                  <li>{traveler.last_name}</li>
                  <li>{traveler.username}</li>
                  <li>{traveler.password}</li>
                  <li>{traveler.street_address}</li>
                  <li>{traveler.city}</li>
                  <li>{traveler.state}</li>
                  <li>{traveler.zip}</li>
                  <li>{traveler.phone_number}</li>
                  <li>{traveler.home_airport}</li>
               </ul>
            );
         })}
      </div>
   );
};

const FormikTravelerSignUp = withFormik({
   mapPropsToValues(props) {
      return {
         first_name: props.first_name || '',
         last_name: props.last_name || '',
         username: props.username || '',
         password: props.password || '',
         // confirm: props.confirm || '',
         street_address: props.street_address || '',
         city: props.city || '',
         state: props.state || '',
         zip: props.zip || '',
         home_airport: props.home_airport || '',
         phone_number: props.phone_number || '',
         tos: props.tos || false,
      };
   },

   validationSchema: Yup.object().shape({
      first_name: Yup
         .string()
         .required('please enter your first name'),
      last_name: Yup
         .string()
         .required('please enter your last name'),
      username: Yup
         .string()
         .required('please enter your email'),
      password: Yup
         .string()
         .min(6, 'your password must be 6 characters or longer')
         .required('please enter a password'),
      // confirm: Yup
      //    .string()
      //    .oneOf([Yup.ref('password'), 'this must match the password you entered'])
      //    .min(6, 'your password must be 6 characters or longer')
      //    .required('please confirm your password'),
      street_address: Yup
         .string()
         .required('please enter your address'),
      city: Yup
         .string()
         .required('please enter your city and state'),
      state: Yup
         .string()
         .required('please enter your city and state'),
      zip: Yup
         .string()
         .required('please enter your zip code'),
      home_airport: Yup
         .string()
         .max(3)
         .required("please enter your home airport's 3-letter code"),
      phone_number: Yup
         .string()
         .required('please enter your phone number'),
      tos: Yup
         .bool()
         .oneOf([true], 'You must accept the terms of service to continue')
         .required()
   }),

   handleSubmit(values, { setStatus, resetForm }) {
      console.log('submitting', values);
      axios
      .post('https://bw-kids-fly.herokuapp.com/api/auth/register/user', values)
      .then(res => {
         console.log('success', res);
         setStatus(res.data);
         resetForm();
      })
      .catch(err => console.log('NOOOOO!!!', err.response));
   },
})(TravelerSignUp);

export default FormikTravelerSignUp;
