import React from 'react';

const MaestryItem = props => {
  const {maestryInfo} = props
  return ( 
    <div className="item">
      <h4>{maestryInfo.championId}</h4>
      <div className="img">
        <img src={require(`./Maestry/Square_Level_${maestryInfo.championLevel}.png`)}  alt={maestryInfo.championId}/>
      </div>
      <div className="square" style={{backgroundImage:`url(http://ddragon.leagueoflegends.com/cdn/${props.version}/img/champion/${maestryInfo.championId}.png)`}}></div>
      <div className="points">{numberWithCommas(maestryInfo.championPoints)} points</div>
    </div>
  );
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default MaestryItem;