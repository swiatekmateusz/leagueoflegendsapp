import React from 'react';
import SummonerInfo from './components/SummonerInfo'
import RankInfo from './components/RankInfo'
import MaestryInfo from './components/MaestryInfo'
import { AccountContext } from '../../context/accountContext/AccountContext'
import RankContextProvider from '../../context/rankContext/RankContext'
import MaestryContextProvider from '../../context/maestryContext/MaestryContext'

const SummonerPage = () => {
  return (
    <AccountContext.Consumer>
      {({ loaded }) => (
        <div className="summonerpage">
          <div className="container-fluid">
            <div className="container">
              <header>
                {loaded ? <SummonerInfo /> : null}
              </header>
              <section>
                {loaded ? <RankContextProvider><RankInfo /></RankContextProvider> : null}
              </section>
              <section>
                {loaded ? <MaestryContextProvider><MaestryInfo /></MaestryContextProvider> : null}
              </section>
            </div>
          </div>
        </div>)}
    </AccountContext.Consumer>
  );
}

export default SummonerPage;