function Makeocomponents() {
    //find Result components
    const results = document.querySelectorAll('Result');

    results.forEach(result => {
        const title = result.getAttribute('title');
        const auth = result.getAttribute('auth');
        const img = result.getAttribute('img');

        //create the inner HTML structure
        result.innerHTML = `
                <div class="result-item">
                    <img src="${img}" alt="${title}">
                    <div class="result-info">
                        <h3>${title}</h3>
                        <p>${auth}</p>
                    </div>
                </div>
            `;
    });

    const playlists = document.querySelectorAll('PLAYLIST');

    playlists.forEach(playlist => {
        const title = playlist.getAttribute('title');
        const img = playlist.getAttribute('img');

        //create the inner HTML structure
        playlist.innerHTML = `
                <div class="playlist-item">
                    <img src="${img}" alt="${title}">
                    <h4 style="margin: 0;">${title}</h4>
                </div>
            `;
    });

    const PlayerView = document.querySelector("PlayerView");

    let bannersrc = PlayerView.getAttribute("banner");
    let name = PlayerView.getAttribute("name");
    let statebutton = PlayerView.getAttribute("state");
    let auth = PlayerView.getAttribute("auth");

    let htmlbutton = statebutton == "paused" ? `<button id="btn-play" onclick="PauseButton()"><i class="fa-solid fa-play"></i></button>` : `<button id="btn-play" onclick="PauseButton()"><i class="fa-solid fa-pause"></i></button>`;
    PlayerView.addEventListener("click", () => {
        //FullPlayerView();
    });
    PlayerView.innerHTML = `
        <header onclick="ClosePlayerView()">
            <i class="fa-solid fa-chevron-down"></i>
            <p>Resultado Busca</p>
            <i class="fa-solid fa-ellipsis-vertical"></i>
        </header>
        <div class="banner" onclick="FullPlayerView()">
            <img class="banner" src="${bannersrc}"></img>
        </div>
        <div class="info" onclick="FullPlayerView()">
            <div class="text">
                <h4>${name}</h4>
                <p>${auth}</p>
            </div>
            <div class="actions">
                <button onclick="Backward()"><i class="fa-regular fa-circle-down"></i></button>
                <button onclick="Backward()"><i class="fa-solid fa-plus"></i></button>
            </div>

        </div>
        <div class="controles">
            <input type="range">
            <div class="buttons">
                <button onclick="Backward()"><i class="fa-solid fa-backward"></i></button>
                ${htmlbutton}
                <button onclick="Forward()"><i class="fa-solid fa-forward"></i></button>
            </div>
        </div>
        `

}
Makeocomponents();