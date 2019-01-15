require("dotenv").config();
const keys = require("./keys.js");
const axios = require("axios");
const fs = require("fs");
// const spotify = new Spotify(keys.spotify);


function concert() {
axios
.get("bands-in-town-api-url")
.then(function(response){
    console.log(response.data);
})
}

function movie() {
    const userInput = process.argv[3].trim().split(' ').join('+');
    const url = "http://www.omdbapi.com/?t=" + userInput + "&apikey=74d49d27"
    axios
    .get(url)
    .then(function(response){
        console.log("Title: " + response.data.Title);
        console.log("Year: " + response.data.Year);
        console.log(response.data.Ratings[0].Source + " " + response.data.Ratings[0].Value);
        console.log(response.data.Ratings[1].Source + " " + response.data.Ratings[1].Value);
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
        let movieText  = "Title: " + response.data.Title + "\nYear: " + response.data.Year + "\n" + response.data.Ratings[0].Source + " " + response.data.Ratings[0].Value + "\n" + response.data.Ratings[1].Source + " " + response.data.Ratings[1].Value + "\nCountry: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors + "\n-----------------------------\n"
        fs.appendFile('movies.txt', movieText, "utf8", (err) => {
            if (err) {
                console.log(err)
            }
            console.log(response);
        })
    })
}

switch(process.argv[2]) {
    // case "concert-this":
    // console.log("concert-this");
    // break;
    case "spotify-this-song":
    console.log("spotify-this-song");
    break;
    case "movie-this":
    movie()
    break;
    case "do-what-it-says":
    console.log("do-what-it-says");
     
}