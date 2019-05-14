import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'bootstrap';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();
function active(){
    var searchBar= document.getElementById("searchBar");

    if(searchBar.value == 'search something here'){
        searchBar.value = '';
        searchBar.placeholder = "search something here";
    }
}

function inactive(){
    var searchBar= document.getElementById("searchBar");

    if(searchBar.value == ''){
        searchBar.value = 'search something here';
        searchBar.placeholder = '';
    }
}