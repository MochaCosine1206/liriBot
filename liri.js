require("dotenv").config();
const keys = require("./keys.js");
const axios = require("axios");
const fs = require("fs");
const moment = require("moment");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

function doWant() {
    fs.readFile('random.txt', 'utf8', (err, res) => {
        if (err) {
            console.log(err);
        }
        const wantIt = (res.split(","));
        const userInput = wantIt[1];
        spotify.search({ type: 'track', query: userInput }, function(err, data) {
            if (err) {
                console.log(err)
            }
            console.log(data.tracks.items[0].album.name);
            const backStreetText = "\nThis is what happens donny\nYou let the program choose, so here goes: " + data.tracks.items[0].album.name + " by " + data.tracks.items[0].album.artists[0].name + "\nListen here and perish: " + data.tracks.items[0].album.href + "\n-----------------------------\n"
            fs.appendFile("log.txt", backStreetText, "utf8", (err) => {
                if (err) {
                    console.log(err);
                }
            })
        });
    })
}

function song() {
    const wholeArgv = process.argv;
    const argvSlice = wholeArgv.slice(3);
    console.log(process.argv[3]);
    let userInput = argvSlice.join(' ');
    if (process.argv[3] === undefined) {
        userInput = "Ace of Base";
        spotify.search({ type: 'track', query: userInput }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
            console.log(data.tracks.items[0].album.name);
            console.log(data.tracks.items[0].album.artists[0].name);
            const aceText = "\nYou chose nothing, and you get: " + data.tracks.items[0].album.name + " by " + data.tracks.items[0].album.artists[0].name + "\nListen here without remorse: " + data.tracks.items[0].album.href + "\n-----------------------------\n"
            fs.appendFile("log.txt", aceText, "utf8", (err) => {
                if (err) {
                    console.log(err);
                }
            })
            
        });
    } else {
    spotify.search({ type: 'track', query: userInput }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
    //   console.log(data);
    //   console.log(data.tracks.items[0]);

    for (let i = 0; i < data.tracks.items.length; i++) {
        console.log(data.tracks.items[i].album.artists[0].name);
        console.log(data.tracks.items[i].name);
        console.log(data.tracks.items[i].album.href);
        console.log(data.tracks.items[i].album.name);
        let songText = "Artist: " + data.tracks.items[i].album.artists[0].name + "\nTrack Name: " + data.tracks.items[i].name + "\nSpotify Link" + data.tracks.items[i].album.href + "\nAlbumn Name: " + data.tracks.items[i].album.name + "\n-----------------------------\n"
        fs.appendFile("log.txt", songText, "utf8", (err) => {
          if (err) {
              console.log(err);
          }
      })
      
    }
      
    
    });
}
}


function concert() {
    const wholeArgv = process.argv;
    const argvSlice = wholeArgv.slice(3);
    const userInput = argvSlice.join('+');
    fs.appendFile("log.txt", argvSlice.join(' ') + "\n---------------------\n", "utf8", (err) => {
        if (err) {
            console.log(err);
        }
    })
    const url = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"
    axios
        .get(url)
        .then(function (response) {
            console.log(response.data[0]);
            for (let i = 0; i < response.data.length; i++){
            console.log("Name of Venue: " + response.data[i].venue.name);
            console.log("City: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
            console.log(response.data[i].datetime);
            let concertDate = moment(response.data[i].datetime).format('MM DD YYYY');
            console.log(concertDate);
            let concertText = "Name of Venue: " + response.data[i].venue.name + "\nCity: " + response.data[i].venue.city + ", " + response.data[i].venue.country + "\n" + concertDate + "\n--------------------\n"
            fs.appendFile("log.txt", concertText, "utf8", (err) => {
                if (err) {
                    console.log(err);
                }
            })

            }
        })
}

function movie() {
    const wholeArgv = process.argv
    const argvSlice = wholeArgv.slice(3)
    const userInput = argvSlice.join('+');
    console.log(userInput);
    const url = "http://www.omdbapi.com/?t=" + userInput + "&apikey=74d49d27"
    console.log(url);
    axios
        .get(url)
        .then(function (response) {
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log(response.data.Ratings[0].Source + " " + response.data.Ratings[0].Value);
            console.log(response.data.Ratings[1].Source + " " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            let movieText = "Title: " + response.data.Title + "\nYear: " + response.data.Year + "\n" + response.data.Ratings[0].Source + " " + response.data.Ratings[0].Value + "\n" + response.data.Ratings[1].Source + " " + response.data.Ratings[1].Value + "\nCountry: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors + "\n-----------------------------\n"
            fs.appendFile('log.txt', movieText, "utf8", (err) => {
                if (err) {
                    console.log(err)
                }
                console.log(response);
            })
        })
}

switch (process.argv[2]) {
    case "concert-this":
    console.log("concert-this");
    concert();
    break;
    case "spotify-this-song":
        console.log("spotify-this-song");
        song();
        break;
    case "movie-this":
        movie()
        break;
    case "do-what-it-says":
        console.log("do-what-it-says");
        doWant();

}