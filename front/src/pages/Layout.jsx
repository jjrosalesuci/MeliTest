import React from 'react';
import { render } from 'react-dom';
import Nav from '../components/Nav.jsx';

class Layout extends React.Component {
  render() {
    return (
      <div id="layout">

        <Nav />

        {this.props.children}

      </div>
    );
  }
}

export default Layout;