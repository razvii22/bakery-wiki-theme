const icecastStats = "http://127.0.0.1:8000/status-json.xsl",
radioCoStats = "https://public.radio.co/api/v2/s89cce5709/track/current",
playerPath = "/assets/player/radioPlayer.html",
sources = [
    {"name" : icecast, "audio" : "http://127.0.0.1:8000/butt"},
    {"name" : radioCo, "audio" : "https://streaming.radio.co/s89cce5709/listen"}
];

// Function to check for footer on page =====================================================================================================================

function makeFooter () {
    if (!document.body.contains(document.getElementsByTagName("footer")[0])) {
        document.body.appendChild(document.createElement("footer"));
    };
};

// Generic source ping =====================================================================================================================================

function ping (url1, url2) {
    return fetch(url1, {
        method: 'GET'
    })
    .then( function (response) {
        return response.json()
    })
    .then( function (jsonResponse) {
        console.log(jsonResponse.icestats)
        if (!jsonResponse.icestats.source) {
            throw new Error("No source available from Icecast!");
        };
        const result = {"found": true, "service" : 0, "parameters" : jsonResponse};
        return result
    }).catch ((e) => {
        console.warn(`Fetch Icecast failed: ${e}, attempting to fetch RadioCo`);
        return fetch(url2, {
            method: 'GET'
        })
        .then( function (response) {
            return response.json();
        })
        .then( function (jsonResponse) {
            if (jsonResponse.data.title == "noFeed") {
                throw new Error("No source available from RadioCO")
            };
            let result = {"found" : true, "service" : 1, "parameters" : jsonResponse};
            return result
        })
    }).catch ((e) => {
        console.warn(`Fetch RadioCo failed: ${e}. No audio source coud be found.`)
        const result = {};
        result.found = false;
        return result
    });
};

// Check for radio feed every 4 minutes ================================================================================================================

function awaitBroadcast (url1, url2, intervalFunct, htmlPath) {
    let pingResponse = ping(url1, url2).then((response) => {
        if (response.found == true) {
            console.log("Broadcast active.");
            clearInterval(intervalFunct);
            makeFooter();
            makePlayer(htmlPath, url1, url2);
        } else {
            console.log("No broadcast.")
        }
    });
};

// Making player =======================================================================================================================================

function makePlayer (htmlPath, url1, url2) {
    fetch(htmlPath).then(function (file) {
        return file.text()
    }).then(function (playerContent) {
        let player = document.createElement("section");
        player.innerHTML = playerContent;
        player.setAttribute("id", "playerContainer");
        document.getElementsByTagName("footer")[0].prepend(player);
    }).then( () =>{
         const player = document.getElementById("player"),
        button = document.getElementById("radioPlayPause"),
        marquee = document.getElementById("radioPlayerTitle"),
        timecode = document.getElementById("radioPlayerTimecode");
        button.addEventListener("click", () => {
            playPause(player, button);
        })
        setInterval(() => {
            loadPlayer(player, marquee, timecode, url1, url2, sources);
        }, 200)
        // loadPlayer(player, marquee, timecode, url1, url2, sources);
    });
    
}

function loadPlayer (player, marquee, timecode, url1, url2, sources) {
    console.warn("makePlayer");
    try {
        ping(url1, url2)
        .then( (pingReturn) => {
            console.log("Wuppo value: ");
            console.log(pingReturn);
            if (pingReturn.found == true) {
                console.log("Found true!");
                console.log(sources[pingReturn.service].name)
                sources[pingReturn.service].name(player, marquee, timecode, sources[pingReturn.service].audio, pingReturn.parameters);
            }
        });
    } catch (e) {
        console.log(`Wuppo failed: ${e}`);
    };
    return true
};

// Functions for player sources ====================================================================================================================

function icecast (player, marquee, timecode, src, properties) {
    console.log("Icecast.");
    console.log(properties);
    if (!(player.src === src)) {
            console.log("Changing player source to Icecast.");
            player.src = src;
        };
        let startTime = new Date(properties.icestats.source.stream_start);
        console.log(startTime);
        let currentTime = new Date(),
        deltaTime = currentTime.getTime() - startTime.getTime(),
        timecodeVal = new Date(deltaTime);
        timecode.innerHTML = `${timecodeVal.getHours()}:${timecodeVal.getMinutes()}:${timecodeVal.getSeconds()}`;
        marquee.innerText = properties.icestats.source.playlist.trackList[properties.icestats.source.playlist.trackList.length-1].title;
        console.log("5");
}

function radioCo (player, marquee, timecode, src, properties) {
    console.log("RadioCo.");
    console.log(properties);
    if (!(player.src === src)) {
        console.log("Changing player source to RadioCo.")
        player.src = src;
    };
    timecode.innerHTML = "RadioCo"
    marquee.innerHTML = properties.data.title;
};

// Player controls ============================================================

function playPause(player, button) {
    const isPlaying = !player.paused;
    console.log(isPlaying);
    if (isPlaying) {
        player.pause();
        console.log("pause");
        button.innerHTML = "| &#x23f5 |";
    } else {
        player.play();
        console.log("play");
        button.innerHTML = "| &#x23f8  |";
    }
};

const backgroundPing = setInterval( () => {
    awaitBroadcast(icecastStats, radioCoStats, backgroundPing, playerPath)
}, 240000);

awaitBroadcast(icecastStats, radioCoStats, backgroundPing, playerPath);
