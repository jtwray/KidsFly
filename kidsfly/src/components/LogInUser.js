import React, { useState, useEffect } from "react";
import {connect} from 'react-redux'
import {loginUser} from "../store/actions"
import { Link ,useHistory} from 'react-router-dom';
import { withFormik, Form, Field } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { LogInWrapper, fullWidth, formFlex, LogInBtn, RedirectWrap } from './styles';
import LogInAs from "./LogInAs";
import { axiosWithAuth } from "../utils";


const LogIn = ({ values, errors, touched, status,setStatus,resetForm },props) => {
   const [member, setMember] = useState([]);
   const history=useHistory()
// console.log("props",props)
// console.log("values",values)
// console.log("props.email",props.email)
// console.log("history",history,loginUser)
useEffect(() => {
   // console.log('status has changed', status);
   status && setMember(member => [...member, status]);
}, [status]);


const handleSubmit=(e )=> {
e.preventDefault();
   console.log('submitting', values);

   axiosWithAuth()
   .post(`/login`, values)
   .then(res => {
      console.log('success', res);
      setStatus(res.data);
     localStorage.setItem(`token`,res.data.payload)
      history.push('/dashboard')
   })
   .catch(err => console.error(err, err.response),
   history.push('/dashboard')
   );
//  (loginUser(values));
//  localStorage.getItem("token")&&history.push("/dashboard");
 


}

return (
   <div>
         <LogInAs />
         <LogInWrapper>
            <Form onSubmit={(e)=>handleSubmit(e)} style={formFlex}>  
               <Field style={fullWidth} type='email' name='email' placeholder='Username (Email)' />
               {touched.email && errors.email && (
                  <p className='errors'>{errors.email}</p>
                  )}
                       
               <Field style={fullWidth} type='password' name='password' placeholder='Password' />
               {touched.password && errors.password && (
                  <p className='errors'>{errors.password}</p>
                  )}

               <LogInBtn style={fullWidth} type='submit'>Log In</LogInBtn>
            </Form >
         </LogInWrapper>

         <RedirectWrap>
            <div>If you don't already have an account, please <Link to='/sign-up'>Sign Up here</Link></div>
         </RedirectWrap>

         {member.map(member => {
            return (
               <ul key={member.lname}>
                  <li>{member.email}</li>
                  <li>{member.password}</li>
               </ul>
            );
         })}
      </div>
   );
};

const FormikLogIn = withFormik({
   mapPropsToValues(props) {
      return {
         email: props.email || '',
         password: props.password || '',
      };
   },
   
   validationSchema: Yup.object().shape({
      email: Yup
      .string()
      .required('please enter your email'),
      password: Yup
      .string()
      .min(6, 'your password must be 6 characters or longer')
      .required('please enter a password'),
   }),
   
  
})(LogIn);


export default connect(null,{loginUser})( FormikLogIn);
