import React from 'react';
import { render } from 'react-dom';
import Breadcrumb from '../components/Breadcrumb.jsx';
import * as productActions from "../actions/producActions.jsx";
import ProductStore from '../stores/ProductStore.jsx';

class ProductDetails extends React.Component {

  constructor() {
    super();
    this.state = {
      product: { price: {} }
    }
  }

  componentWillMount() {

    const { id } = this.props.match.params;
    productActions.loadProductDetails(id);

    ProductStore.on("SelectionChange", () => {
      this.setState({
        product: ProductStore.getSelProduct(),
      });
    })
  }

  render() {

    const { id } = this.props.match.params;
    const product = this.state.product;

    var el = null;
    switch(product.id) {
      case undefined:
        el = (
          <div>
            <div className="row">
              <div className="col-xs-2 col-sm-2  col-md-2  col-lg-2">
              </div>
              <div className="breadcrumb col-xs-8 col-sm-8  col-md-8  col-lg-8">
                 <label className="loading">Cargando...</label>
              </div>
              <div className="col-xs-2 col-sm-2  col-md-2  col-lg-2">
              </div>
            </div>
            </div>
        );
        break; 

      default:

        el = (
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
          <div className="product-details col-xs-8 col-sm-8  col-md-8  col-lg-8">

            <div className="product-info">
              <div className="row">
                <div className="image-col  col-xs-8 col-sm-8  col-md-8 col-lg-8">
                  <img className="picture" src={product.picture} />
                </div>
                <div className="info-col col-xs-4 col-sm-4  col-md-4  col-lg-4">
                  <div className="status-quantity"> {product.condition} - {product.sold_quantity} Vendidos</div>
                  <div className="title"> {product.title} </div>
                  <div className="price"> $ {product.price.amount} </div>
                  <button className="btn" type="button">Comprar</button>
                </div>
              </div>
              <div className="row description-section">
                <div className="title"> Descripcion del producto </div>
                <div className="text"> {product.description} </div>
              </div>
            </div>

          </div>
          <div className="col-xs-2 col-sm-2  col-md-2  col-lg-2">
          </div>
          {this.props.children}
        </div>
      </div>

        );

      break;

    }
    return el;
  }
}

export default ProductDetails;