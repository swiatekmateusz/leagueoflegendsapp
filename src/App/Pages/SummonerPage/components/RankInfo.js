import React, { Component } from 'react';
import SingleRank from './SingleRank';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import MatchesInfo from './MatchesInfo'

class RankInfo extends Component {
    state = {
      data: false,
      solo:{
        queueType: 'Ranked Solo 5vs5',
        tier: "",
        rank: "",
        points: "",
        miniSeries: "",
        wins: "",
        losses: "",
      },
      tft:{
        queueType: 'Ranked TFT',
        tier: "",
        rank: "",
        points: "",
        miniSeries: "",
        wins: "",
        losses: "",
      },
      flex:{
        queueType: 'Ranked Flex 5vs5',
        tier: "",
        rank: "",
        points: "",
        miniSeries: "",
        wins: "",
        losses: "",
      },
      chartOptions: {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Stats'
        },
        xAxis: {
            categories: ['SOLO', 'TFT', 'FLEX']
        },
        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'matches'
            }
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>'
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                borderColor: 'none'
            }
        },
        series: [
          {
            name: 'Wins',
            data: [0,0,0],
            stack: 'Wins'
          },{
          name: 'Losses',
          data: [0,0,0],
          stack: 'Losses'
          }]
        }
    }

    updateSeries = () => {
      this.setState({
        chartOptions: {
          series: [{
            data:[this.state.solo.wins,this.state.tft.wins,this.state.flex.wins]
          },{
            data:[this.state.solo.lossess,this.state.tft.lossess,this.state.flex.lossess]
          }]
        }
      });
    }

    setRanks = data =>{
      data.forEach(item=>{
        if(item.queueType === "RANKED_SOLO_5x5"){
          this.setState({
            solo:{
              queueType: 'Ranked Solo 5vs5',
              tier: item.tier,
              rank: item.rank,
              points: item.leaguePoints,
              miniSeries: item.miniSeries,
              wins: item.wins,
              lossess: item.losses
            },
          })
        }else if(item.queueType ==="RANKED_TFT"){
          this.setState({
            tft:{
              queueType: 'Ranked TFT',
              tier: item.tier,
              rank: item.rank,
              points: item.leaguePoints,
              miniSeries: item.miniSeries,
              wins: item.wins,
              lossess: item.losses
            },
          })
        }else if(item.queueType === "RANKED_FLEX_SR"){
          this.setState({
            flex:{
              queueType: 'Ranked Flex 5vs5',
              tier: item.tier,
              rank: item.rank,
              points: item.leaguePoints,
              miniSeries: item.miniSeries,
              wins: item.wins,
              lossess: item.losses
            },
          })
        }
      })
      this.setState({
        data: true,
      })
      this.updateSeries()
    }

    componentDidUpdate(prevProps){
      const {region,accountID} = this.props
      if(this.props !== prevProps && accountID){
        const xhl = new XMLHttpRequest();
        xhl.open("POST", "https://cors-anywhere.herokuapp.com/https://leagueoflegendsapp.netlify.com/.netlify/functions/getriotapi");
        xhl.setRequestHeader("Content-Type", "application/json")
        xhl.setRequestHeader("origin", "x-requested-with")
        xhl.send(JSON.stringify({
            "type" : "rank",
            "region": region,
            "summonerID":accountID
        }));
        xhl.onload = () =>{
          this.setRanks(JSON.parse(xhl.response))
        }
      }
    }

  render() {
    const {solo,tft,flex} = this.state
    return (
      <div className="rankinfo">
        <div className="row">
          <div className="col-lg-8 col-sm-12">
            <div className="ranks row">
              <div className="col-md-4">
                {this.state.data ? <SingleRank rankInfo={solo}/> : null}
              </div>
              <div className="col-md-4">
                {this.state.data ? <SingleRank rankInfo={tft}/> : null}
              </div>
              <div className="col-md-4">
                {this.state.data ? <SingleRank rankInfo={flex}/> : null}
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="wrapper">
            { this.state.data ? <div className="hightchart">
              <HighchartsReact
                highcharts={Highcharts}
                options={this.state.chartOptions}
              />
              </div> : null }
              { this.state.data ?
              <div className="winrate">
                <MatchesInfo solo={solo} tft={tft} flex={flex}/>
                </div>
              : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default RankInfo;

Highcharts.theme = {
  colors: ['#fff', '#555'],
  chart: {
      paddingTop:10,
      height: 250,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      style: {
          fontFamily: '\'Unica One\', sans-serif'
      },
      plotBorderColor: '#606063'
  },
  title: {
      style: {
          color: '#E0E0E3',
          textTransform: 'uppercase',
          fontSize: '20px'
      }
  },
  subtitle: {
      style: {
          color: '#E0E0E3',
          textTransform: 'uppercase'
      }
  },
  xAxis: {
      gridLineColor: '#707073',
      labels: {
          style: {
              color: '#E0E0E3'
          }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      title: {
          style: {
              color: '#A0A0A3'

          }
      }
  },
  yAxis: {
      gridLineColor: '#707073',
      labels: {
          style: {
              color: '#E0E0E3'
          }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      tickWidth: 1,
      title: {
          style: {
              color: '#A0A0A3'
          }
      }
  },
  tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      style: {
          color: '#F0F0F0'
      }
  },
  legend: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      itemStyle: {
          color: '#E0E0E3'
      },
      itemHoverStyle: {
          color: '#fff'
      },
      itemHiddenStyle: {
          color: '#606063'
      },
      title: {
          style: {
              color: '#C0C0C0'
          }
      }
  }
};
Highcharts.setOptions(Highcharts.theme);