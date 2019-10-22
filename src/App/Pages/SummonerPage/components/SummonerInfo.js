import React, { useContext } from 'react';
import banner from '../../../../sass/additions/img/banner.png'
import { AccountContext } from '../../../context/AccountContext'

const SummonerInfo = () => {
  const { profileIconId, name, summonerLevel } = useContext(AccountContext).accountInfo

  return (
    <div className="summonerInfo">
      <div className="banner">
        <img src={banner} alt="banner" />
        <section>
          {profileIconId ? <img src={`http://ddragon.leagueoflegends.com/cdn/9.17.1/img/profileicon/${profileIconId}.png`} alt="icon" className="icon" /> : null}
          <div className="nickname">{name ? <h1>{name}</h1> : 'Not found...'}</div>
          <div className="level">{summonerLevel ? <h2>{`Level ${summonerLevel}`}</h2> : '0'}</div>
        </section>
      </div>
    </div>
  )
}

export default SummonerInfo;