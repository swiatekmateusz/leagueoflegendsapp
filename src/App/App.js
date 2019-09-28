import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';

import Pages from './Pages/Pages.js'

import '../sass/style.scss';

class App extends Component {
  render() { 
    return ( 
      <BrowserRouter basename={process.env.PUBLIC_URL + '/'}>
        {<Pages/>}
      </BrowserRouter>
     );
  }
}
 
export default App;

