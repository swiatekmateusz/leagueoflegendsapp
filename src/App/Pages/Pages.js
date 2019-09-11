import React from 'react';
import {Switch,Route} from 'react-router-dom';

import MainPage from './MainPage/MainPage';
import SummonerPage from './SummonerPage/SummonerPage'

const Pages = () => {
  return ( 
    <Switch>
      <Route path="/" exact component={MainPage}/>
      <Route path="/:region/summoner/:nickname" component={ SummonerPage }/>
    </Switch>
   );
}
 
export default Pages;