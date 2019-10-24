export const rankReducer = (state, action) => {
  switch (action.type) {
    case 'SET_RANK_SOLO':
      return { ...state, solo: action.data }
    case 'SET_RANK_TFT':
      return { ...state, tft: action.data }
    case 'SET_RANK_FLEX':
      return { ...state, flex: action.data }
    case 'SET_DATA':
      return { ...state, data: action.data }
    case 'SET_SERIES':
      return {
        ...state, chartOptions: {
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
              data: action.data.wins,
              stack: 'Wins'
            }, {
              name: 'Losses',
              data: action.data.lossess,
              stack: 'Losses'
            }]
        }
      }
    default:
      return { ...state }
  }
}
