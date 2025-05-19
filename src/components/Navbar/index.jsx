import React from 'react';
import './Navbar.css'
import logo from '../../assets/Logo.png'

const Navbar = () => {
    return(
        <>
            <nav className='navBar'>
                <img className='logo' src={logo} alt="logoFogaba" />
                <h1 className='titulo'>Formulario de Contragarantias Ofrecidas (GOG)</h1>
                <span className='version'>Version 1.1</span>
            </nav>
        </>
        
    )
}

export{Navbar}