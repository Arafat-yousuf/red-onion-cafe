import React from 'react';
import './Login.css';
import { useForm } from 'react-hook-form';
import Logo from '../../Images/logo2.png';
import {Link} from 'react-router-dom';
import { useAuth } from './useAuth';

const Login = (props) => {
    const { register, handleSubmit, watch, errors } = useForm();
    //console.log(props);
    

    const auth = useAuth();
    const onSubmit = data => { 
        if(props.returningUser){
            if(data.email && data.password){
                auth.signIn(data.email, data.password);
            }
        }else{
            if(data.name && data.email && data.password && data.confirm_password &&(data.password===data.confirm_password)){
                auth.signUp(data.email, data.confirm_password,data.name)
            }
        }
        
     }
     
    return (
        <div className ="login">
            <div className="container">
                <div className="logo text-center">
                    <Link to="/">
                         <img src={Logo} alt=""/>
                    </Link>
                </div>
                
                {
                props.returningUser ? 
                <form onSubmit={handleSubmit(onSubmit)} className="py-5">
                    {
                    auth.user != null && <p className="text-danger">* {auth.user.error}</p>
                    }
                    <div className="form-group">
                        <input name="email" className="form-control" ref={register({ required: true })} placeholder="Email"/>
                        {errors.email && <span className="error">Email is required</span>}
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" className="form-control" ref={register({ required: true })} placeholder="Password" />
                        {errors.password && <span className="error">Password is required</span>}
                    </div>
                    
                    <div className="form-group">
                        <button className="btn btn-danger btn-block" type="submit">Sign In</button>
                    </div>
                    <div className="option text-center">
                        <button className ="create"  onClick={() => props.handleReturningUser(false)}>Create a new Account</button>
                    </div>
                </form>
                :
                <form onSubmit={handleSubmit(onSubmit)} className="py-5">
                    {
                    auth.user != null && <p className="text-danger">* {auth.user.error}</p>
                    }
                    <div className="form-group">
                        <input name="name" type="text" className="form-control" ref={register({ required: true })} placeholder="Name" />
                        {errors.name && <span className="error">Name is required</span>}
                    </div>
                    <div className="form-group">
                        <input name="email" type="email" className="form-control" ref={register({ required: true })} placeholder="Email"/>
                        {errors.email && <span className="error">Email is required</span>}
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" className="form-control" ref={register({ required: true })} placeholder="Password" />
                        {errors.password && <span className="error">Password is required</span>}
                    </div>
                    <div className="form-group">
                        <input type="password" name="confirm_password" className="form-control" ref={register({
                        validate: (value) => value === watch('password')
                        })} placeholder="Confirm Password" />
                        {errors.confirm_password && <span className="error">Passwords don't match.</span>}
                    </div>
                    <div className="form-group">
                        <button className="btn btn-danger btn-block"  type="submit">Sign Up</button>
                    </div>
                    <div className="option text-center">
                        <button className="create" onClick={() => props.handleReturningUser(true)}>Already Have an Account</button>
                    </div>
                </form>

                }
               
            </div>
        </div>
    );
};

export default Login;