import React from 'react'
import { HashRouter as Router, Route, browserHistory, hashHistory, IndexRoute  } from 'react-router-dom'; 
import ReactDOM from 'react-dom';

import Layout from './pages/Layout.jsx';
import SearchResults from './pages/SearchResults.jsx';
import ProductDetails from './pages/ProductDetails.jsx';

const app = document.getElementById('app');

ReactDOM.render(
   /* <Router history={browserHistory}>
        <Route exact path="/" component = {Layout}>
             <Route path="/results" component = {SearchResults}></Route> 
        </Route> 
    </Router> */
   <Router history={hashHistory}>
    <div>
        <Route path="/" component={Layout}/>
        <Route path="/results"    name="results" component={SearchResults}/>
        <Route path="/items/:id"  name="items"  component={ProductDetails}/>

    </div>
   </Router>



,app);