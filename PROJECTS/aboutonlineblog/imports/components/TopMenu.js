import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styles from '../styles/top_menu.js';

const TopMenu = () => (
  <div style={{
    backgroundColor: '#000000',
    width: '100%',
    height: 'auto'
  }} id="main-header-wrapper">

    <div style={{
      backgroundColor: 'transparent',
      width: '100%',
      height: 'auto',
      display: '-webkit-box',
      display: '-moz-box',
      display: '-ms-flexbox',
      display: '-webkit-flex',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
      marginBottom: 15
    }} id='mid-navbar'>
      <img src={'/images/about_online_logo.png'} width="250" height="120" alt="" />
    </div>

    <div style={{
      backgroundColor: 'transparent',
      width: '100%',
      borderTopColor: '#545454',
      borderTopWidth: 1,
      borderTopStyle: 'inset',
    }} id='bottom-navbar'>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Articles</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Videos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Web Apps</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Codes</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Widgets</a>
            </li>
          </ul>
        </div>
      </nav>

    </div>
  </div>
);

export default TopMenu;
