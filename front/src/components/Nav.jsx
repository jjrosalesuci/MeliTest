import React from 'react';
import { render } from 'react-dom';

import ProductSearch from './ProductSearch.jsx';

class Nav extends React.Component {
  render() {
    return (
      <div className="nav-bar">
        <div className="row">
          <div className="col-xs-2 col-sm-2  col-md-2  col-lg-2">
          </div>
          <div className="logo-container col-xs-1 col-sm-1  col-md-1  col-lg-1">
            <div className="logo">
              Mercado Libre Uruguay - Donde comprar y vender de todo
                </div>
          </div>
          <div className="col-xs-7 col-sm-7  col-md-7 col-lg-7">
            <div className="content">
              <ProductSearch />
            </div>
          </div>
          <div className="col-xs-2 col-sm-2  col-md-2  col-lg-2">
          </div>
        </div>
      </div>
    );
  }
}

export default Nav;