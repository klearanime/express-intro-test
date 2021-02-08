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

app.get("/artist", function (req, res) {
  console.log(req.query)
  res.status(200).json({
    artistArray
  })
})

app.get("/artist/:artistID", function (req, res) {
  let artistInfo = null
  let artistIDNumber = Number(req.params.artistID)

  artistArray.forEach((item) => {
    if (item.id === artistIDNumber) {
      artistInfo = item;
    }
  })
  if (artistInfo === null) {
    return res.status(400).send("Sorry, the {artistIDNumber} you are looking does not exist")
  }
  res.status(200).json({
    id: artistIDNumber,
    name: req.params.artistArray.id,
    artist: artistIDNumber,
  })
})

app.post("/artist", function (req, res) {
  artistArray.push({
    name: req.body.name,
    albumsArray: req.body.albumsArray,
    topSongs: req.body.topSongs
  })
  app.post("/artist/addArtist/:artistID", function (req, res) {
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
  })

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

artistArray.forEach((item) => {
  console.log(item);
});

app.listen(3000, () => {
  console.log("STARTED");
});
