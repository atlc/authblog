import React, { useState } from 'react';
import { json } from '../../utils/api-service'

const Login = () => {
    const [firstname, updateFirstName] = useState('');
    const [lastname, updateLastName] = useState('');
    const [avatar, updateAvatar] = useState('https://i.imgur.com/MSg2a9d.jpg');
    const [email, updateEmail] = useState('');
    const [password, updatePassword] = useState('');

    const register = async () => {
        const body: {} = JSON.stringify({
            firstname,
            lastname,
            avatar,
            email,
            password
        });

        const register = await json('/auth/register', 'POST', body);
        const stat = await register.status;

        alert(stat);

        if (stat === 201) alert('Please go to the login page.')
    }

    return (
        <>
            <h1 className="text-center mt-5">Register!</h1>
            <div className="card text-white bg-dark m-3 shadow-lg">
                <div className="card-body">
                    <div className="form-inline m-2 bg-secondary">
                        <label className="mx-2">First Name:</label>
                        <input type="text" className="form-control ml-2" onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFirstName(e.target.value)} placeholder="Enter your first name here:" />
                    </div>
                    <div className="form-inline m-2">
                        <label className="mx-2">Last Name:</label>
                        <input type="text" className="form-control ml-2" onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateLastName(e.target.value)} placeholder="Enter your last name here:" />
                    </div>
                    <div className="form-inline m-2 bg-warning">
                        <label className="mx-2">Avatar URL:</label>
                        <input type="text" className="form-control ml-2" onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAvatar(e.target.value)} placeholder="Optional link to image:" />
                    </div>
                    <div className="form-inline m-2">
                        <label className="mx-2">Email address</label>
                        <input type="email" className="form-control ml-2" onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateEmail(e.target.value)} placeholder="Enter your email here:" />
                    </div>
                    <div className="form-inline m-2 bg-primary">
                        <label className="mx-2">Password</label>
                        <input type="password" className="form-control ml-2" onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePassword(e.target.value)} placeholder="Enter your password here:" />
                    </div>
                    <div className="card-footer">
                        <div className="row">
                            <button className="btn btn-secondary m-2 shadow text-white" onClick={register}>Register!</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;