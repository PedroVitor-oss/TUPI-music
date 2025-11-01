
//configuração do api 
var tagScriptIframe = document.createElement('script');
tagScriptIframe.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tagScriptIframe, firstScriptTag);
document.body.appendChild(tagScriptIframe);

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
function VideosIsPlaying(index) {
    const player = prePlayerVideo[index];
    return player && player.getPlayerState() === YT.PlayerState.PLAYING;
}

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