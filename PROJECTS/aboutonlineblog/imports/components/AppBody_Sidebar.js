import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styles from '../styles/top_menu.js';

const AppBody_Sidebar = () => (
  <div>

    <div className="card" style={{borderRadius: '0px', width: '100%'}}>
      <div className="card-header">
        Search:
      </div>
      <div style={{
        padding: 10,
      }}>
        <div style={{
          width: '100%',
          height: '40px',
          display: '-webkit-box',
          display: '-moz-box',
          display: '-ms-flexbox',
          display: '-webkit-flex',
          display: 'flex',
          borderRadius: 5,
          flexDirection: 'row',
          flexWrap: 'wrap',
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,.125)',
          borderStyle: 'solid',
          borderRadius: 0
        }}>
          <div style={{
            width: '15%',
            display: '-webkit-box',
            display: '-moz-box',
            display: '-ms-flexbox',
            display: '-webkit-flex',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}><i className="fas fa-search" style={{color: '#6c757d'}}></i></div>
          <div style={{display: 'flex', flex: 1}}>
            <input type="text" className="form-control" style={{
              borderWidth: 0,
              borderColor: 'transparent',
              borderStyle: 'none',
              outline: 'none',
              boxShadow: 'none',
            }}/>
          </div>
        </div>
      </div>
    </div>

    <div className="card" style={{marginTop: 10, borderRadius: '0px'}}>
      <div className="card-header">
        Share this to:
      </div>
      <div style={{
        padding: 10,
      }}>

      </div>
    </div>

    <div className="card" style={{marginTop: 10, borderRadius: '0px'}}>
      <div className="card-header">
        Categories:
      </div>
      <div style={{
        padding: 10,
      }}>

      </div>
    </div>

    <div className="card" style={{marginTop: 10, borderRadius: '0px'}}>
      <div className="card-header">
        Search:
      </div>
      <div style={{
        padding: 10,
      }}>

      </div>
    </div>

  </div>
);

export default AppBody_Sidebar;
