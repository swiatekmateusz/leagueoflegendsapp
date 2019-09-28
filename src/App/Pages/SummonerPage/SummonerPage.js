import React,{Component} from 'react';
import {  } from 'react-router-dom'
import SummonerInfo from './components/SummonerInfo'
import RankInfo from './components/RankInfo'
import MaestryInfo from './components/MaestryInfo'

class SummonerPage extends Component {
  state = { 
    accountInfo: "",
    version: "",
  }

  getVersion = () => {
    const xhl = new XMLHttpRequest();
    xhl.open("GET", "https://cors-anywhere.herokuapp.com/https://ddragon.leagueoflegends.com/api/versions.json");
    xhl.setRequestHeader("origin", "x-requested-with")
    xhl.send();
    xhl.onload = () =>{
      this.setState({
        version: JSON.parse(xhl.response)[0],
      })
    }
  }

  componentDidMount(){
    const {nickname, region} = this.props.match.params

    document.title = `${nickname.toUpperCase()} | ${region}`;

    const xhl = new XMLHttpRequest();
    xhl.open("POST", "https://cors-anywhere.herokuapp.com/https://leagueoflegendsapp.netlify.com/.netlify/functions/getriotapi");
    xhl.setRequestHeader("Content-Type", "application/json")
    xhl.setRequestHeader("origin", "x-requested-with")
    xhl.send(JSON.stringify({
        "type" : "summoner",
        "nickname":nickname,
        "region":region
    }));
    xhl.onload = () =>{
      this.setState({
        accountInfo: JSON.parse(xhl.response),
      })
    }

    this.getVersion()
  }

  render() {
    return (
    <div className="summonerpage">
      <div className="container-fluid">
        <div className="container">
          <header>
            <SummonerInfo accountInfo={this.state.accountInfo}/>
          </header>
          <section>
            <RankInfo accountID={this.state.accountInfo.id} region={this.props.match.params.region}/>
          </section>
          <section>
            <MaestryInfo accountID={this.state.accountInfo.id} region={this.props.match.params.region} version={this.state.version}/>
          </section>
        </div>
      </div>
    </div>
    );
  }
}

export default SummonerPage;