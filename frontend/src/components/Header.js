import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

import logo from '../assets/logo.svg';
import camera from '../assets/camera.svg';

export default function Header() {
  return (
    <header id="main-header">
      <div className="header-content">
        {/*
          O componente 'Link' é como se fosse a tag <a></a> do HTML.
          O parâmtro 'to' informa aonde o usuário vai ser levado.
        */}
        <Link to='/'>
          <img src={logo} alt="InstaClone"/>
        </Link>
        <Link to='/new'>
          <img src={camera} alt="New" />
        </Link>
      </div>
    </header>
  );
}