import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CounterContext } from '../Context/UserContext';

function Nav(){
  let {counter,setCounter}=useContext(CounterContext);
    let navigate=useNavigate();

    function LogOut(){
        navigate('/login');
        localStorage.removeItem('userToken');
        setCounter(null);
        
    }
  return (
    <div>
      <nav>
        <div className="head1">
          <h1>E-commerce</h1>
          <ul>
            {
              counter?<>
            <li><NavLink className="Navlink" to="">Home</NavLink></li>
            <li><NavLink className="Navlink" to="products">Products</NavLink></li>
            <li><NavLink className="Navlink" to="categories">Categories</NavLink></li>
            <li><NavLink className="Navlink" to="brands">Brands</NavLink></li>
            <li><NavLink className="Navlink" to="contacts">Contacts</NavLink></li>
            </>:null
            }
       
        </ul>
        </div>
        <div className="head2">
           <ul>
            {
              counter?<li><span className="Navlink" style={ {cursor:'pointer'} } onClick={LogOut} >LogOut</span></li>:<>
                   
            <li><NavLink className="Navlink" to="login">LogIn</NavLink></li>
            <li><NavLink className="Navlink" to="register">Register</NavLink></li>
              </>

            }

          </ul> 
        </div>
      </nav>
    </div>
  );
}

export default Nav;

