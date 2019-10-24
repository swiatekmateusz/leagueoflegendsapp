import React from 'react';
import SingleRank from './SingleRank';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import MatchesInfo from './MatchesInfo'
import { RankContext } from '../../../context/rankContext/RankContext'

const RankInfo = () => {
  return (
    <RankContext.Consumer>
      {({ data, chartOptions, tft, solo, flex }) => (
        <div className="rankinfo">
          <div className="row">
            <div className="col-lg-8 col-sm-12">
              <div className="ranks row">
                <div className="col-md-4">
                  {data ? <SingleRank rankInfo={solo} /> : null}
                </div>
                <div className="col-md-4">
                  {data ? <SingleRank rankInfo={tft} /> : null}
                </div>
                <div className="col-md-4">
                  {data ? <SingleRank rankInfo={flex} /> : null}
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="wrapper">
                {data ? <div className="hightchart">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                  />
                </div> : null}
                {data ?
                  <div className="winrate">
                    <MatchesInfo solo={solo} tft={tft} flex={flex} />
                  </div>
                  : null}
              </div>
            </div>
          </div>
        </div>)}
    </RankContext.Consumer>
  );
}
export default RankInfo;

Highcharts.theme = {
  colors: ['#fff', '#555'],
  chart: {
    paddingTop: 10,
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