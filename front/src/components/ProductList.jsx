import React from 'react';
import { render } from 'react-dom';
import ProducPreview from './ProducPreview.jsx';
import ProductStore from '../stores/ProductStore.jsx';
import * as productActions from "../actions/producActions.jsx";

class ProductList extends React.Component {

    constructor() {
        super()
        this.state = {
            products: ProductStore.getAll()
        }
    }

    componentWillMount() {
        ProductStore.on("change", () => {
            this.setState({
                products: ProductStore.getAll(),
            });
        })
    }

    render() {
        const { products } = this.state;
        const productsComponents = products.map((product) => {
            return <ProducPreview key={product.item.id} {...product} />;
        });
        return (
            <div className="produc-list">
                <ul>{productsComponents}</ul>
            </div>
        );
    }
}

export default ProductList;