$(document).ready(function () {
    // type_holder
    // <div><label><input type="checkbox" class="types" value="mosque" />Mosque</label></div>

    var types = ['amusement_park', 'aquarium', 'art_gallery', 'cafe', 'campground',
        'casino', 'church', 'funeral_home', 'hindu_temple', 'library', 'lodging', 'mosque',
        'movie_theater', 'museum', 'night_club', 'park', 'restaurant', 'shopping_mall', 'stadium',
        'store', 'synagogue', 'university', 'zoo'];
    var html = '';

    $.each(types, function (index, value) {
        var name = value.replace(/_|'/g, " ");
        html += '<div><label><input type="checkbox" class="types" value="' + value + '" />' + capitalizeFirstLetter(name) + '</label></div>';
    });

    $('#type_holder').html(html);
});
$(document).ready(function () {

    $('.types').click(function () {
        $('.types').not(this).prop('checked', false);
    });

});


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var map;
var infowindow;
var autocomplete;
var countryRestrict = {'country': 'in'};
var selectedTypes = [];

var londonWentmisterLatitude = 51.494720;
var londonWentmisterLongitude = -0.135278;

function initialize() {

    var pyrmont = new google.maps.LatLng(londonWentmisterLatitude, londonWentmisterLongitude);

    map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 15
    });
}

function renderMap() {
    // Get the user defined values

    var address = "London";
    var radius = 3000;

    // get the selected type
    selectedTypes = [];

    $('.types').each(function () {
        if ($(this).is(':checked')) {
            selectedTypes.push($(this).val());
        }
    });

    var geocoder = new google.maps.Geocoder();
    var selLocLat = 0;
    var selLocLng = 0;


    geocoder.geocode({'address': address}, function (results, status) {
        if (status === 'OK') {
            //selLocLat = results[0].geometry.location.lat();
            //selLocLng = results[0].geometry.location.lng();
            // koordinat verilen yer

            //selLocLat   = currentLatitude;
            //selLocLng   = currentLongitude;

            //var pyrmont = new google.maps.LatLng(52.5666644, 4.7333304);

            selLocLat = londonWentmisterLatitude;
            selLocLng = londonWentmisterLongitude;
            var pyrmont = new google.maps.LatLng(selLocLat, selLocLng);


            map = new google.maps.Map(document.getElementById('map'), {
                center: pyrmont,
                zoom: 15
            });
            //Pin location
            var marker = new google.maps.Marker({
                position: pyrmont,
                map: map,
                title: "Your Location"
            });
            marker.setMap(map);

            //console.log(selectedTypes);

            var request = {
                location: pyrmont,
                //radius: 5000,
                //types: ["atm"]
                radius: radius,
                types: selectedTypes
            };

            infowindow = new google.maps.InfoWindow();

            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, callback);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i], results[i].icon);
        }
    }
}

function createMarker(place, icon) {
    var placeLoc = place.geometry.location;

    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: {
            url: icon,
            scaledSize: new google.maps.Size(20, 20) // pixels
        },
        animation: google.maps.Animation.DROP
    });

    google.maps.event.addListener(marker, 'click', function () {

        let name = place.name;

        infowindow.setContent(name + '<br>' + place.vicinity
            + "<div id='placeInfo'>No Wikipedia Information About Place</div> ");

        getWikiData(name);

        infowindow.open(map, this);
    });
}

// getting place name from wikipedia
function getWikiData(keyword) {
    debugger;
    $.ajax({
        url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + keyword + "&prop=info&inprop=url&utf8=&format=json",
        dataType: "jsonp",
        success: function (wikiResponse) {
            if (wikiResponse === "") {
                $('#placeInfo').append(" There is no Wikipedia Info")
            } else {
                // get wiki's searched name result
                let nameResponse = wikiResponse.query.search[0].title;

                // arrange result for adding wikipedia page url
                let targetUrl = "https://en.wikipedia.org/wiki/" + nameResponse.replace(/\s/g, "_").replace(/'/g, "%27");

                $('#placeInfo').html('').append("<a href=\"#\" onClick=\"MyWindow=window.open('" + targetUrl + "','MyWindow','width=800,height=800'); return false;\">" +
                    " Place Information </a> ")
            }

        },
        error: function () {
            alert('Error retrieving the desired results');

        }
    });

}


// browser'dan current location alma

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

var currentLatitude = 0;
var currentLongitude = 0;

function showPosition(position) {
    currentLatitude = position.coords.latitude;
    currentLongitude = position.coords.longitude;
}

getLocation();

module.exports = {
    capitalizeFirstLetter
}
