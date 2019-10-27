import React, { useContext } from 'react';
import { MaestryContext } from '../../../context/maestryContext/MaestryContext'

const Panel = () => {
  const { tags, handleTagClick, tagDisplay } = useContext(MaestryContext)
  const tagsIcons = tags.map(tag => <div onClick={() => handleTagClick(tag)} key={tag} className={`tag${tagDisplay === tag ? " active" : ""}`}>{tag}</div>)
  return (
    <div className="tag-container">
      {tagsIcons}
    </div>
  );
}

export default Panel;