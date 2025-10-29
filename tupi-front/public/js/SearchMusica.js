 let idVideSeach = [];
 let prePlayerVideo = [];

 
 
 
 function Search(){
        const input = document.querySelector('.cont-input input');
        const button = document.querySelector('.cont-input button');
        const resultsContainer = document.querySelector('.results');

        button.addEventListener('click', () => {
            const query = input.value.trim();
            if(query === '') return;

            // Clear previous results
            

            //fetch http://localhost:5080/search/ + query
            fetch('http://localhost:5080/search/' + encodeURIComponent(query),{mode:'cors'})
                .then(response => response.json())
                .then(data => {
                    // Assuming data is an array of results
                    resultsContainer.innerHTML = '';
                    idVideSeach = [];
                    data.items.forEach(item => {
                        const resultComponent = document.createElement('Result');
                        resultComponent.setAttribute('title', item.snippet.title);
                        resultComponent.setAttribute('auth', item.snippet.channelTitle);
                        resultComponent.setAttribute('img', item.snippet.thumbnails.default.url);
                        resultsContainer.appendChild(resultComponent);

                        console.log(item.id);
                    });
                    console.log(data);
                                Makeocomponents();
                })
                .catch(error => {
                    console.error('Error fetching search results:', error);
                });


            // Re-make components to render new results

        });
    }
Search();