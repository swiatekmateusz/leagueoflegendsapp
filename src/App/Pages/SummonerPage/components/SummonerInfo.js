import React, { Component } from 'react';
import banner from '../../../../sass/additions/img/banner.png'

class SummonerInfo extends Component {
  state={
    iconID: "",
    nickname: "",
    level: "",
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        iconID: this.props.accountInfo.profileIconId,
        nickname: this.props.accountInfo.name,
        level: this.props.accountInfo.summonerLevel,
      })
    }
  }

  render() {
    const {iconID,nickname,level} = this.state
    console.log('render');
    return (
      <div className="summonerInfo">
        <div className="banner">
          <img src={banner} alt="banner"/>
          <section>
            {iconID ? <img src={`http://ddragon.leagueoflegends.com/cdn/9.17.1/img/profileicon/${iconID}.png`} alt="icon" className="icon"/> : null}
            <div className="nickname">{nickname ? <h1>{nickname}</h1>: <span className="loader">&nbsp;</span>}</div>
            <div className="level">{level ? <h2>{`Level ${level}`}</h2> : <span className="loader">&nbsp;</span> }</div>
          </section>
        </div>
      </div>
     );
  }
}
 
export default SummonerInfo;