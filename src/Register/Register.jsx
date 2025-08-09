import React, { useContext, useState } from 'react';
 
import axios  from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CounterContext } from '../Context/UserContext';
//handleChange built in formik
//handleBlur built in formik
//in tag form exist Attribute onSubmit={formik.handleSubmit}=> prevent reload page and call on fun handlingRegister and return values
//property validate in formik when you make custom schema
//property validationSchema when you use Shema
function Register(){ 
  let navigate=useNavigate();
  let {setCounter}=useContext(CounterContext)
  let [apiError,setError]=useState('');
  let [isLoading,setIsLoading]=useState(false);

   function handlingRegister(formValues){
    setIsLoading(true);
     axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',formValues).then((apiResponse)=>{
       setIsLoading(false)
       console.log(apiResponse?.data?.token);
       setCounter(apiResponse?.data?.token)
       setError('');
       navigate('/');//move to home page must when use it to be routing
       
       if(localStorage['userToken'] == null){
        localStorage['userToken']=JSON.stringify(apiResponse?.data?.token)
       }
     }).catch((apiResponse)=>{
      setIsLoading(false)
      console.log(apiResponse?.response?.data?.message);
      setError(apiResponse?.response?.data?.message);

     });
 
  } 
 
 let schema =Yup.object().shape({
  name:Yup.string().min(3,'min length 3').max(10,'max length 10').required('must enter name'),
  email:Yup.string().email('invalid email').required("must enter email"),
  phone:Yup.string().matches(/^01[0125][0-9]{8}$/,'invalid egyption phone number').required("must enter phone"),
  password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,'invalid password').required("must enter password"),
  rePassword:Yup.string().oneOf([Yup.ref('password')],'password and repassword must be the same').required("must enter password"),

 });

  let  formik=useFormik({
    initialValues:{
      name:'',
      email:'',
      phone:'',
      password:'',
      rePassword:'' 
    },
    validationSchema :schema,
   onSubmit:handlingRegister
  });
  return (
    <div className="containerForm">
      <form onSubmit={formik.handleSubmit}>
      {apiError&&<div className="error" >
          <p>{apiError}</p>
        </div>}
        <div>
          <label htmlFor='name'>Enter your name : </label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} id='name' name='name' value={formik.values.name} type="text" />
        </div>
        {(formik.errors.name && formik.touched.name)?<div className="error" >
          <p>{formik.errors.name}</p>
        </div>:null}
        <div>
          <label htmlFor='email'>Enter your email : </label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} id='email' name='email' value={formik.values.email} type="email" />
        </div>
        {(formik.errors.email && formik.touched.email)?<div className="error">
          <p>{formik.errors.email}</p>
        </div>:null}
        <div>
          <label htmlFor='phone'>Enter your phone : </label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} id='phone' name='phone' value={formik.values.phone} type="tel" />
        </div>
        {(formik.errors.phone && formik.touched.phone)?<div className="error">
          <p>{formik.errors.phone}</p>
        </div>:null}
        <div>
          <label htmlFor='password'>Enter your password : </label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} id='password' name='password' value={formik.values.password} type="password" />
        </div>
          {(formik.errors.password && formik.touched.password)?<div className="error">
          <p>{formik.errors.password}</p>
        </div>:null}
        <div>
          <label htmlFor='rePassword'>Enter your rePassword : </label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} id='rePassword' name='rePassword' value={formik.values.rePassword} type="password" />
        </div>
          {(formik.errors.rePassword && formik.touched.rePassword)?<div className="error">
          <p>{formik.errors.rePassword}</p>
        </div>:null}

        {isLoading?<button>Loading</button>:<button type="submit">Submit</button>}
        
        </form>                      
    </div>
  );
}

export default Register;
