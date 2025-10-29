


function PauseButton() {
    console.log("pause ou despause game");
}

async function FullPlayerView() {
    const PlayerView = document.querySelector("PlayerView");

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
}
