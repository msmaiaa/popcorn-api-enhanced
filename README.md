# popcorn-api-enhanced

This package stores data from the [PopcornTime api](http://popcorn-ru.tk/) and serves it in a better way. If you just want to use the api click [here](https://popcorn-api-enhanced.herokuapp.com/).

## Background

> I used to use [Yts api](https://yts.mx/api) for my personal projects involving gathering movie torrent data but they don't have any kind of api for shows or animes. Tried to use the original PopcornTime api but it sucks ass for my purposes so i decided to store all their data (at least what i need) and create a rest api similar to the yts api.

## Installation

Open your terminal and type in

```sh
$ git clone https://github.com/msmaiaa/popcorn-api-enhanced.git
$ cd popcorn-api-enhanced
$ npm install
```

## How to use

* Setup a .env file like the .env-example.txt 
* On the first time run, run populate.js to store everything on the database
* To serve the rest api just run index.js. It will update the database every x minutes (set on .env)

## Endpoints:

```
/movies
/animes
/shows
```

**Optional params:**
`genre`
`page`
`limit`

**Example request**

```
/movies?genre=action&page=1&limit=20
```

**Example Response**
- It only returns a torrent list on movie endpoints, if you want to get a full list of episodes and seasons for animes or shows you can use [this endpoint](https://tv-v2.api-fetch.sh/show/tt0944947).
- I set the limit to work only between 1 and 50, but you can change.
```
  "totalFound": 5281,
  "limit": 20,
  "page": 1,
  "totalPages": 265,
  "data": [
    {
      "images": {
        "poster": "http://image.tmdb.org/t/p/w500/lPsD10PP4rgUGiGR4CCXA6iY0QQ.jpg",
        "fanart": "http://image.tmdb.org/t/p/w500/7prYzufdIOy1KCTZKVWpjBFqqNr.jpg",
        "banner": "http://image.tmdb.org/t/p/w500/lPsD10PP4rgUGiGR4CCXA6iY0QQ.jpg"
      },
      "rating": {
        "percentage": 84,
        "watching": 181,
        "votes": 129,
        "loved": 0,
        "hated": 0
      },
      "genres": [
        "action",
        "adventure",
        "animation",
        "drama",
        "family",
        "fantasy"
      ],
      "_id": "tt5109280",
      "__v": 0,
      "synopsis": "Long ago, in the fantasy world of Kumandra, humans and dragons lived together in harmony...",
      "title": "Raya and the Last Dragon",
      torrents:{...}
```

## Bugs

If you have questions, feature requests or a bug you want to report, please click [here](https://github.com/msmaiaa/popcorn-api-enhanced/issues) to file an issue.

