import React from 'react';
import { Link } from 'react-router-dom';

const NavButton = (props: NavButtonProps) => {
    const { path, text } = props;
    return (
        <Link className="btn bg-secondary text-white mx-2" to={path}>{text}</Link>
    )
}

interface NavButtonProps {
    path: string;
    text: string;
};

export default NavButton;