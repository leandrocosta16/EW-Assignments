var map;
var directionsService;
var marker = [];
var polyLine = [];
var poly2 = [];
var startLocation = [];
var endLocation = [];
var timerHandle = [];
var infoWindow = null;

var startLoc = [];
var endLoc = [];

var lastVertex = 1;
var step = 0.4; // 5 | 50 = default; // metres / fast com zoom 14= 5
var eol = [];
var tickTimmer = 100;//100 default

var zoom = 19;//original vista afastada=14

window.initialize = initialize;
window.setRoutes = setRoutes;

//var crosswalksCoords = [[41.5372315696, -8.4352368110]];
var crosswalksCoords = [];
var crosswalksMarkers = [];

var status = '';

//Dummy temp vars for simulation only - not needed in real world scenario with pedestrian apps running
//var pedestresCoords = [[41.5372315696, -8.4952368110],];
var pedestresMarkers = [];

var pedestres = {};
var mail_count = 1;
var pedestre_running = false;

//Car
var lights = 'no-lights';
var lightsTimmer = 1;
var waitSeconds = 5;

// called on body load
function initialize() {

    // initialize infoWindow
    infoWindow = new google.maps.InfoWindow({
        size: new google.maps.Size(150, 50)
    });
    var options = {
        // max zoom. Default: 18 (alterei)
        zoom: zoom
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), options);
    //
    // initial location which loads up on map
    address = 'Braga'

    // Geocoder is used to encode or actually geocode textual addresses to lat long values
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address}, function (results, status) {
        map.fitBounds(results[0].geometry.viewport);
    });



        // Configure the click listener.
        map.addListener('click', function(mapsMouseEvent) {
          // Close the current InfoWindow.
          infoWindow.close();

          //pedestre = createMarker(new google.maps.LatLng(c[0],c[1]), "Pedestre", c, "pedestre");
          let mail = 'mei' + String(mail_count) + '@di.uminho.pt'
          mail_count++;
          pedestres[mail] = createMarker(new google.maps.LatLng(mapsMouseEvent.latLng.lat(), mapsMouseEvent.latLng.lng()), "Pedestre", c, "pedestre");
          pedestre_running = true;
          // Create a new InfoWindow.
          /*infoWindow = new google.maps.InfoWindow({position: mapsMouseEvent.latLng});
          infoWindow.setContent(mapsMouseEvent.latLng.toString());
          infoWindow.open(map);*/
        });
}

// returns the marker
function createMarker(latlng, label, html, type) {
    var contentString = '<b>' + label + '</b><br>' + html;
    // using Marker api, marker is created
    if(type=='car') {
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: label,
            icon: '../images/marker-car2.png',
            zIndex: 50
        });
    }
    else if (type=='crosswalk') {
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: label,
            icon: '../images/marker-crosswalk.png',
            zIndex: 10
        }); 
    }
    else if (type=='pedestre') {
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: label,
            icon: '../images/marker-pedestre.png',
            zIndex: 15
        }); 
    }
    else {
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: label,
            zIndex: 10
        });
    }
    marker.myname = label;
    // adding click listener to open up info window when marker is clicked
    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.setContent(contentString);
        infoWindow.open(map, marker);
    });
    return marker;
}

function toggleError(msg){
    document.getElementById('error-msg').innerText = msg;
}

// Using Directions Service find the route between the starting and ending points
function setRoutes() {
    $('#route-select').hide();
    $('#route-data').show();

    map && initialize();
    // empty out the error msg
    toggleError("");
    // set the values and check if any is empty, and if yes, show error and return
    var startVal = document.getElementById("start").value
    var endVal = document.getElementById("end").value;
    if (!startVal || !endVal){
        toggleError( "Please enter both start and end locations.");
        return;
    }
    // just to avoid weird case of same start and end location
    if (startVal === endVal){
        toggleError( "Please enter different locations in both inputs");
        return;
    }
    startLoc[0] = startVal;
    endLoc[0] = endVal;
    
    // empty out previous values
    startLocation = [];
    endLocation = [];
    polyLine = [];
    poly2 = [];
    timerHandle = [];

    var directionsDisplay = new Array();
    for (var i = 0; i < startLoc.length; i++) {
        var rendererOptions = {
            map: map,
            suppressMarkers: true,
            preserveViewport: true
        };
        directionsService = new google.maps.DirectionsService();
        var travelMode = google.maps.DirectionsTravelMode.DRIVING;
        var request = {
            origin: startLoc[i],
            destination: endLoc[i],
            travelMode: travelMode,
            language: 'pt-pt'
        };
        directionsService.route(request, makeRouteCallback(i, directionsDisplay[i]), rendererOptions);
    }

var mainTimmer = setInterval(updateTimmer, 1000);
}

