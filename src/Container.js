import React, { useState } from 'react';

const Container = (props) => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    const toggleContent = () => {
      setIsExpanded(prevState => !prevState);
    };
    
    return (
      
      <div className="activity-container" onClick={toggleContent} style={{ cursor: 'pointer' }}>
        <img 
          src={props.aurl}
          alt={`활동이미지 ${props.date}`} 
        />
        <div className="title">
          {`${props.date} ${props.name}`}
        </div>
        {isExpanded && props.additionalContent && (
          props.additionalContent.type === 'image' ? (
            <img 
              src={props.additionalContent.url} 
              alt={`추가 이미지 ${props.date}`} 
              style={{ width: '60%', height: 'auto', marginLeft: '10px' }} 
            />
          ) : props.additionalContent.type === 'video' ? (
            <video controls style={{ width: '60%', height: 'auto', marginLeft: '10px' }}>
              <source src={props.additionalContent.url} type="video/mp4" />
            </video>
          ) : null
        )}
      </div>
    );
  };

  export default Container