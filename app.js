

var express = require("express");

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let artistArray = [
  {
    id: 1,
    name: "Kanye",
    albumsArray: [
      {
        id: 1,
        name: "The coding dropout",
      },
    ],
    topSongs: [
      {
        id: 1,
        name: "The Javascript State of Mind",
      },
    ],
  },
  {
    id: 2,
    name: "Chris Brown",
    albumsArray: [
      {
        id: 1,
        name: "The Greatest Algorithm",
      },
    ],
    topSongs: [
      {
        id: 1,
        name: "Wheel on the bus",
      },
    ],
  },
];

app.get("/", function (req, res) {
  res.send("Test---working---API")
})

// This Get Request should be able to retrieve the following:​
// 1. Get all artists
app.get("/", function (req, res) {
  console.log(req.query)
  res.status(200).json({
    artistArray
  })
})

// 2. Get all artists without albumsArray and topSongs
app.get("/artist", function (req, res) {
  let artistResult = []
  artistArray.forEach((item) => {
    artistResult.push({
      id: item.id,
      name: item.name
    })
  })
  res.status(200).json({
    item: artistResult
  })
})

// 3. Get artist by ID
app.get("/artist/:artistID", function (req, res) {
  let artistIDNumber = Number(req.params.artistID)
  artistArray.forEach((artist) => {
    if (artistIDNumber) {
      return artist.name
    }
  })
  let message = "Sorry, the artistID you are looking for doesn't exist"
  res.status(200).json({
    message
  })
})

// 4. Get artist's album by ID
app.get("/artist/:artistID/:albumID", function (req, res) {
  let artistIDNumber = Number(req.params.artistID)
  let albumIDNumber = Number(req.params.albumID)
  artistArray.forEach((artist) => {
    if (artist.id === artistIDNumber) {
      albumsArray.forEach((album) => {
        if (album.id === albumIDNumber) {
          return albumsArray.name;
        } else {
          res.status(400).send("Sorry, the {artistIDNumber} you are looking does not exist")
        }
      })
    }
  })
  let message
  res.status(200).json({
    message,
  })
})

// 5. Get artist's topSongs by ID
// 6. If the artist or the song or the album does not exist, send a message back "Sorry, the {XXXX} you are looking does not exist".
app.get("/artist/:artistID/:albumID/:songID", function (req, res) {
  let artistIDNumber = Number(req.params.artistID)
  let topSongIDNumber = Number(req.params.songID)
  artistArray.forEach((artist) => {
    if (artist.id === artistIDNumber) {
      artist.topSongs.forEach((song) => {
        if (song.id === topSongIDNumber) {
          topSongs.song.name
        } if (null) {
          res.status(400).send("Sorry, the {topSongIDNumber, artistIDNumber, topSongs} you are looking for doesn't exist")
        }
      })
    }
  })
  res.status(200).json({
    id: artistIDNumber,
    name: req.params.artistArray.id,
    artist: artistIDNumber,
    song: topSongIDNumber,
  })
})

app.post("/artist", function (req, res) {
  artistArray.push({
    name: req.body.name,
    albumsArray: req.body.albumsArray,
    topSongs: req.body.topSongs
  })

  // This Post Request should be able to create the following:
  // 1. Create new artists
  app.post("/artist/newArtist/:artistID", function (req, res) {
    let artistIDNumber = Number(req.params.artistID)
    artistArray.forEach((item) => {
      if (item.id === artistIDNumber) {
        item.artistArray.forEach((item) => {
          if (item.name === req.body.name) {
            res.status(404).send("Sorry this artist already exists")
          }
        })
        item.artistArray.push(req.body)
        console.log(item)
      }
    })
    res.status(200).json({
      artistArray,
    })

    // This Put Request should be able to update the following:
    // 1. Update artist name + other informations
    // 2. Update album name + other informations
    // 3. Update song name + other informations
    app.put("/artist/changeArtist/:artistID", function (req, res) {
      let artistIDNumber = Number(req.params.teamID)
      let obj = {}
      let artistIndex
      let indexArtist
      artistArray.forEach((item, indexArtist) => {
        if (item.id === artistIDNumber) {
          artistIndex = indexArtist
          item.artistArray.forEach((item, indexArtist) => {
            if (item.artist === req.body.artist) {
              obj = { ...item, ...req.body }
              artistIndex = indexArtist
            }
          })
        }
      })
      artistArray[artistIndex].artistArray[indexArtist] = obj
      res.json(artistArray)
    })

    // This Delete Request should be able to Delete the following: ​
    // 1. Delete artist
    // 2. Delete albums
    // 3. Delete topSongs
    app.delete("/artist/deleteArtist/:artistID", function (req, res) {
      let artistIDNumber = Number(req.params.artistID)
      let artistIndex
      artistArray.forEach((item, index) => {
        if (item.id === artistIDNumber) {
          item.artistArray
          artistIndex = index
          return
        }
      })
      artistArray[artistIndex].artistArray = item.artistArray.filter(
        (item) => item.artist !== req.body.artist
      )
      res.send(artistArray);
      console.log(JSON.stringify(artistArray));
    })
    res.status(200).json({
      artistArray,
    })
  })

  app.listen(3000, () => {
    console.log("STARTED");
  });
})