// called after getting route from directions service, does all the heavylifting
function makeRouteCallback(routeNum, disp, rendererOptions) {
    // check if polyline and map exists, if yes, no need to do anything else, just start the animation
    if (polyLine[routeNum] && (polyLine[routeNum].getMap() != null)) {
        startAnimation(routeNum);
        return;
    }
    return function (response, status) {
        // if directions service successfully returns and no polylines exist already, then do the following
        if (status == google.maps.DirectionsStatus.ZERO_RESULTS){
            toggleError("No routes available for selected locations");
            return;
        }
        if (status == google.maps.DirectionsStatus.OK) {
            startLocation[routeNum] = new Object();
            endLocation[routeNum] = new Object();
            // set up polyline for current route
            polyLine[routeNum] = new google.maps.Polyline({
                path: [],
                strokeColor: '#FFFF00',
                strokeWeight: 5
            });
            poly2[routeNum] = new google.maps.Polyline({
                path: [],
                strokeColor: '#FFFF00',
                strokeWeight: 5
            });

            // For each route, display summary information.
            var legs = response.routes[0].legs;
            // directionsrenderer renders the directions obtained previously by the directions service
            disp = new google.maps.DirectionsRenderer(rendererOptions);
            disp.setMap(map);
            disp.setDirections(response);

            // create Markers
            let ccc = 0;
            for (c of crosswalksCoords) {
                crosswalksMarkers.push(createMarker(new google.maps.LatLng(c[0],c[1]), "Passadeira", c, "crosswalk"))
                /*if(ccc==0) {
                    pedestre = createMarker(new google.maps.LatLng(c[0],c[1]), "Pedestre", c, "pedestre");
                }
                ccc++;*/
                //pedestresMarkers.push(createMarker(new google.maps.LatLng(c[0],c[1]-0.003), "Pedestre", c, "pedestre"))
            }

            /*for (c of pedestresCoords) {
                pedestresMarkers.push(createMarker(new google.maps.LatLng(c[0],c[1]), "Pedestre", c, "pedestre"))
            }*/

            for (i = 0; i < legs.length; i++) {
                // for first marker only
                if (i == 0) {
                    startLocation[routeNum].latlng = legs[i].start_location;
                    startLocation[routeNum].address = legs[i].start_address;
                    marker[routeNum] = createMarker(legs[i].start_location, "start", legs[i].start_address, "car");
                }
                endLocation[routeNum].latlng = legs[i].end_location;
                endLocation[routeNum].address = legs[i].end_address;
                var steps = legs[i].steps;
                for (j = 0; j < steps.length; j++) {
                    var nextSegment = steps[j].path;
                    for (k = 0; k < nextSegment.length; k++) {
                        polyLine[routeNum].getPath().push(nextSegment[k]);
                    }
                }
            }
        }
        if (polyLine[routeNum]){
            // render the line to map
            polyLine[routeNum].setMap(map);
            // and start animation
            startAnimation(routeNum);
        }
    }
}

// Spawn a new polyLine every 20 vertices
function updatePoly(i, d) {
    if (poly2[i].getPath().getLength() > 20) {
        poly2[i] = new google.maps.Polyline([polyLine[i].getPath().getAt(lastVertex - 1)]);
    }

    if (polyLine[i].GetIndexAtDistance(d) < lastVertex + 2) {
        if (poly2[i].getPath().getLength() > 1) {
            poly2[i].getPath().removeAt(poly2[i].getPath().getLength() - 1)
        }
        poly2[i].getPath().insertAt(poly2[i].getPath().getLength(), polyLine[i].GetPointAtDistance(d));
    } else {
        poly2[i].getPath().insertAt(poly2[i].getPath().getLength(), endLocation[i].latlng);
    }
}

