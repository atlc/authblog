import React from 'react';
import { api, User } from '../../utils/api-service';

const Logout = () => {

    if (User && User.userid !== null && User.roles.includes('user')) {
        const { userid } = User;
        api(`/auth/logout/${userid}`);
        localStorage.clear();
    }

    return (
        <>
            <h1 className="text-center mt-5">Logged out!</h1>
        </>
    );
}

export default Logout;