import React from 'react';
import {render} from 'react-dom';
import { browserHistory } from 'react-router';

class ProductSearch extends React.Component {
 constructor(props){
   super(props)
   this.handleSubmit = this.handleSubmitSearch.bind(this);
   this.state = {
     query : ""
   }
 }

 handleSubmitSearch(event) {   
    event.preventDefault()
    const query = event.target.elements[0].value   
    const path = `/#/results?search=${query}` 
    this.state = {
      query : ""
    } 
    window.location = path;
 }

 render () {

    return (
       <div className="product-search">
       <form onSubmit={this.handleSubmit}>
           <input  type="text" className="input" placeholder="Nunca dejes de buscar" />
           <button type="submit" className="btn"> <div className="icon-search" ></div></button>
        </form>
       {this.props.children}
      </div>
    );
  }
}



export default ProductSearch;