// updates marker position to make the animation and update the polyline
function animate(index, d, tick) {
    if (d > eol[index]) {
        marker[index].setPosition(endLocation[index].latlng);
        return;
    }
    var p = polyLine[index].GetPointAtDistance(d);

    //UPDATE STUFF
    //==CAR
    //$('#car-lat').text(p.lat().toFixed(7));
    //$('#car-long').text(p.lng().toFixed(7));
    //updateCar(p.lat().toFixed(7),p.lng().toFixed(7),'03-44-VP');
    //==PEDESTRE
    //if(pedestre_running==true) {
    //    updatePedestre();
    //}

    map.setCenter(new google.maps.LatLng(p.lat(), p.lng()));
    map.setZoom(zoom);

    marker[index].setPosition(p);
    updatePoly(index, d);
    timerHandle[index] = setTimeout("animate(" + index + "," + (d + step) + ")", tick || tickTimmer);
}

// start marker movement by updating marker position every 100 milliseconds i.e. tick value
function startAnimation(index) {
    if (timerHandle[index]) 
        clearTimeout(timerHandle[index]);
    eol[index] = polyLine[index].Distance();
    map.setCenter(polyLine[index].getPath().getAt(0));

    poly2[index] = new google.maps.Polyline({
        path: [polyLine[index].getPath().getAt(0)],
        strokeColor: "#FFFF00",
        strokeWeight: 5
    });
    timerHandle[index] = setTimeout("animate(" + index + ",50)", 2000);  // Allow time for the initial map display
}


//AXIOS COM OS MICRO-SERVICES
function start() {
    getCrosswalks();
}

//AXIOS COM OS MICRO-SERVICES
function getCrosswalks() {
axios({
  method: 'GET',
  url: 'http://localhost:8042/api/passadeiras',
  headers: {}, 
  //data: {latitude: 12.760287, longitude: -90.323763, matricula: '03-44-VP'}
})
.then(dados => {
    for (p of dados.data) {
        crosswalksCoords.push([p.latitude, p.longitude])
    } 
    initialize();
})
/*.then(function (response) {
    alert(5)
    for (p of data) {
        alert(p)
        crosswalks.push([p.latitude, p.longitude])
    } 
})*/
.catch(function (error) {
    alert(erro)
});

}


function updateCar(lat,long,matri) {
$('#car-lat').text(lat);
$('#car-long').text(long);

axios({
  method: 'POST',
  url: 'http://127.0.0.1:8888/api/carMove',
  headers: {}, 
  data: {latitude: lat, longitude: long, matricula: matri}
  //data: {latitude: 12.760287, longitude: -90.323763, matricula: '03-44-VP'}
  //data: {latitude: 40.760287, longitude: -30.323763, matricula: '03-44-VP'}
})
/*.then(dados => {*/
.then(function (response) {
    console.log(response.data)
    $('#noteficationStatus').text(response.data.note);
        if(response.data.note == 'STOP: Crosswalk with pedestrians') {
            $('#noteficationStatus').removeClass();
            $('#noteficationStatus').addClass('safe-red');
        }
        else if (response.data.note == 'CARE: Crosswalk close, but no pedestrians') {
            $('#noteficationStatus').removeClass();
            $('#noteficationStatus').addClass('safe-orange');
        }
        else {
            $('#noteficationStatus').removeClass();
            $('#noteficationStatus').addClass('safe-green');
        }

        console.log('-----')
        console.log(response.data.light)
        //LIGHTS
        if(response.data.light != undefined) {
            if(lights=='no-light') {
                lights = response.data.light;
                var lightsTimmer = setInterval(updateLights, 1000);;
            }
        }
        else {
            //If out of crosswalk reset lights
            clearInterval(lightsTimmer);
            lights='no-light';
        }

        if(lights == 'green') {
            $('#trafficLight').removeClass();
            $('#trafficLight').addClass('green-light');

            $('#carLight').text('Green');
            $('#carLight').removeClass();
            $('#carLight').addClass('safe-green');
        }
        else if(lights == 'red') {
            $('#trafficLight').removeClass();
            $('#trafficLight').addClass('red-light');

            $('#carLight').text('Red');
            $('#carLight').removeClass();
            $('#carLight').addClass('safe-red');
        }
        else if(lights == 'orange') {
            $('#trafficLight').removeClass();
            $('#trafficLight').addClass('orange-light');

            $('#carLight').text('Orange');
            $('#carLight').removeClass();
            $('#carLight').addClass('safe-orange');
        }
        else {
            $('#trafficLight').removeClass();
            $('#trafficLight').addClass('no-light');

            $('#carLight').text('None');
            $('#carLight').removeClass();
        }

    //alert('Carro moveu-se')
    console.log('updated car')
    console.log(lights)
    console.log(response.data.light)
})
.catch(function (error) {
    console.log(error)
});
}


