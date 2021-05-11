const preQuery = (method) => {
    let myHeaders = new Headers();
<<<<<<< HEAD
    myHeaders.append("Authorization", "Bearer BQDH4T2RcPTOV4RRv062Dhqzt85qAoOiP9jP3bXe2MqhmZdke21Axxpp16pQzVefT9PcmIEYPSDgNOPtLYI");
=======
    myHeaders.append("Authorization", "Bearer BQCFLMojMjCqXWfcfDt9WFVTnrXprmxl6Pq2CxNgwYDpauxi6RyvqChrfb3T8kHSMZo-SkOLH9RQitI3t5w");
>>>>>>> crisfon6

    let requestOptions = {
        method: method,
        headers: myHeaders,
        redirect: 'follow'
    };
    return requestOptions;
}

<<<<<<< HEAD
    console.log(albums)

    albums.slice(0, 6).forEach(album => {
=======
let globalData = [];

const filter = (search) => {

    const result = globalData.filter(album => album['name'].indexOf(search) !==
        -1);
    console.log(result);
    draw(result);
}


const draw = (albums) => {
    let albumsDiv = document.getElementById('albums');
    albumsDiv.innerHTML = '';
    console.log(albums);
    let tracksPage = window.location.href.replace('albums.html', 'tracks.html');
    console.log(tracksPage);
    if (window.location.href.includes('index')) {
        albums = albums.slice(0, 6);
    }
    albums.forEach(album => {
>>>>>>> crisfon6
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
        .then(console.log)
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
    console.log('DRAWTRACKS', data);
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
    // window.location.replace(window.location.href.replace('albums.html', 'tracks.html'));
    console.log('tracks');
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