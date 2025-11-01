let videoResult = []; // serve ´para renderizar
let idVideoSearch = []; // serve para carregar os players
let prePlayerVideo = [];// os players




SetupSearch();

function SetupSearch() {

    const formSeach = document.getElementById('form-seach');
    const button = document.querySelector('.cont-input button');
    formSeach.addEventListener('submit', Seach);
    button.addEventListener('click', Seach);
}

function CleanData() {
    videoResult = [];
    idVideoSearch = [];
    prePlayerVideo = [];
}
function Seach(e) {
    const input = document.querySelector('.cont-input input');
    const resultsContainer = document.querySelector('.results');
    e.preventDefault();

    const query = input.value.trim();
    if (query === '') return;

    // Clear previous results


    //fetch http://localhost:5080/search/ + query
    fetch('http://localhost:5080/search/' + encodeURIComponent(query), { mode: 'cors' })
        .then(response => response.json())
        .then(data => {
            // Assuming data is an array of results
            resultsContainer.innerHTML = '';
            CleanData();
            let idVideo = 0;
            // if(VideoAtual !== null){
            //     console.log("salvando video atual no preplayer");
            //     prePlayerVideo.push(VideoAtual);
            //     idVideo++;
            // }
            data.items.forEach(item => {

                let type = ChosenType(item.id.kind);

                // console.log("type", type);


                const resultComponent = document.createElement('Result');
                resultComponent.setAttribute('title', item.snippet.title);
                resultComponent.setAttribute('auth', item.snippet.channelTitle);
                resultComponent.setAttribute('img', type == "playlist" ? "https://misc.scdn.co/liked-songs/liked-songs-300.jpg" : item.snippet.thumbnails.medium.url); resultComponent.setAttribute('type', type);
                resultComponent.setAttribute('idvideo', item.id.videoId || item.id.channelId || item.id.playlistId);
                resultComponent.setAttribute('index', idVideo);

                if (type == "video") {

                    idVideoSearch.push(item.id.videoId);
                    videoResult.push({
                        id: item.id.videoId,
                        title: item.snippet.title,
                        auth: item.snippet.channelTitle,
                        img: item.snippet.thumbnails.default.url,
                        type: type
                    });
                    idVideo++;
                }
                if (type === "channel") {
                    resultComponent.classList.add('result-channel');
                }
                resultsContainer.appendChild(resultComponent);


            });
            // console.log("reult busca", data);
            Makeocomponents();
            LoadVidosPlayer();
        })
        .catch(error => {
            console.error('Error fetching search results:', error);
        });


    // Re-make components to render new results

}
function ChosenType(kind) {
    switch (kind) {
        case "youtube#video":
            return "video";
        case "youtube#channel":
            return "channel";
        case "youtube#playlist":
            return "playlist";
        default:
            return "unknown";
    }
}


