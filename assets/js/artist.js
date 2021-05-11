const preQuery = async(method) => {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    let bearrer = await fetch("https://spotfiy-token.herokuapp.com/spotify/", requestOptions);

    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${bearrer}`);

    requestOptions = {
        method: method,
        headers: myHeaders,
        redirect: 'follow'
    };
    return requestOptions;
}


let globalData = [];

const filter = (search) => {

    const result = globalData.filter(album => album['name'].indexOf(search) !==
        -1);

    draw(result);
}


const draw = (albums) => {
    let albumsDiv = document.getElementById('albums');
    albumsDiv.innerHTML = '';



    if (window.location.href.includes('index')) {
        albums = albums.slice(0, 6);
    }
    albums.forEach(album => {

        let div = document.createElement('div');
        div.setAttribute('class', 'col');

        let a = document.createElement('a');
        a.setAttribute('href', '#tracks');

        let divCard = document.createElement('div');
        divCard.setAttribute('class', 'card h-100');

        let img = document.createElement('img');
        img.setAttribute('class', 'card-img-top');
        img.src = album['images'][0]['url'];

        let divBody = document.createElement('div');
        divBody.setAttribute('class', 'card-body');

        let h5title = document.createElement('h5');
        h5title.setAttribute('class', 'card-title');
        h5title.innerHTML = album['name'];

        let divFooter = document.createElement('div');
        divFooter.setAttribute('class', 'card-footer');


        let date = document.createElement('small');
        date.setAttribute('class', 'text-muted');
        date.innerHTML =
            album['release_date'];

        divBody.appendChild(h5title);
        divFooter.appendChild(date);

        divCard.appendChild(img);
        divCard.appendChild(divBody);
        divCard.appendChild(divFooter);
        a.appendChild(divCard);
        div.appendChild(a);
        div.addEventListener('click', () => {
            getTracks(album['id'], album['name']);
        });

        albumsDiv.appendChild(div);

    });
}
const getArtist = () => {

    const requestOptions = preQuery('GET');
    fetch("https://api.spotify.com/v1/artists/7jy3rLJdDQY21OgRLCZ9sD", requestOptions)
        .then(resp => resp.text())
        .catch(error => console.log('error', error));

}
const getAlbums = () => {
    const requestOptions = preQuery('GET');
    fetch("https://api.spotify.com/v1/artists/7jy3rLJdDQY21OgRLCZ9sD/albums", requestOptions)
        .then(resp => resp.text())
        .then(resp => {
            let dataJson = JSON.parse(resp);
            let albums = dataJson['items'];
            globalData = albums;
            return albums;
        })
        .then(resp => filter('', resp))
        .catch(error => console.log('error', error));
}
const drawTracks = (data, album) => {

    let tracks = document.getElementById('tracks');
    tracks.innerHTML = "";

    data.forEach((track) => {
        tracks.innerHTML += `
        <div>
        <h2>${album}</h2>
        <h3>${track['name']
    }</h3>    
    <audio controls> 
             <source src=${track['preview_url']} type="audio/mp3">
              Your browser does not support the audio element.      
       </audio>
       </div>`
    });
}

const getTracks = (id, name) => {

    const requestOptions = preQuery('GET');
    fetch(`https://api.spotify.com/v1/albums/${id}/tracks`, requestOptions)
        .then(resp => resp.text())
        .then(resp => {
            let dataJson = JSON.parse(resp);
            let albums = dataJson['items'];
            globalData = albums;
            return albums;
        })
        .then((resp) => { drawTracks(resp, name) })
        .catch(error => console.log('error', error));


}


if (window.location.href.includes('index')) {
    const moreAlbums = document.getElementById('moreAlbums');
    moreAlbums.addEventListener('click', () => {
        window.location.replace(window.location.href.replace('index.html', 'albums.html'));
    });
    getAlbums();
}
if (window.location.href.includes('albums')) {
    let searchInput = document.getElementById('search');
    searchInput.addEventListener('input', () => {
        filter(searchInput.value);
    });
    getAlbums();
}
if (window.location.href.includes('track')) {

}