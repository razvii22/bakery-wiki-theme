const player = document.getElementById("player"),
statusXSL = "http://127.0.0.1:8000/status-json.xsl",
icecast = "http://127.0.0.1:8000/butt";

// async function getStats(url) {
//     let data = await fetch(url, {
//         method: 'GET'
//     });
//     console.log(data);
//     let jason = await JSON.stringify(data.json());
//     console.log(jason);    
// };

function fetchStats(url1, url2) {
    return fetch(url1, {
      method: 'GET'
    })
    .then ( function (response) {
        console.log("1")
        return response.json();
     })
    .then ( function (json) {
        console.log("2")
        const source = json.icestats.source;
        if (!source) {
            throw new TypeError("No available icecast source");
        };
        console.log("3")
        console.log(source);
        console.log(player.src);
        console.log(icecast);
        if (!(player.src === icecast)) {
            console.log("4");
            player.src = icecast;
        };
        console.log("5");
        window.requestAnimationFrame( (timeMs) => {
            console.log(timeMs);
            fetchStats(url);
        })
        return source;
    })
    .catch( (e) => {
        console.log("6");
        console.warn(e);
        return fetch(url2, {
            method: 'GET'
        })
        .then ( function(response2) {
            console.log("6");
            return response2.json;
        })
        .then ( function (json2) {
            console.log("7");
            
        })
    });
}