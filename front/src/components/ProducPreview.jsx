import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import { browserHistory } from 'react-router';

class ProducPreview extends React.Component {

  render() {
    const product = this.props;

    return (
      <Link className="link" to={`items/${product.item.id}`}>
        <div key={product.id} className="product-preview row">

          <div className="col-xs-2 col-sm-4  col-md-2  col-lg-2">
            <img className="picture" src={product.item.picture} />
          </div>
          <div className="col-xs-8 col-sm-8  col-md-8  col-lg-8">
            <div className="pt-container">
              <spam className="price">$  {product.item.price.amount} </spam>
              <spam className={` ${product.item.free_shipping? 'shipping' : ''}`}> {product.item.free_shipping} </spam>
            </div>
            <div className="title"> {product.item.title}</div>
          </div>
          <div className="col-xs-2 col-sm-2  col-md-2  col-lg-2">

          </div>

        </div>

      </Link>
    );
  }
}

export default ProducPreview;