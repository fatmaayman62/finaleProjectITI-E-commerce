import React, { useContext, useState } from 'react'; 
import axios  from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CounterContext } from '../Context/UserContext';
 
//handleChange built in formik
//handleBlur built in formik
//in tag form exist Attribute onSubmit={formik.handleSubmit}=> prevent reload page and call on fun handlingRegister and return values
//property validate in formik when you make custom schema
//property validationSchema when you use Shema
function Login(){ 
  let navigate=useNavigate();
 let {setCounter}=useContext(CounterContext)

  let [apiError,setError]=useState('');
  let [isLoading,setIsLoading]=useState(false);

   function handlingLogin(formValues){
    setIsLoading(true);
     axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',formValues).then((apiResponse)=>{
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
   email:Yup.string().email('invalid email').required("must enter email"),
   password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,'invalid password').required("must enter password")
 
 });

  let  formik=useFormik({
    initialValues:{ 
      email:'', 
      password:'' 
    },
    validationSchema :schema,
   onSubmit:handlingLogin
  });
  return (
    <div className="containerForm">
      <form onSubmit={formik.handleSubmit}>
      {apiError&&<div className="error" >
          <p>{apiError}</p>
        </div>}
      
        <div>
          <label htmlFor='email'>Enter your email : </label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} id='email' name='email' value={formik.values.email} type="email" />
        </div>
        {(formik.errors.email && formik.touched.email)?<div className="error">
          <p>{formik.errors.email}</p>
        </div>:null}
        
        <div>
          <label htmlFor='password'>Enter your password : </label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} id='password' name='password' value={formik.values.password} type="password" />
        </div>
          {(formik.errors.password && formik.touched.password)?<div className="error">
          <p>{formik.errors.password}</p>
        </div>:null}
        

        {isLoading?<button>Loading</button>:<button type="submit">Submit</button>}
        <p>didn't have account yet? <span><Link className='Navlink' style={ {color:'black', fontWeight:800} } to='register'>Register Now</Link></span></p>
        </form>                      
    </div>
  );
}

export default Login;
