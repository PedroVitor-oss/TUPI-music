
let indexPlaying = -1;
let VideoAtual = null;

function SelectMusic(index, startPlay = false) {
    console.log("select music index:", index);
    console.log("Musica atual:",VideoAtual);
    //tem um video tocando?
    //apausar ele 
    if (indexPlaying != -1) {
        if (VideoAtual.videoTitle != "") {
            if (VideoAtual.getPlayerState() === YT.PlayerState.PLAYING) {
                // stopVideo(indexPlaying)
                VideoAtual.stopVideo();
            }
        }
    }
    console.log("Musica atual depois de ser pausada:",VideoAtual);
    //trocar o video atual
    indexPlaying = index;
    //essa musaica já foi carregada no player?
    if (!prePlayerVideo[indexPlaying]) {
        // console.log("carregando video no player:", idVideoSearch[indexPlaying]);
        // loadYouTubeIframeAPIReady(idVideoSearch[indexPlaying], indexPlaying);
        console.log("video n carregado no player");
    } else {

        VideoAtual = prePlayerVideo[indexPlaying];
        
        console.log("novo video atual:",VideoAtual);
        if (startPlay) {
            // PlayMusic(indexPlaying);
            VideoAtual.playVideo();
        }
    }
    console.log("Musica atual depois de ser trocada:",VideoAtual);
}

function PauseButton(index) {
    // console.log("pause ou despause game");
    stopVideo(index)
}

async function FullPlayerView() {
    const PlayerView = document.querySelector("PlayerView");
    const nav = document.querySelector("nav");

    // Definir a função de clique
    const handleClick = () => {
        //  console.log("removido click event");
    };

    // Verificar se a classe "full" já foi adicionada
    if (!PlayerView.classList.contains("full")) {
        // console.log("full view");
        // console.log(PlayerView);

        // Adicionar o evento de clique
        // PlayerView.addEventListener("click", handleClick, false);

        // Adicionar a classe "full"
        PlayerView.classList.add("full");
        nav.classList.add("player-opened");
    }
}

function ClosePlayerView() {
    //// console.log("Minimal player video");
    const PlayerView = document.querySelector("PlayerView");

    // Remover o evento de clique quando fechar
    const handleClick = () => {
        // console.log("removido click event");
    };
    PlayerView.removeEventListener("click", handleClick, false);

    // Remover a classe "full"
    PlayerView.classList.remove("full");
    const nav = document.querySelector("nav");
    nav.classList.remove("player-opened");
}

function PlayMusic(idVideo) {

    playVideo(idVideo);

    console.log("play music idVideo:", idVideo);
    const video = videoResult[idVideo];
    if (video) {
        // Play the video
        // console.log("Playing video:", video);
        // remover PlayerView e adcionar denovo com outros dados
        $("PlayerView").remove();
        $("body").append(`<PlayerView class="" name="${video.title}" auth="${video.auth}" banner="${video.img}" state="paused"></PlayerView>`);
        // Recarregar o componente PlayerView
        Makeocomponents();

    } else {
        console.log("Video not found");
    }
}