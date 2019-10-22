import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MainPage from './MainPage/MainPage';
import SummonerPage from './SummonerPage/SummonerPage'
import AccountContextProvider from '../context/AccountContext'

const Pages = () => {
  return (
    <Switch>
      <Route path="/" exact component={MainPage} />
      <Route path="/:region/summoner/:nickname" render={props => (
        <AccountContextProvider params={{
          nickname: props.match.params.nickname,
          region: props.match.params.region
        }}>
          <SummonerPage />
        </AccountContextProvider>
      )
      }>
      </Route>
    </Switch>
  );
}

export default Pages;