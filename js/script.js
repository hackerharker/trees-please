// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com

mapboxgl.accessToken = 'pk.eyJ1IjoibGluaHBoYWFhbSIsImEiOiJja2Y4c2Z5N3kwOThuMnRtaHczZ3dnbWFmIn0.8ABZB_jFyTWSj7hd_6Gj5w';

var geojson = {
    'type': 'FeatureCollection',
    'features': []
};

var startAddress = [37.754740, -122.424460];

d3.csv("../Trees_Lat_Long.csv").then(function(data) {
    var counter = 1;
    data.forEach(function(d) {
        d.latitude = +d.latitude;
        d.longitude = +d.longitude;
        feature = {};
        feature['type'] = 'Feature'
        feature['properties'] = {
            'name': d.Tree,
            'iconSize': [30, 30]
        },
        feature['geometry'] = {
            'type': 'Point',
            'coordinates': [d.longitude, d.latitude]
        }
        geojson['features'].push(feature)
        counter++;
        })
    // console.log(data[0]);
    // console.log(geojson);
    geojson.features.forEach(function (marker) {
        // create a DOM element for the marker
        var el = document.createElement('div');
        el.className = 'marker';

        var tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        el.appendChild(tooltip);

        var tooltiptext = document.createElement('span');
        tooltiptext.className = 'tooltiptext';
        tooltip.appendChild(tooltiptext);

        tooltiptext.innerHTML = marker.properties.name;
        
        el.style.width = marker.properties.iconSize[0] + 'px';
        el.style.height = marker.properties.iconSize[1] + 'px';
    
        // el.addEventListener('click', function () {
        //     window.alert(marker.properties.message);
        //     });
    
        new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);
    
    });
});


var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-122.3837697, 37.7441324],
    zoom: 12
    });

map.addControl(
new MapboxDirections({
accessToken: mapboxgl.accessToken
}),
'top-left'
);

map.addControl(
new mapboxgl.GeolocateControl({
positionOptions: {
enableHighAccuracy: true
},
trackUserLocation: true
})
);