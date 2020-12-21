import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api, SetAccessToken } from '../../utils/api-service'

const Login = () => {
    const [email, updateEmail] = useState('');
    const [password, updatePassword] = useState('');
    const [isRegistering, setRegistering] = useState(false);
    const history = useHistory();


    const login = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (isRegistering) return;

        const credentials: {} = {
            email,
            password
        };

        try {
            setRegistering(true);
            const login = await api('/auth/login', 'POST', credentials);
            const { token, userid, roles } = await login.json();
            if (token) {
                SetAccessToken(token, { userid, roles });
                history.replace('/');
            } else {
                alert('There was an error authenticating.')
            }
        } catch (e) {
            console.log(e);
        } finally {
            setRegistering(false);
        }
    }

    return (
        <>
            <h1 className="text-center mt-5">Login!</h1>
            <div className="card text-black bg-light m-3 shadow-lg">
                <div className="card-header text-dark bg-warning">
                    <input type="email" placeholder="Enter your email:" onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateEmail(e.target.value)} />
                </div>
                <div className="card-header text-dark bg-secondary">
                    <input type="password" placeholder="Enter your password:" onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePassword(e.target.value)} />
                </div>
                <div className="card-footer bg-primary">
                    <div className="row">
                        <button className="btn btn-secondary m-2 shadow text-white" onClick={(e) => login(e)}>Login!</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;