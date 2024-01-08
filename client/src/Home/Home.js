import React, { useState, useEffect } from 'react';
import VideoCard from './../VideoCard/VideoCard';
import './Home.css';
import IcoSearch from './ico-search.png';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Pagination from 'react-bootstrap/Pagination';

function Home() {
  const [videoData, setVideoData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 9;

  useEffect(() => {
    axios.get('/videos/all').then(res => {
      setVideoData(res.data);
    });
  }, []);

  useEffect(() => {
    axios.post('/videos/search', {
      searchTerm: searchTerm,
    }).then(res => {
      setVideoData(res.data);
      setCurrentPage(1); 
    });
  }, [searchTerm]);

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videoData.slice(indexOfFirstVideo, indexOfLastVideo);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div style={{paddingTop: "9px"}}>
          <Link to="/signup" className="btn btn-sm btn-warning">
            <h3> Signup to Add Videos 🎬</h3>
          </Link>
        </div>

        <div className="toggle" >
          <DropdownButton id="dropdown-basic-button" title="Explore More" style={{paddingLeft: "700px"}}>
            <Dropdown.Item href="./Contact">Contact Us</Dropdown.Item>
            <Dropdown.Item href="./signup">Signup</Dropdown.Item>
            <Dropdown.Item href="./Login">Login</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>

      <div className="title-container mb-3">
        <h1>CodeCode</h1>
      </div>

      <div className="search-bar">
        <img src={IcoSearch} className="ico-search" alt="search" />
        <input
          type="text"
          className="input-search"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="row">
        {currentVideos.map(video => (
          <div className="col-md-4" key={video.id}>
            <Link to={`/player/${video.videoUrl}`} className="text-decoration-none">
              <VideoCard
                title={video.title}
                description={video.description}
                channel={video.channel}
                thumbnail={`https://i.ytimg.com/vi/${video.videoUrl}/hqdefault.jpg`}
                keywords={video.keywords}
                videUrl={video.videoUrl}
              />
            </Link>
          </div>
        ))}
      </div>

      <Pagination className="justify-content-center">
        {[...Array(Math.ceil(videoData.length / videosPerPage)).keys()].map(number => (
          <Pagination.Item
            key={number + 1}
            active={number + 1 === currentPage}
            onClick={() => handlePageChange(number + 1)}
            size="lg"
            style={{ borderRadius: '10px', margin: '6px' }}
          >
            {number + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
}

export default Home;
