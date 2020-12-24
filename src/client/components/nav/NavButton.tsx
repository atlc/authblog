import React from 'react';
import { NavLink } from 'react-router-dom';

const NavButton = (props: NavButtonProps) => {
    const { path, text } = props;
    return (
        <NavLink className="btn btn-secondary text-white mx-2" activeClassName="active-navlink" exact to={path}>{text}</NavLink>
    )
}

interface NavButtonProps {
    path: string;
    text: string;
};

export default NavButton;