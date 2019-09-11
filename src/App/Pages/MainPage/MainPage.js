import React,{Component} from 'react';
import { Link} from 'react-router-dom'

class MainPage extends Component {
  state = {
    region: 'EUN1',
    nickname: '',
  }

  regions = [
    {name: 'EUNE', value: 'EUN1'},
    {name: 'EUW', value: 'EUW1'},
  ]

  handleInputs = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {
    const {nickname,region} = this.state
    return (
      <>
        <div className="mainpage">
          <div className="bg-image">
            <div className="content-warpper">
              <header>
                <h1>LOL.react</h1>
                <h2>Type your summoner name</h2>
              </header>
              <div className="search-form">
                <input type="text" name="nickname" onChange={this.handleInputs} value={nickname}/>
                <select onChange={this.handleInputs} name="region">
                  {this.regions.map(item=><option key={item.value} value={item.value}>{item.name}</option>)}
                </select>
                <Link to={nickname ? `/${region}/summoner/${nickname}` : ""} className="button"></Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MainPage;