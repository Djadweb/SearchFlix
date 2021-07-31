
let searchBar = document.querySelector('.search-bar');
let searchButton = document.querySelector('.search-icon');
let clearSearch = document.querySelector('.close-icon');

if(searchBar && searchButton && clearSearch) {
    clearSearch.addEventListener('click', () => {
        //searchBar.value = "";
        location.reload();
    });
    
    searchBar.addEventListener('keyup', (e) => {
        if(e.keyCode === 13) {
            search();
        }    
    });
    
    searchButton.addEventListener('click', (e) => {   
        search();   
    });
}


function search() {        
    let value = searchBar.value;
    var moviesGrid = document.querySelector('.movies');    

    if(value != "") {
        fetch("http://www.omdbapi.com/?i=tt3896198&apikey=c03f51dd&s=" + value).then(
            (response) => {
                let resultJson = response.json();                                
                return resultJson;
            }).then(
                (response) => {
                    let movies = response.Search;                    

                    for(movie of movies) {                                  
                        let title = movie.Title;  
                        let image = movie.Poster;  
                        let imdbID = movie.imdbID;                                                  
                        let movieElement = `<div onclick="selectedMovie('${title}')" class="movie-result__container">
                                                <div class="movie-result__picture">
                                                    <img src="${image}">
                                                </div>
                                                <div class="movie-result__title">${title}</div>
                                            </div>`;

                        moviesGrid.innerHTML += movieElement;                                                             
                    }         
                    //let moviesList = document.querySelectorAll('.movie-result__container');             
                    
                    // moviesList.forEach(movie => {
                                              
                    });
                // });
    }
}



function getMovie() {
    let getTitle = sessionStorage.getItem('title');
    
    fetch("http://www.omdbapi.com/?i=tt3896198&apikey=c03f51dd&t=" + getTitle).then(
        (response) => {
            let resultJson = response.json();                                      
            return resultJson;
        }).then(
            (response) => {
                    let movie = response;                                  
                    console.log(movie)
                    let title = movie.Title;  
                    let image = movie.Poster;                                              
                    let rating = movie.imdbRating;                       
                    let description = movie.Plot;              
                    
                    let movieInfos = `<div class="movie-picture">
                                            <img src="${image}">
                                        </div>
                                        <div class="movie-infos">
                                            <div class="movie-heading">
                                                <div class="movie-name"><h1>${title}</h1></div>
                                                <div class="movie-rating">${rating}</div>
                                            </div>
                                            
                                            <p class="movie-description">${description}</p>
                                            <button onclick="goBack()" class="trailer">Go Back</button>
                                        </div>`;
                    let movieBox = document.querySelector('.movie-container');
                    movieBox.innerHTML += movieInfos;                                                             
            })
}


function selectedMovie(title) {    
        sessionStorage.setItem('title', title);

        window.location.pathname = "movie.html";                                                                    
}  

function goBack() {
    window.location.pathname = "index.html";                                                                    
}