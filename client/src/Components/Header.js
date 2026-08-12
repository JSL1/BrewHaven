import React, { Component } from "react";
import Link from "react-router-dom";

const NavItem = (props) => {
    if (!props.cart) {
        return (
        <div className="nav-item">
            <Link to={props.to} className='nav-link'>{props.name}</Link>
        </div>)
    } else {
        return (
            <dliv className="nav-item-cart">
                <Link to='./'>(0) Cart</Link>
            </dliv>
        );
    }
}

const Header = () => {
    return (
        <header>
            <div id="logo">BrewHaven</div>
            <nav>
                <NavItem to='./' name='Home' />
                <NavItem to='./' name='Menu' />
                <NavItem to='./' name='Rewards' />
                <NavItem to='./' name='Orders' />
                <NavItem to='./' name='Thing' />
                <NavItem cart={true} />
            </nav>
        </header>
    );
}

export default Header;