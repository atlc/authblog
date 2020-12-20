import React, { useState } from 'react';

const Login = () => {
    const [firstname, updateFirstName] = useState('');
    const [lastname, updateLastName] = useState('');
    const [avatar, updateAvatar] = useState('https://i.imgur.com/MSg2a9d.jpg');
    const [email, updateEmail] = useState('');
    const [password, updatePassword] = useState('');

    const handleFirstNameUpdate = (event: React.ChangeEvent<HTMLInputElement>) => updateFirstName(event.target.value);
    const handleLastNameUpdate = (event: React.ChangeEvent<HTMLInputElement>) => updateLastName(event.target.value);
    const handleAvatarUpdate = (event: React.ChangeEvent<HTMLInputElement>) => updateAvatar(event.target.value);
    const handleEmailUpdate = (event: React.ChangeEvent<HTMLInputElement>) => updateEmail(event.target.value);
    const handlePasswordUpdate = (event: React.ChangeEvent<HTMLInputElement>) => updatePassword(event.target.value);


    const register = async () => {
        const loginOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstname,
                lastname,
                avatar,
                email,
                password
            })
        };
        const res = await fetch('/auth/register', loginOptions);
        const loginRes = await res.json();
        const status = await res.status;

        alert(loginRes);

        if (status === 201) alert('Please go to the login page.')
    }

    return (
        <>
            <h1 className="text-center mt-5">Register!</h1>
            <div className="card text-white bg-dark m-3 shadow-lg">
                <div className="card-body">
                    <div className="form-inline m-2 bg-secondary">
                        <label className="mx-2">First Name:</label>
                        <input type="text" className="form-control ml-2" onChange={handleFirstNameUpdate} placeholder="Enter your first name here:" />
                    </div>
                    <div className="form-inline m-2">
                        <label className="mx-2">Last Name:</label>
                        <input type="text" className="form-control ml-2" onChange={handleLastNameUpdate} placeholder="Enter your last name here:" />
                    </div>
                    <div className="form-inline m-2 bg-warning">
                        <label className="mx-2">Avatar URL:</label>
                        <input type="text" className="form-control ml-2" onChange={handleAvatarUpdate} placeholder="Optional link to image:" />
                    </div>
                    <div className="form-inline m-2">
                        <label className="mx-2">Email address</label>
                        <input type="email" className="form-control ml-2" onChange={handleEmailUpdate} placeholder="Enter your email here:" />
                    </div>
                    <div className="form-inline m-2 bg-primary">
                        <label className="mx-2">Password</label>
                        <input type="password" className="form-control ml-2" onChange={handlePasswordUpdate} placeholder="Enter your password here:" />
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