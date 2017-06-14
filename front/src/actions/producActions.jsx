import dispatcher from "../dispatcher.jsx";
import axios from 'axios';

export function reloadList(query) {
  console.log('quey on action', query);
  axios.get(`http://localhost:30000/api/search/${query}`)
    .then(res => {
      dispatcher.dispatch({
        type: "UPDATE_LIST",
        list: res.data.data
      });
      dispatcher.dispatch({
        type: "UPDATE_CATEGORY",
        category: res.data.category
      });
    });
}

export function loadProductDetails(id) {
  axios.get(`http://localhost:30000/api/item/${id}`)
    .then(res => {
      dispatcher.dispatch({
        type: "UPDATED_SEL",
        product: res.data.item
      });

      dispatcher.dispatch({
        type: "UPDATE_CATEGORY",
        category: res.data.item.category
      });
    });
}

/// const posts = res.data.data.children.map(obj => obj.data);
// this.setState({ posts });  