function updateLights() {
    if(lights == 'red') {
        if(lightsTimmer == waitSeconds) {
            lights = 'orange';
            lightsTimmer=1;
        }
    }
    else if(lights == 'green') {
        if(lightsTimmer == waitSeconds) {
            lights = 'red';
            lightsTimmer=1;
        }
    }
    else if(lights == 'orange') {
        if(lightsTimmer == 2) {
            lights = 'green';
            lightsTimmer=1;
        }
    }
    lightsTimmer++;
}



function updatePedestre(lat,long,mail,active) {
if(active==true) {
    $('#pedestre-lat').text(lat);
    $('#pedestre-long').text(long);
}

axios({
  method: 'POST',
  url: 'http://127.0.0.1:8888/api/pedestreMove',
  headers: {}, 
  data: {latitude: lat, longitude: long, email: mail}
})
/*.then(dados => {*/
.then(function (response) {
    if(active==true) {
        $('#pedestreNotification').text(response.data.note);
        if(response.data.note == 'Crosswalk with cars') {
            $('#pedestreNotification').removeClass();
            $('#pedestreNotification').addClass('safe-red');
        }
        else if (response.data.note == 'Crosswalk close but no cars') {
            $('#pedestreNotification').removeClass();
            $('#pedestreNotification').addClass('safe-orange');
        }
        else {
            $('#pedestreNotification').removeClass();
            $('#pedestreNotification').addClass('safe-green');
        }
        console.log(mail + ' updated');
    }
    else {
        console.log(mail + ' updated');
    }
})
.catch(function (error) {
    console.log(erro)
});

//animatePedestre(lat, long);

}



function updateTimmer() {
    //Car
    let lat = marker[0].getPosition().lat().toFixed(7);
    let long = marker[0].getPosition().lng().toFixed(7);
    updateCar(lat,long,'03-44-VP');

    //PEDESTRE
    if(pedestre_running==true) {
        let last_lat = undefined;
        let last_long = undefined;
        let last_key = Object.keys(pedestres).pop()
        for(var key in pedestres) {
            let lat = pedestres[key].getPosition().lat().toFixed(7);
            let long = pedestres[key].getPosition().lng().toFixed(7);
            last_lat = lat;
            last_long = long;
            let mail = key;
            if(key==last_key) {
                updatePedestre(lat,long,mail,true);
            }
            else {
                updatePedestre(lat,long,mail,false);
            }
        }
        //updateSmarthphone();
    }
}

/*function updateSmarthphone(lat,long){
$('#pedestre-lat').text(lat);
$('#pedestre-long').text(long);
}*/

var anim_pedestre = setInterval(animatePedestres, 100);

function animatePedestres() {
if(pedestre_running==true) {
    for(var key in pedestres) {
        let lat = pedestres[key].getPosition().lat().toFixed(7);
        let long = pedestres[key].getPosition().lng().toFixed(7);

        let new_lat = parseFloat(lat)+0.000001;
        let new_lng = parseFloat(long)-0.000001;

        pedestres[key].setPosition(new google.maps.LatLng(new_lat, new_lng));
    }

 /*   let lat = pedestre.getPosition().lat().toFixed(7);
    let long = pedestre.getPosition().lng().toFixed(7);

    let new_lat = parseFloat(lat)+0.000001;
    let new_lng = parseFloat(long)-0.000001;

    pedestre.setPosition(new google.maps.LatLng(new_lat, new_lng));*/

}

/*          // assign new route
          marker.position = marker.destination;
          marker.destination = newDestination;*/
}