import React from 'react';

const MatchesInfo = props => {
  const {solo,tft,flex} = props
  const soloMatches = solo.wins+solo.lossess
  const tftMatches = tft.wins+tft.lossess
  const flexMatches = flex.wins+flex.lossess
  const soloWinRate = Math.round(solo.wins/(solo.wins+solo.lossess)*100)
  const tftWinRate = Math.round(tft.wins/(tft.wins+tft.lossess)*100)
  const flexWinRate = Math.round(flex.wins/(flex.wins+flex.lossess)*100)

  return ( 
    <div className="matchesinfo">
      <div className="item">
        <h4>Solo</h4><p>
        <span>{`${isNaN(soloWinRate)?0:soloWinRate}%`}</span> won in
        <br/>
        {`${soloMatches === 'undefined'?'0': soloMatches} matches`}</p>
      </div>
      <div className="item">
        <h4>TFT</h4><p>
        <span>{`${isNaN(tftWinRate)?0:tftWinRate}%`}</span> won in
        <br/>
        {`${tftMatches === 'undefined'?  '0': tftMatches} matches`}</p>
      </div>
      <div className="item">
        <h4>Flex</h4><p>
        <span>{`${isNaN(flexWinRate)?0:flexWinRate}%`}</span> won in
        <br/>
        {`${flexMatches === 'undefined' ? '0' : flexMatches} matches`}</p>
      </div>
    </div>
   );
}
 
export default MatchesInfo