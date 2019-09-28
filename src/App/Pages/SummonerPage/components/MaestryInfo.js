import React, { Component } from 'react';
import MaestryItem from './MaestryItem'
import Panel from './Panel'

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

  handleTagClick = tagName =>{
    this.setState({
      tagDisplay: tagName
    })
    this.setMestryDisplay(tagName)
  }

  setMestryDisplay = () =>{
    if(this.state.tagDisplay === "All"){
      this.setState({
        maestryDisplay: this.state.maestryInfo.slice(0,5)
      })
    }else{
      this.setState({
        maestryDisplay: this.state.maestryInfo.filter(item=>item.tags[0] === this.state.tagDisplay || item.tags[1] === this.state.tagDisplay).slice(0,5)
      })
    }
  }

  changeMaestryInfo = allMaestry => {
    const xhl = new XMLHttpRequest();
    let championsInfo = ""
    xhl.open("GET", `https://cors-anywhere.herokuapp.com/http://ddragon.leagueoflegends.com/cdn/${this.props.version}/data/en_US/champion.json`);
    xhl.setRequestHeader("origin", "x-requested-with");
    xhl.send();
    xhl.onload = () =>{
      const championsObj= JSON.parse(xhl.response)['data']
      championsInfo = new Array(Object.keys(championsObj).map(i=>championsObj[i]))[0]
      allMaestry.forEach(item=>{
        for(let i=0;i<championsInfo.length;i++){
          if(`${item.championId}` === championsInfo[i].key){
            item.championId = championsInfo[i].id
            item.tags = championsInfo[i].tags
            break
          }
        }
      })
      this.setState({
       maestryInfo: allMaestry
      })
      this.setMestryDisplay()
    }
  }

  componentDidUpdate(prevProps,prevState){
    const {region,accountID} = this.props
    if(this.props !== prevProps && accountID){
      const xhl = new XMLHttpRequest();
      xhl.open("POST", "https://cors-anywhere.herokuapp.com/https://leagueoflegendsapp.netlify.com/.netlify/functions/getriotapi");
      xhl.setRequestHeader("Content-Type", "application/json")
      xhl.setRequestHeader("origin", "x-requested-with");
      xhl.send(JSON.stringify({
          "type" : "maestry",
          "region": region,
          "summonerID":accountID
      }));
      xhl.onload = () =>{
        this.changeMaestryInfo(JSON.parse(xhl.response))
      }
    }
    if(this.state.tagDisplay !== prevState.tagDisplay){
      this.setMestryDisplay()
    }
  }

  render() {
    return (
      <div className="maestry-container">{ this.state.maestryDisplay ?
        <div className="maestryinfo">
          <div className="select-panel">
            <Panel tags={this.tags} tagDisplay={this.state.tagDisplay} handleTagClick={this.handleTagClick}/>
          </div>
          <div className="maestry-items">
            <MaestryItem maestryInfo={this.state.maestryDisplay[0]} version={this.props.version}/>
            <MaestryItem maestryInfo={this.state.maestryDisplay[1]} version={this.props.version}/>
            <MaestryItem maestryInfo={this.state.maestryDisplay[2]} version={this.props.version}/>
            <MaestryItem maestryInfo={this.state.maestryDisplay[3]} version={this.props.version}/>
            <MaestryItem maestryInfo={this.state.maestryDisplay[4]} version={this.props.version}/>
          </div>
        </div>: null}
     </div>
      
    ); 
  }
}

export default MaestryInfo;