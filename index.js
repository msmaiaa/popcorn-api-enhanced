const env = require('dotenv');
env.config();
const app = require('express')();
const mongoose = require('mongoose');
const movies = require('./src/routes/movies')
const animes = require('./src/routes/animes')
const shows = require('./src/routes/shows')



app.use('/movies', movies);
app.use('/animes', animes);
app.use('/shows', shows);
app.use((req,res,next)=>{
  return res.status(404).send('Not found');
})


mongoose.connect(process.env.MONGO_URI, {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{
  console.log('Connected to Mongo database');
  // console.time("dbsave");
  // populateDatabase(['movies', 'shows', 'animes'])
  // .then(()=>{
  //   console.timeEnd("dbsave");
  // })
})
.catch(()=>{
  console.log('Error while trying to connect to the MongoDB database');
})

app.listen(process.env.PORT, process.env.HOST,()=>{
  console.log('Listening at port '+ process.env.PORT);
})

// setTimeout(()=>{
//   populateDatabase(['movies'])
// }, 2000)