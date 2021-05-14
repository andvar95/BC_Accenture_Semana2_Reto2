let globalData = [];

const getToken = async() => {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    let resp = await fetch("https://spotfiy-token.herokuapp.com/spotify/", requestOptions);
    let bearrer = await resp.text();
    bearrer = JSON.parse(bearrer)['access_token'];
    localStorage.setItem('Bearrer', bearrer)
}

const preQuery = async(method) => {


    let myHeaders = new Headers();
    const bearrer = localStorage.getItem('Bearrer')
    myHeaders.append("Authorization", `Bearer ${bearrer}`);

    requestOptions = {
        method: method,
        headers: myHeaders,
        redirect: 'follow'
    };
    return requestOptions;
}



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

const getArtist = () => {

    const requestOptions = preQuery('GET');
    fetch("https://api.spotify.com/v1/artists/7jy3rLJdDQY21OgRLCZ9sD", requestOptions)
        .then(resp => resp.text())
        .catch(async(error) => {
            await getToken();
            getArtist();
        });

}
const getAlbums = async() => {
    const requestOptions = await preQuery('GET');
    const resp = await fetch("https://api.spotify.com/v1/artists/7jy3rLJdDQY21OgRLCZ9sD/albums", requestOptions);
    if (resp.status == 401) {
        await getToken();
        getAlbums();
    }

    let data = await resp.text();
    data = JSON.parse(data);

    const albums = data['items'];
    globalData = albums;
    filter('', );
}
const getTracks = async(id, name) => {
    const requestOptions = await preQuery('GET');

    const resp = await fetch(`https://api.spotify.com/v1/albums/${id}/tracks`, requestOptions);
    if (resp.status == 401) {
        await getToken();
        getTracks();
    }
    let data = await resp.text();
    data = JSON.parse(data);
    const tracks = data['items'];
    globalData = albums;
    drawTracks(tracks, name);

}



console.log(window.location.href)


if (window.location.href.includes('index') || window.location.href === 'https://andvar95.github.io/BC_Accenture_Semana2_Reto2/') {
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