let videoResult = [];
let idVideoSearch = [];
let prePlayerVideo = [];

var tagScriptIframe = document.createElement('script');
tagScriptIframe.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tagScriptIframe);

function Search() {
    const input = document.querySelector('.cont-input input');
    const button = document.querySelector('.cont-input button');
    const resultsContainer = document.querySelector('.results');
    const formSeach = document.getElementById('form-seach');
    formSeach.addEventListener('submit', (e) => {
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
                idVideSeach = [];
                prePlayerVideo = []
                let idVideo = 0;
                data.items.forEach(item => {

                    let type = item.id.kind;
                    switch (type) {
                        case "youtube#video":
                            type = "video";
                            break;
                        case "youtube#channel":
                            type = "channel";
                            break;
                        case "youtube#playlist":
                            type = "playlist";
                            break;

                        default:
                            break;
                    }
                    console.log("type", type);
                   
                    videoResult.push({
                        id: item.id.videoId,
                        title: item.snippet.title,
                        auth: item.snippet.channelTitle,
                        img: item.snippet.thumbnails.default.url,
                        type: type
                    });
                    const resultComponent = document.createElement('Result');
                    resultComponent.setAttribute('title', item.snippet.title);
                    resultComponent.setAttribute('auth', item.snippet.channelTitle);
                    resultComponent.setAttribute('img', type == "playlist" ? "https://misc.scdn.co/liked-songs/liked-songs-300.jpg" : item.snippet.thumbnails.medium.url); resultComponent.setAttribute('type', type);
                    resultComponent.setAttribute('idvideo', item.id.videoId || item.id.channelId || item.id.playlistId);
                    resultComponent.setAttribute('index',  idVideo);
                     if(type == "video"){
                        idVideoSearch.push(item.id.videoId);
                        idVideo++;
                    }
                    if (type === "channel"){
                        resultComponent.classList.add('result-channel');
                    }
                    resultsContainer.appendChild(resultComponent);


                });
                console.log("reult busca", data);
                Makeocomponents();
                LoadVidosPlayer();
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
            });


        // Re-make components to render new results

    });
}
Search();

var player;

function LoadVidosPlayer() {
    console.log("Load Video Result");
    prePlayerVideo = []; // limpa antes de carregar novamente, se quiser
    idVideoSearch.forEach((videoId, index) => {
        console.log("videoId para player:", videoId);
        loadYouTubeIframeAPIReady(videoId, index);
    });
}
function loadYouTubeIframeAPIReady(videoId, index) {
    // Cria um container único para cada player
    const containerId = `player_${index}`;
    let container = document.getElementById(containerId);
    if (!container) {
        container = document.createElement("div");
        container.id = containerId;
        document.body.appendChild(container); // ou outro local onde quer colocar os vídeos
    }

    const player = new YT.Player(containerId, {
        height: '200',
        width: '300',
        videoId: videoId,
        playerVars: {
            'playsinline': 1,
            'autoplay': 0 // garante que não toque automaticamente
        },
        events: {
            'onReady': (event) => onPlayerReady(event, index),
            'onStateChange': onPlayerStateChange
        }
    });

    // Salva a referência no array
    prePlayerVideo[index] = player;
}

function onPlayerReady(event, index) {
    console.log(`Player ${index} pronto!`);
    // não chama playVideo aqui — assim o vídeo só toca quando você quiser
}

function onPlayerStateChange(event) {
    // você pode usar esse evento para detectar quando começa ou termina
    if (event.data == YT.PlayerState.ENDED) {
        console.log("Vídeo terminou!");
    }
}

// Exemplo de funções manuais:
function playVideo(index) {
    if (prePlayerVideo[index]) {
        prePlayerVideo[index].playVideo();
    }
}

function stopVideo(index) {
    if (prePlayerVideo[index]) {
        prePlayerVideo[index].stopVideo();
    }
}