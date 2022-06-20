import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function SignUp() {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const history = useHistory();

    const onTextChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    function onFormSubmit(e) {
        e.preventDefault();
        axios.post('/api/account/signup', formData);
        history.push('/login');
    }

    return (
        <div className="row">
            <div className="col-md-6 offset-md-3 card card-body bg-light">
                <h3>Sign up for a new account</h3>
                <form onSubmit={onFormSubmit}>
                    <input onChange={onTextChange} value={formData.firstName} type="text"
                        name="firstName" placeholder="First Name" className="form-control" />
                    <br />
                    <input onChange={onTextChange} value={formData.lastName} type="text"
                        name="lastName" placeholder="Last Name" className="form-control" />
                    <br />
                    <input onChange={onTextChange} value={formData.email} type="text"
                        name="email" placeholder="Email" className="form-control" />
                    <br />
                    <input onChange={onTextChange} value={formData.password} type="password"
                        name="password" placeholder="Password" className="form-control" />
                    <br />
                    <button className="btn btn-primary">SignUp</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp;