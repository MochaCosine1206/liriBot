require("dotenv").config();
const keys = require("./keys.js");
const axios = require("axios");
const fs = require("fs");
const moment = require("moment");
// const spotify = new Spotify(keys.spotify);


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
        break;
    case "movie-this":
        movie()
        break;
    case "do-what-it-says":
        console.log("do-what-it-says");

}