import React from 'react';
import { render } from 'react-dom';
import Breadcrumb from '../components/Breadcrumb.jsx';
import ProductList from '../components/ProductList.jsx';
import ProductStore from '../stores/ProductStore.jsx';
import * as productActions from "../actions/producActions.jsx";


class SearchResults extends React.Component {
  render() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const query = params.get('search');
    productActions.reloadList(query);

    return (
      <div>
        <div className="row">
          <div className="col-xs-2 col-sm-2  col-md-2  col-lg-2">
          </div>
          <div className="breadcrumb col-xs-8 col-sm-8  col-md-8  col-lg-8">
            <Breadcrumb />
          </div>
          <div className="col-xs-2 col-sm-2  col-md-2  col-lg-2">
          </div>
        </div>
        <div className="row">
          <div className="col-xs-2 col-sm-2  col-md-2  col-lg-2">
          </div>
          <div className="search-results col-xs-8 col-sm-8  col-md-8  col-lg-8">
            <ProductList />
          </div>
          <div className="col-xs-2 col-sm-2  col-md-2  col-lg-2">
          </div>
        </div>
      </div>
    );
  }
}

export default SearchResults;