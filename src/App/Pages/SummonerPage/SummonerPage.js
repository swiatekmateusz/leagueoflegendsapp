import React, { Component } from 'react';
import { } from 'react-router-dom'
import SummonerInfo from './components/SummonerInfo'
import RankInfo from './components/RankInfo'
import MaestryInfo from './components/MaestryInfo'
import axios from 'axios'

class SummonerPage extends Component {
  state = {
    accountInfo: "",
    version: "",
    loaded: false,
  }

  getVersion = () => {
    axios.get('https://cors-anywhere.herokuapp.com/https://ddragon.leagueoflegends.com/api/versions.json', { headers: { "origin": "x-requested-with" } })
      .then(res => {
        this.setState({
          version: res.data[0],
        })
      })
  }

  getAccountInfo = () => {
    const { nickname, region } = this.props.match.params
    document.title = `${nickname.toUpperCase()} | ${region}`;
    const data = {
      "type": "summoner",
      "nickname": nickname,
      "region": region
    }
    axios.post('https://cors-anywhere.herokuapp.com/https://leagueoflegendsapp.netlify.com/.netlify/functions/getriotapi', data, { headers: { "origin": "x-requested-with", "Content-Type": "application/json" } })
      .then(res => {
        this.setState({
          accountInfo: res.data,
          loaded: true,
        })
      })
  }

  componentDidMount() {
    this.getAccountInfo()
    this.getVersion()
  }

  render() {
    return (
      <div className="summonerpage">
        <div className="container-fluid">
          <div className="container">
            <header>
              {this.state.loaded ? <SummonerInfo accountInfo={this.state.accountInfo} /> : null}
            </header>
            <section>
              {this.state.loaded ? <RankInfo accountID={this.state.accountInfo.id} region={this.props.match.params.region} /> : null}
            </section>
            <section>
              {this.state.loaded ? <MaestryInfo accountID={this.state.accountInfo.id} region={this.props.match.params.region} version={this.state.version} /> : null}
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default SummonerPage;