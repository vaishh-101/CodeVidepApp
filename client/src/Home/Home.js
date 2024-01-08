import React,{useState,useEffect} from 'react'
import VideoCard from './../VideoCard/VideoCard';
import './Home.css'
import IcoSearch from './ico-search.png'
import {Link} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Offcanvas from 'react-bootstrap/Offcanvas';


function Home() {

  const [videoData, setVideoData] =useState([]);
  const [searchTerm, setSearchTerm] =useState('');
  
  useEffect(() => {

    axios.get('/videos/all').then(res => {
      setVideoData(res.data);
   })
    
  }, [])

  useEffect(() =>{

    axios.post('/videos/search',{
      searchTerm: searchTerm
    }).then(res =>{
      setVideoData(res.data);
    })

  }, [searchTerm])
     
         return (
      
         <div className="container">
          <div className='toggle'>
          <DropdownButton id="dropdown-basic-button" title="Explore More">
      <Dropdown.Item href="./Contact">Contact Us</Dropdown.Item>
      <Dropdown.Item href="./signup">Signup</Dropdown.Item>
      <Dropdown.Item href="./Login">Login</Dropdown.Item>
    </DropdownButton>
    </div>
         <div className="title-container">
    
           <h1 className="text-center">CodeCode </h1>
          </div>
          
          <div>
             <Link to="/signup" className="btn  btn-sm btn-warning">
              <h3> Signup to Add Videos 🎬</h3></Link>


          </div>

          <div className="search-bar">
          <img src={IcoSearch} className="ico-search" alt="search" />
          <input type="text" className="input-search" placeholder="Search" 
          onChange={(e) => setSearchTerm(e.target.value)}
          />
          </div>
          
    
         <div className="row">
           {
             videoData.map(video => {
               return (
                 <div className="col-md-4">
                     <Link to={`/player/${video.videoUrl}`} className="text-decoration-none">
                 <VideoCard
                         key={video.id}
                        title={video.title}
                        description={video.description}
                        channel={video.channel}
                        thumbnail={`https://i.ytimg.com/vi/${video.videoUrl}/hqdefault.jpg`}
                        keywords={video.keywords}
                        videUrl={video.videoUrl}
                        />
                        </Link>
                        </div>
               )
             })
            }
         </div>
         </div>
       );
        }    

export default Home