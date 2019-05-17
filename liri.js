// Grab de axios package...
var axios = require("axios");
var Spotify = require('node-spotify-api');

var app = process.argv[2];
var item1 = process.argv[3];
var item2 = process.argv[4];
console.log(
    "The app you are requesting is: " + app +
    "\n and the item you are looking is " + item1 +
    "\n-----------------------------------------"
);

function liri(app, item1, item2) {

    if (app == "spotify") {
        var data = spotify(item1, item2);
        console.log(data);
    }

    else if (app == "omdb") {
        axios.get("http://www.omdbapi.com/?t=" + item1 + "&y=&plot=short&apikey=ccdf16c0").then(
            function (response) {
                console.log(JSON.stringify(response.data, null, 2));
            }
        );
    }

    else if (app == "bandsintown") {

        axios
            .get("https://rest.bandsintown.com/artists/" + item1 + "?app_id=trilogy")
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

    else {
        console.log("Function not programmed already!");
    }

};

function spotify(inputType, inputQuery) {

    console.log(
        "The inputType is " + inputType +
        "\n and the inputQuery is " + inputQuery
    )

    var spotify = new Spotify({
        id: "b9c37781047044988e8a462f0d0884fb",
        secret: "1ab6d458d05346fa9b3cc7a0b6175ed4"
    });

    spotify
        .search({ type: inputType, query: inputQuery })
        .then(function (response) {
            console.log(JSON.stringify(response, null, 2));
        })
        .catch(function (err) {
            console.log(err);
        });
};

liri(app, item1, item2);