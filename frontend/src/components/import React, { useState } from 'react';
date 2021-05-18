import React, { useState } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';

function Register(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        props.handleRegister(email,password);
        const jwt = localStorage.getItem('jwt');
        if(jwt){
            history.push('/');
        }
    }
  

    return (
        <div className="register" >
            <p className="login__welcome">
                Sign up
                 </p>
            <form className="login__form" onSubmit={handleSubmit}>
                <input className="login__input" placeholder="Email" name="email" type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                <input className="login__input" placeholder="Password" name="password" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                <button type="submit" className="login__btn">Sign up</button>
            </form>

            <div className="login__signup">
                <p>Already a member?
                <Link to="signin" className="signup__link">Log in here!</Link>
                </p>
            </div>
        </div>
    )
}





export default withRouter(Register);