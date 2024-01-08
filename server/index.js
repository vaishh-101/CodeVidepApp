const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Video = require('./models/Video');
const User = require('./models/User');
require('dotenv').config();
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 1000 
async function connectToDB(){
    const connection = await mongoose.connect(process.env.MONGO_URI)
    if(connection){
        console.log('connected to mongoDB');
    }
}
connectToDB();


app.get('/videos/all', async (req, res) =>{
  const videoData =  await Video.find();
    res.send(videoData);
  });

  app.post("/videos/search", async(req,res) => {
    // find videos like search term
    const videoData = await Video.find({
      title: { $regex: req.body.searchTerm, $options: "i" } 
    });
    res.send(videoData);
  }) 

app.post('/videos/add', async(req,res) => {
    const videoObject = {
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      channel: req.body.channel,
      keywords: req.body.keywords,
      videoUrl: req.body.videoUrl
    }

    const video = new Video(videoObject)
    const result = await video.save()
    
    res.send({
      message:'Video added successfully'
    })
});

app.post("/user/add",async(req, res) => {
  const user = new User({
    fullName: req.body.fullName,
    email:  req.body.email,
    password: req.body.password,
  })

  const result = await user.save();

  res.send({
    message: "User added successfully",
    user: result
  });
})

app.post('/user/signup', async(req, res)=>{
  const fullName = req.body.fullName;
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new User({
    fullName: fullName,
    email: email,
    password: password
  })

  const savedUser = await newUser.save();

  res.send(savedUser);
})

app.post("/user/login", async(req, res) =>{
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  })

  if(user) {
    res.send({
    status: "success",
    message: "User logged in successfully",
    user: user
    })
  }
  else{
    res.send({
      status: "failure",
      message: "User not found",
    })
  }
});
  
   if(process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

   app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
  });
}


app.listen(1000, () =>{
    console.log('Server is running on port 1000');
});