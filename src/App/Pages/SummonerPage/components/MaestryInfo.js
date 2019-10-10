import React, { Component } from 'react';
import MaestryItem from './MaestryItem'
import Panel from './Panel'
import axios from 'axios'

class MaestryInfo extends Component {
  state = {
    maestryInfo: "",
    maestryDisplay: "",
    tagDisplay: "All"
  }

  tags = [
    "All",
    "Assassin",
    "Fighter",
    "Mage",
    "Marksman",
    "Support",
    "Tank",
  ]

  handleTagClick = tagName => {
    this.setState({
      tagDisplay: tagName
    })
    this.setMestryDisplay(tagName)
  }

  setMestryDisplay = tagname => {
    if (tagname === "All") {
      this.setState({
        maestryDisplay: this.state.maestryInfo.slice(0, 5)
      })
    } else {
      this.setState({
        maestryDisplay: this.state.maestryInfo.filter(item => item.tags[0] === tagname || item.tags[1] === tagname).slice(0, 5)
      })
    }
  }

  changeMaestryInfo = allMaestry => {
    let championsInfo = ""
    axios.get(`https://cors-anywhere.herokuapp.com/http://ddragon.leagueoflegends.com/cdn/${this.props.version}/data/en_US/champion.json`, { headers: { "origin": "x-requested-with" } })
      .then(res => {
        const championsObj = res.data.data
        championsInfo = new Array(Object.keys(championsObj).map(i => championsObj[i]))[0]
        allMaestry.forEach(item => {
          for (let i = 0; i < championsInfo.length; i++) {
            if (`${item.championId}` === championsInfo[i].key) {
              item.championId = championsInfo[i].id
              item.tags = championsInfo[i].tags
              break
            }
          }
        })
        this.setState({
          maestryInfo: allMaestry
        })
        this.setMestryDisplay("All")
      })
  }

  componentDidMount() {
    const { region, accountID } = this.props
    const data = {
      "type": "maestry",
      "region": region,
      "summonerID": accountID
    }
    axios.post('https://cors-anywhere.herokuapp.com/https://leagueoflegendsapp.netlify.com/.netlify/functions/getriotapi', data, { headers: { "origin": "x-requested-with" } })
      .then(res => {
        this.changeMaestryInfo(res.data)
      })
  }

  render() {
    return (
      <div className="maestry-container">{this.state.maestryDisplay ?
        <div className="maestryinfo">
          <div className="select-panel">
            <Panel tags={this.tags} tagDisplay={this.state.tagDisplay} handleTagClick={this.handleTagClick} />
          </div>
          <div className="maestry-items">
            <MaestryItem maestryInfo={this.state.maestryDisplay[0]} version={this.props.version} />
            <MaestryItem maestryInfo={this.state.maestryDisplay[1]} version={this.props.version} />
            <MaestryItem maestryInfo={this.state.maestryDisplay[2]} version={this.props.version} />
            <MaestryItem maestryInfo={this.state.maestryDisplay[3]} version={this.props.version} />
            <MaestryItem maestryInfo={this.state.maestryDisplay[4]} version={this.props.version} />
          </div>
        </div> : null}
      </div>

    );
  }
}

export default MaestryInfo;