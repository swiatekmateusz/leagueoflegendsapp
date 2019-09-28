import React from 'react';

const Panel = props => {
  const tags = props.tags.map(tag=><div onClick={()=>props.handleTagClick(tag)} key={tag} className={`tag${props.tagDisplay === tag ? " active" : ""}`}>{tag}</div> )
  return ( 
    <div className="tag-container">
      {tags}
    </div>
   );
}
 
export default Panel;