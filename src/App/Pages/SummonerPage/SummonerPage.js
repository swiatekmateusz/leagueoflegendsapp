import React, { useContext } from 'react';
import SummonerInfo from './components/SummonerInfo'
import RankInfo from './components/RankInfo'
import MaestryInfo from './components/MaestryInfo'
import { AccountContext } from '../../context/AccountContext'

const SummonerPage = () => {
  const { accountInfo, version, loaded, params } = useContext(AccountContext)
  return (
    <div className="summonerpage">
      <div className="container-fluid">
        <div className="container">
          <header>
            {loaded ? <SummonerInfo /> : null}
          </header>
          <section>
            {loaded ? <RankInfo accountID={accountInfo.id} region={params.region} /> : null}
          </section>
          <section>
            {loaded ? <MaestryInfo accountID={accountInfo.id} region={params.region} version={version} /> : null}
          </section>
        </div>
      </div>
    </div>
  );
}

export default SummonerPage;