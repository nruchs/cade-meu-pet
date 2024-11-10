function initMap() {
    const mapElement = document.getElementById("map");
    const location = mapElement.getAttribute("data-location");
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address: location }, (results, status) => {
        if (status === "OK" && results[0]) {
            const map = new google.maps.Map(mapElement, {
                zoom: 14,
                center: results[0].geometry.location,
            });

            // Marcador tradicional
            new google.maps.Marker({
                position: results[0].geometry.location,
                map: map,
                title: location,
            });
        } else {
            console.error("Geocode não funcionou: " + status);
            mapElement.innerText = "Localização não disponível";
        }
    });
}

window.initMap = initMap;

