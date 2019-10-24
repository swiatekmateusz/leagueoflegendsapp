import React from 'react';
import banner from '../../../../sass/additions/img/banner.png'
import { AccountContext } from '../../../context/accountContext/AccountContext'

const SummonerInfo = () => {
  return (
    <AccountContext.Consumer>
      {({ accountInfo }) => (
        <div className="summonerInfo">
          <div className="banner">
            <img src={banner} alt="banner" />
            <section>
              {accountInfo.profileIconId ? <img src={`http://ddragon.leagueoflegends.com/cdn/9.17.1/img/profileicon/${accountInfo.profileIconId}.png`} alt="icon" className="icon" /> : null}
              <div className="nickname">{accountInfo.name ? <h1>{accountInfo.name}</h1> : 'Not found...'}</div>
              <div className="level">{accountInfo.summonerLevel ? <h2>{`Level ${accountInfo.summonerLevel}`}</h2> : '0'}</div>
            </section>
          </div>
        </div>)}
    </AccountContext.Consumer>
  )
}

export default SummonerInfo;