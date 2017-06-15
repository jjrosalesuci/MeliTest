import React from 'react';
import { render } from 'react-dom';

import * as productActions from "../actions/producActions.jsx";
import ProductStore from '../stores/ProductStore.jsx';

class Breadcrumb extends React.Component {

  constructor() {
    super();
    this.state = {
      category: {
        path_from_root: {}
      }
    }
  }

  componentWillMount() {
    ProductStore.on("categoryChange", () => {
      this.setState({
        category: ProductStore.getCurrentCategory(),
      });
    })
  }

  render() {

    var text = "";
    for (var i = 0; i < this.state.category.path_from_root.length; i++) {
      if (i + 1 < this.state.category.path_from_root.length) {
        text = text + this.state.category.path_from_root[i].name + '  >   ';
      } else {
        text = text + this.state.category.path_from_root[i].name;
      }
    }

    return (

      <div className="row breadcrumb">

        <div className="breadcrumb">
          <label>{text}</label>
        </div>
      </div>

    )
  }
}

export default Breadcrumb;