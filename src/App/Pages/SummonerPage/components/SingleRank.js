import React from 'react';

const SingleRank = props => {
  const { rankInfo } = props
  return (
    <div className="rankItem">
      <h2>{rankInfo.queueType}</h2>
      <img src={require(`./Ranks/Emblem_${rankInfo.tier ? rankInfo.tier : "unranked"}.png`)} alt="rank" />
      <div className="stats">
        {rankInfo.tier ? <span className="tier"> {rankInfo.tier}</span> : <span className="unranked"> Unranked</span>}
        {rankInfo.rank ? <span className="rank">{rankInfo.rank}</span> : null}
        {rankInfo.points !== undefined && rankInfo.points !== "" ? <div className="points">{rankInfo.points === 100 ? `100LP  W:${rankInfo.miniSeries.wins}  L:${rankInfo.miniSeries.losses}` : `${rankInfo.points} LP`}</div> : <div className="points">-</div>}
      </div>
    </div>
  )
}

export default SingleRank;