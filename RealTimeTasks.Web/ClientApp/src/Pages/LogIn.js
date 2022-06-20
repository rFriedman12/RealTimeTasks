import axios from 'axios';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useTasksContext } from '../TasksContext';

function LogIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const { setUser } = useTasksContext();
    const [isValidUser, setIsValidUser] = useState(true); 

    async function onFormSubmit(e) {
        e.preventDefault();
        const { data } = await axios.post('/api/account/login', { email, password });
        // setIsValidUser(data.firstName === '');
        // if (isValidUser) {
            setUser(data);
            history.push('/');
        //}      
    }

    return (
        <div className="row">
            <div className="col-md-6 offset-md-3 card card-body bg-light">
                <h3>Log in to your account</h3>
                {!isValidUser && <span className='text-danger'>Invalid username/password. Please try again.</span>}
                <form onSubmit={onFormSubmit}>
                    <input onChange={e => setEmail(e.target.value)} value={email} type="text"
                        name="email" placeholder="Email" className="form-control" />
                    <br />
                    <input onChange={e => setPassword(e.target.value)} value={password} type="password"
                        name="password" placeholder="Password" className="form-control" />
                    <br />
                    <button className="btn btn-primary">Login</button>
                </form>
                <Link to="/signup">Sign up for a new account</Link>
            </div>
        </div>
    )
}

export default LogIn;