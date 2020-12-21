import React, { useEffect } from 'react';

const Logout = () => {
    localStorage.clear();

    return (
        <>
            <h1 className="text-center mt-5">Logged out!</h1>
        </>
    );
}

export default Logout;