function Makeocomponents(){
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
    }
    Makeocomponents();