import { EventEmitter } from 'events';
import dispatcher from "../dispatcher.jsx";

class ProductStore extends EventEmitter {
    constructor() {
        super()
        this.products = [];
        this.selectedProduct = {};
        this.category = {};
    }

    getAll() {
        return this.products;
    }

    reloadList(productList) {
        this.products = productList;
        this.emit("change");
    }

    getSelProduct() {
        return this.selectedProduct;
    }

    setSelProduct(product) {
        this.selectedProduct = product;
        this.emit("SelectionChange");
    }

    getCurrentCategory() {
        return this.category;
    }

    handleActions(action) {
        switch (action.type) {
            case "UPDATE_LIST":
                console.info(action);
                this.products = action.list;
                console.log("Update List");
                this.emit("change");
                break;

            case "UPDATED_SEL":
                console.info(action);
                this.selectedProduct = action.product;
                console.log("Update Selection");
                this.emit("SelectionChange");
                break;

            case "UPDATE_CATEGORY":
                this.category = action.category;
                console.log("Update category");
                this.emit("categoryChange");
                break;

            default:
                break;
        }
    }
}

const productStore = new ProductStore;

dispatcher.register(productStore.handleActions.bind(productStore));
//window.dispatcher = dispatcher;
//dispatcher.dispatch({"type":"test"})
export default productStore;