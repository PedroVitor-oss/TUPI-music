


function PauseButton() {
    console.log("pause ou despause game");
    loadYouTubeIframeAPIReady() 
}

async function FullPlayerView() {
    const PlayerView = document.querySelector("PlayerView");
    const  nav = document.querySelector("nav");

    // Definir a função de clique
    const handleClick = () => {
        console.log("removido click event");
    };

    // Verificar se a classe "full" já foi adicionada
    if (!PlayerView.classList.contains("full")) {
        console.log("full view");
        console.log(PlayerView);

        // Adicionar o evento de clique
        PlayerView.addEventListener("click", handleClick, false);
        
        // Adicionar a classe "full"
        PlayerView.classList.add("full");
        nav.classList.add("player-opened");
    }
}

function ClosePlayerView() {
    console.log("Minimal player video");
    const PlayerView = document.querySelector("PlayerView");

    // Remover o evento de clique quando fechar
    const handleClick = () => {
        console.log("removido click event");
    };
    PlayerView.removeEventListener("click", handleClick, false);

    // Remover a classe "full"
    PlayerView.classList.remove("full");
    const  nav = document.querySelector("nav");
    nav.classList.remove("player-opened");
}

function PlayMusic(idVideo) {

 playVideo(idVideo); 

    console.log("play music idVideo:", idVideo);
    const video = videoResult[idVideo];
    if (video) {
        // Play the video
        console.log("Playing video:", video);
        // remover PlayerView e adcionar denovo com outros dados
        $("PlayerView").remove();
       $("body").append(`<PlayerView class="" name="${video.title}" auth="${video.auth}" banner="${video.img}" state="paused"></PlayerView>`);
        // Recarregar o componente PlayerView
        Makeocomponents();

    } else {
        console.log("Video not found");
    }
}