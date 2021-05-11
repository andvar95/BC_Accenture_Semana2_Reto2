const preQuery = (method) => {

    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer BQDH4T2RcPTOV4RRv062Dhqzt85qAoOiP9jP3bXe2MqhmZdke21Axxpp16pQzVefT9PcmIEYPSDgNOPtLYI");

    let requestOptions = {
        method: method,
        headers: myHeaders,
        redirect: 'follow'
    };
    return requestOptions;
}
const draw = (data) => {
    let albumsDiv = document.getElementById('albums');
    let dataJson = JSON.parse(data);
    const albums = dataJson['items'];

    console.log(albums)

    albums.slice(0, 6).forEach(album => {
        let div = document.createElement('div');
        div.setAttribute('class', 'col');

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

        div.appendChild(divCard);
        albumsDiv.appendChild(div);

    });
}
const getArtist = () => {

    const requestOptions = preQuery('GET');
    fetch("https://api.spotify.com/v1/artists/7jy3rLJdDQY21OgRLCZ9sD", requestOptions)
        .then(draw)
        .catch(error => console.log('error', error));

}
const getAlbums = () => {
    const requestOptions = preQuery('GET');
    fetch("https://api.spotify.com/v1/artists/7jy3rLJdDQY21OgRLCZ9sD/albums", requestOptions)
        // .then(response => response.text())
        .then(resp => resp.text())
        .then(draw)
        .catch(error => console.log('error', error));
}

// getArtist();

getAlbums();