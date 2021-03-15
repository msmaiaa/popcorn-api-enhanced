const axios = require('axios');
const allGenres = require('./src/consts');
const Anime = require('./src/models/Anime');
const Movie = require('./src/models/Movie');
const Show = require('./src/models/Show');
const animeApi = 'https://tv-v2.api-fetch.sh/';
const popApi = 'http://popcorn-ru.tk/';

const genres = {
    animes: allGenres.animeGenres,
    movies: allGenres.movieGenres,
    shows: allGenres.showGenres,
}

const populateDatabase = async(args)=>{
    for(t of args){
      populateSingleCollection(t);
    }
}
  
const populateSingleCollection = async(type)=>{
    return await gatherMediaInfo(type)
}
  
  
  
const getGenres = async(data) =>{
    let newData = [...data]
    try{
      for(d of newData){
        const url = popApi + 'show/' + d._id;
        const content = await axios.get(url)
        d.genres = content.data.genres;
      }
      return newData;
    }
    catch(e){
      console.log('Error on getGenres');
      return
    }
  }
  
const getPageInfo = async(type, page, url1)=>{
    const url = `${url1}${type}/${page}?sort=trending`
    try{
      let pageInfo = await axios.get(url)
      console.log(url)
      if(pageInfo.data.length >= 1){
        if(type == 'shows'){
          return await getGenres(pageInfo.data)
        }else{
          return pageInfo.data;
        }
      }else{
        return []
      }
    }
    catch(e){
      console.log('Error on url: ' + url)
    }
}
  
const gatherMediaInfo = async(type) =>{
    try{
      let url = popApi;
      if(type == 'animes'){
        url = animeApi;
        genreList = genres.animes;
      }else if(type == 'movies'){
        genreList = genres.movies;
      }else{
        genreList = genres.shows;
      }
    
      const pages = await getTotalPages(url + type);
      for(const [i, page] of pages.entries()){
        const pageContent = await getPageInfo(type, i + 1, url)
        if(pageContent.length >= 1){
          for(m of pageContent){
            await saveDoc(type, m)
          }
        }else{
          break
        }
      }
      return
    }
    catch(e){
      console.log('Error in gatherMediaInfo')
    }
}
  
const saveDoc = async(type, c) =>{
    const query = {_id: c._id};
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    if(type == 'animes'){
      const update = {
      _id: c._id,
      title: c.title,
      year: c.year,
      slug: c.slug,
      synopsis: c.synopsis,
      num_seasons: c.num_seasons,
      images: c.images,
      rating: c.rating,
      genres: c.genres
      }
      Anime.findOneAndUpdate(query, update, options, (err,result)=>{
        if(err){
          console.log('Error while trying to save ' + c._title);
        }
        return
      })
    }else if(type == 'shows'){
      const update = {
      _id: c._id,
      title: c.title,
      year: c.year,
      slug: c.slug,
      synopsis: c.synopsis,
      num_seasons: c.num_seasons,
      images: c.images,
      rating: c.rating,
      genres: c.genres
      }
      Show.findOneAndUpdate(query, update, options, (err,result)=>{
        if(err){
          console.log('Error while trying to save ' + c._title);
        }
        return
      })
    }else{
      const update = {
      _id: c._id,
      title: c.title,
      year: c.year,
      slug: c.slug,
      synopsis: c.synopsis,
      torrents: c.torrents,
      images: c.images,
      rating: c.rating,
      genres: c.genres
      }
      Movie.findOneAndUpdate(query, update, options, (err,result)=>{
        if(err){
          console.log('Error while trying to save ' + c._title);
        }
        return
      })
    }
}
  
const getTotalPages = async(url) =>{
    const pages = await axios.get(url);
    return pages.data;
}