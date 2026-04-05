const player = document.getElementById("player"),
button = document.getElementById("radioPlayPause"),
marquee = document.getElementById("radioPlayerTitle"),
timecode = document.getElementById("radioPlayerTimecode"),
ppBtton = document.getElementById("radioPlayPause"),
iceStatusXSL = "http://127.0.0.1:8000/status-json.xsl",
icecastSRC = "http://127.0.0.1:8000/butt",
radioCo = "https://public.radio.co/api/v2/s89cce5709/track/current",
radioCoSRC = "https://streaming.radio.co/s89cce5709/listen";

function fetchStats(url1, url2) {
    console.log("Fetching source from Icecast.")
    return fetch(url1, {
      method: 'GET'
    })
    .then ( function (response) {
        console.log("1")
        console.log("Icecast server found, checking for source.")
        return response.json();
     })
    .then ( function (json) {
        console.log("2")
        const source = json.icestats.source;
        if (!source) {
            throw new Error("No available icecast source");
        };
        console.log("3")
        console.log("Iceast source found.")
        if (!(player.src === icecastSRC)) {
            console.log("4");
            console.log("Changing player source to Icecast.")
            player.src = icecastSRC;
        };
        let startTime = new Date(source.stream_start);
        console.log(startTime);
        let currentTime = new Date(),
        deltaTime = currentTime.getTime() - startTime.getTime(),
        timecodeVal = new Date(deltaTime);
        timecode.innerHTML = `${timecodeVal.getHours()}:${timecodeVal.getMinutes()}:${timecodeVal.getSeconds()}`;
        marquee.innerText = source.playlist.trackList[source.playlist.trackList.length-1].title;
        console.log("5");
        return source;
    })
    .catch( (e) => {
        console.log("6");
        console.warn(e);
        console.log("Icecast source failed, attempting to fetch source from RadioCo.")
        return fetch(url2, {
            method: 'GET'
        })
        .then ( function (response2) {
            console.log("7")
            console.log("RadioCo server found, checking for source.")
            return response2.json();
         })
        .then ( function (json2) {
            console.log("8")
            const source2 = json2.data;
            if (!source2) {
                throw new Error("No available RadioCo source");
            };
            console.log("9")
            console.log("RadioCo source found.")
            if (!(player.src === radioCoSRC)) {
                console.log("10");
                console.log("Changing player source to RadioCo.")
                player.src = radioCoSRC;
            };
            console.log("11");
            return source2;
        })
        .catch( (e2) => {
            console.log("99");
            console.warn(e2);
            return e2;
        });
    })
};

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

setInterval( ()=> {
    fetchStats(iceStatusXSL, radioCoSRC);
}, 200)