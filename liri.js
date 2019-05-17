// Grab de axios package...
var inquirer = require("inquirer");
var axios = require("axios");
var Spotify = require('node-spotify-api');

// Functions to run-----------------------------------------

function spotify(type, query) {

    var spotify = new Spotify({
        id: "b9c37781047044988e8a462f0d0884fb",
        secret: "1ab6d458d05346fa9b3cc7a0b6175ed4"
    });

    spotify
        .search({ type: type, query: query })
        .then(function (response) {
            console.log(JSON.stringify(response, null, 2));
        })
        .catch(function (err) {
            console.log(err);
        });
};

function bandsintown(band){
    axios
            .get("https://rest.bandsintown.com/artists/" + band + "?app_id=trilogy")
            .then(function (response) {
                // If the axios was successful...
                // Then log the body from the site!
                console.log(JSON.stringify(response.data,null,2));
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
}

function omdb(movie){
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=ccdf16c0").then(
            function (response) {
                console.log(JSON.stringify(response.data, null, 2));
            }
        );
}


function init(){

    inquirer.prompt([
        {
            name: "app",
            message: "Spotify, OMDB or BandsInTown (capital sensitive)"

        },
    ]).then(function(answers){

        console.log(answers.app);

        if (answers.app == "Spotify"){
            inquirer.prompt([
                {
                    name: "type",
                    message: "Artist, album or track?"
                },
                {
                    name: "query",
                    message: "Which artist, album or track?"
                }
            ]).then(function(data){
                spotify(data.type, data.query);
            })
        }

        if (answers.app == "OMDB"){
            inquirer.prompt([
                {
                    name: "movie",
                    message: "which movie are you looking for?"
                }
            ]).then(function(data){
                omdb(data.movie);
            })
        }

        if (answers.app == "BandsInTown"){
            inquirer.prompt([
                {
                    name: "band",
                    message: "which band are you looking for?"
                }
            ]).then(function(data){
                bandsintown(data.band);
            })
        }
    })
}

init();