import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ArticlePostStyle1= () => (
  <ul className="list-group list-group-flush">
    <li className="list-group-item" style={{
      display: '-webkit-box',
      display: '-moz-box',
      display: '-ms-flexbox',
      display: '-webkit-flex',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: 'rgba(0,0,0,.1)',
      padding: '0.3em'
    }}>

      <div style={{
        width: '15%',
        height: 'auto',
      }}>
        <img src="http://7428.net/wp-content/uploads/2013/03/Square-Background.jpg" alt="Cinque Terre" style={{
          display: 'block',
          maxWidth: '100%',
          height: 'auto'
        }}/>
      </div>

      <div style={{
        display: '-webkit-box',
        display: '-moz-box',
        display: '-ms-flexbox',
        display: '-webkit-flex',
        display: 'flex',
        flex: 1,
        height: 'auto',
        flexDirection: 'column',
        flexWrap: 'wrap',
      }}>

        <div style={{
          width: '100%',
          display: '-webkit-box',
          display: '-moz-box',
          display: '-ms-flexbox',
          display: '-webkit-flex',
          display: 'flex',
          flex: 1,
        }}>
          <div style={{
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 10,
            fontWeight: 'bold',
            fontSize: 18,
            textAlign: 'justify'
          }}>Amazing ways to stay fit and have six pack abs in just a few days. Amazing ways to stay fit and have six pack abs in just a few days.</div>
        </div>

        <div style={{
          height: 30,
          width: '100%',
          backgroundColor: 'transparent',
          display: '-webkit-box',
          display: '-moz-box',
          display: '-ms-flexbox',
          display: '-webkit-flex',
          display: 'flex',
          flex: 1,
          height: 'auto',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
          <div style={{
            display: '-webkit-box',
            display: '-moz-box',
            display: '-ms-flexbox',
            display: '-webkit-flex',
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            flexWrap: 'wrap',
            height: '100%',
            paddingLeft: 10,
            paddingRight: 10,
          }}>
            <div style={{
              display: '-webkit-box',
              display: '-moz-box',
              display: '-ms-flexbox',
              display: '-webkit-flex',
              display: 'flex',
              flex: 1,
              width: '100%',
              justifyContent: 'flex-start',
              alignItems: 'flex-end',
              fontSize: 12
            }}>test</div>
            <div style={{
              display: '-webkit-box',
              display: '-moz-box',
              display: '-ms-flexbox',
              display: '-webkit-flex',
              display: 'flex',
              flex: 1,
              width: '100%',
              justifyContent: 'flex-start',
              alignItems: 'flex-end',
              fontSize: 12
            }}>test</div>
          </div>
          <div style={{
            width: '15%',
            display: '-webkit-box',
            display: '-moz-box',
            display: '-ms-flexbox',
            display: '-webkit-flex',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}>
            <div style={{
              backgroundColor: '#0082b2',
              color: '#ffffff',
              fontWeight: 'bold',
              padding: 5,
              fontSize: 14
            }}>Read This</div>
          </div>
        </div>

      </div>

    </li>
  </ul>
);

export default ArticlePostStyle1;
