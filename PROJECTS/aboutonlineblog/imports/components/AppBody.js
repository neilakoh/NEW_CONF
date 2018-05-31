import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styles from '../styles/top_menu.js';
import AppBody_Sidebar from './AppBody_Sidebar.js';
import { ArticlePostStyle1 } from './BlogPostStyle/index.js';

const AppBody = () => (
  <div className="container" style={{marginTop: 15}}>
    <div className="row">

      <div className="col-lg-8" style={{marginBottom: 10, padding: '0px'}}>
        <ArticlePostStyle1 />
      </div>

      <div className="col-lg-4">
        <AppBody_Sidebar />
      </div>

    </div>
  </div>
);

export default AppBody;
