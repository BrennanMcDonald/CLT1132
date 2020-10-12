window.onload = function() {
    fetch("data.json")
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("listingContainer");
            data.forEach(el => {
                var div = document.createElement('div');
                let htmlString = `<div class="listing" data-zoom="${el.latlng.zoom}" data-lng="${el.latlng.lng}" data-lat="${el.latlng.lat}">
                    <div class='img'>
                        <img src="${el.image}">
                    </div>
                    <div class='content'>
                        <h1>${el.name}</h1>
                        <h2>${el.address}</h2>
                        <p>${el.description}</p>
                    </div>
                </div>
                `;
                div.innerHTML = htmlString.trim();
                div.addEventListener('click', (e) => {
                    var current = e.target;
                    console.log(!('lat' in current.dataset));
                    while (!('lat' in current.dataset)) {
                        console.log(current)
                        current = current.parentElement;
                    }
                    console.log([
                        parseFloat(current.dataset['lng']),
                        parseFloat(current.dataset['lat']),
                    ]);
                    map.flyTo({
                        center: [
                            parseFloat(current.dataset['lng']),
                            parseFloat(current.dataset['lat']),
                        ],
                        zoom: parseFloat(current.dataset['zoom']),
                        essential: true // this animation is considered essential with respect to prefers-reduced-motion
                    });
                });
                container.append(div);
            });
        }).catch(err => {
            console.error(err);
        })
}