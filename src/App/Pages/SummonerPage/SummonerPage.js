import React,{Component} from 'react';
import {  } from 'react-router-dom'
import SummonerInfo from './components/SummonerInfo'

class SummonerPage extends Component {
  state = { 
    accountInfo: "",
  }

  componentDidMount(){
    const {nickname, region} = this.props.match.params
    const xhl = new XMLHttpRequest();
    xhl.open("POST", "https://bypasscors.herokuapp.com/api/?url=https://leagueoflegendsapp.netlify.com/.netlify/functions/getriotapi");
    xhl.setRequestHeader("Content-Type", "application/json")
    xhl.send(JSON.stringify({
      "data": {
        "type" : "summoner",
        "nickname":nickname,
        "region":region
      },
      "headers" : {
        "Content-Type": "application/json"
      }
    }));
    xhl.onload = () =>{
      this.setState({
        accountInfo: JSON.parse(xhl.response)
      })
    }
  }

  render() {
    return (
    <div className="summonerpage">
      <div className="container-fluid">
        <div className="container">
          <header>
            <SummonerInfo accountInfo={this.state.accountInfo}/>
          </header>
        </div>
      </div>
    </div>
    );
  }
}

export default SummonerPage;