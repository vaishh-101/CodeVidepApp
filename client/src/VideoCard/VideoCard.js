import React from 'react'
import './VideoCard.css'

function VideoCard(props) { 

    const keywordsMap = {
        'JavaScript': 'bg-warning text-dark',
        'React':  'bg-info text-dark',
        'Node.js': 'bg-primary',
        'C': 'bg-primary text-white',
        'C++': 'bg-primary text-white',
        'cybersecurity': 'bg-warning text-dark',
        'Python': 'bg-warning text-dark',
        'networking': 'bg-primary text-dark',
        'MongoDB': 'bg-primary text-white',
        'Java': 'bg-success text-white',
        'PHP': 'bg-secondary text-white',
        'Postman': 'bg-secondary text-white',
        'GitHub': 'bg-dark text-white',
        'Express': 'bg-dark text-white',
        'Angular':  'bg-info text-dark',
        'dotnet':  'bg-info text-dark',
    }
    return (
        <div className="video-card-container">
        <img src={props.thumbnail} 
           
         className="video-card-thumbnail"/>

         <h6 className="video-card-title mt-2">{props.title}</h6>
          <p className="video-card-description">{props.description}</p>
          <p>
              {props.keywords.map(keyword =>{
              return <span className={`badge rounded-pill ${keywordsMap[keyword]} me-2`}>{keyword}</span>
              })
          }
          </p>
                    
        </div>
    )
}

export default VideoCard