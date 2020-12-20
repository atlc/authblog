import React, { useState } from 'react';

const Login = () => {
    const [email, updateEmail] = useState('');
    const [password, updatePassword] = useState('');

    const handleEmailUpdate = (event: React.ChangeEvent<HTMLInputElement>) => updateEmail(event.target.value);
    const handlePasswordUpdate = (event: React.ChangeEvent<HTMLInputElement>) => updatePassword(event.target.value);
    
    const login = async () => {
        const loginOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password
            })
        };
        const res = await fetch('/auth/login', loginOptions);
        const loginRes = await res.json();
        const token = await loginRes.token;
        if (token) {
            localStorage.setItem('token', token);
            alert('Success!');
        } else {
            alert('There was an error authenticating.')
        }
    }

    return (
        <>
            <h1 className="text-center mt-5">Login!</h1>
            <div className="card text-black bg-light m-3 shadow-lg">
                <div className="card-header text-dark bg-warning">
                    <input type="email" placeholder="Enter your email:" onChange={handleEmailUpdate}/>
                </div>
                <div className="card-header text-dark bg-secondary">
                    <input type="password" placeholder="Enter your password:" onChange={handlePasswordUpdate}/>
                </div>
                <div className="card-footer bg-primary">
                    <div className="row">
                        <button className="btn btn-secondary m-2 shadow text-white" onClick={login}>Login!</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;