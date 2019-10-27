import React from 'react';
import MaestryItem from './MaestryItem'
import Panel from './Panel'
import { MaestryContext } from '../../../context/maestryContext/MaestryContext'

const MaestryInfo = () => {
  return (
    <MaestryContext.Consumer>
      {({ maestryDisplay, version }) => (
        <div className="maestry-container">{maestryDisplay ?
          <div className="maestryinfo">
            <div className="select-panel">
              <Panel />
            </div>
            <div className="maestry-items">
              <MaestryItem maestryInfo={maestryDisplay[0]} version={version} />
              <MaestryItem maestryInfo={maestryDisplay[1]} version={version} />
              <MaestryItem maestryInfo={maestryDisplay[2]} version={version} />
              <MaestryItem maestryInfo={maestryDisplay[3]} version={version} />
              <MaestryItem maestryInfo={maestryDisplay[4]} version={version} />
            </div>
          </div> : null}
        </div>)}
    </MaestryContext.Consumer>
  );
}

export default MaestryInfo;