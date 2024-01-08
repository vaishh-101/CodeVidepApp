import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Home/Home';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import Signup from './Signup/signup';
import Contact from './Contact/Contact';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
       <Route path="/login" element={<Login />} />
       <Route path='/signup' element={<Signup />} />
       <Route path="/dashboard" element={<Dashboard />} />
       <Route path='/player/:videoID' element={<VideoPlayer />} />
 <Route path="/contact" element={<Contact/>} />

    </Routes>
    </BrowserRouter>
    </>
  )

}
export default App;