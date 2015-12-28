
$(function() {
    var self = this;
    $.getScript("js/leaflet.js", function(){
    });
    //$.getScript("js/l.control.geosearch.js", function(){
    //});




    function markerDrag(e){
        alert("You dragged to: " + e.latlng);
    }

    function initialize() {
        // Initialize the map
        var map = L.map('map').setView([55.75, 37.61], 11);
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            maxZoom: 18
        }).addTo(map);

        // Event Handlers
        map.on('click', function(e){
            var marker = new L.Marker(e.latlng, {draggable:true});
            marker.bindPopup("<strong>"+e.latlng+"</strong>").addTo(map);

            marker.on('dragend', markerDrag);
        });
    }



    function add_points(value, name) {


            var routeObj = {};
            routeObj["type"] = value;
            routeObj["photos"] = "true";
            $.ajax({
                type: 'get',
                url: 'http://ec2-52-18-236-104.eu-west-1.compute.amazonaws.com/rona/api/entertainment/',
                data: routeObj,
                response: 'text',
                success: function (data) {
                    console.log('success');
                    console.log(data);
                    for (var i = 0; i < data.results.length; i++) {
                        var marker = new L.marker([data.results[i].latitude, data.results[i].longitude]);
                        title = {
                            'instagram_urls': data.results.instagram_urls,
                            'cost': data.results[i].cost,
                            'ent_type': data.results[i].ent_type,
                            'seats_count': data.results[i].seats_count,
                            'title': data.results[i].title,
                            'zone_title': data.results[i].zone_title
                        };
                        markers.addLayer(marker);


                        markers.on('clusterclick', function (a) {

                            var latLngBounds = a.layer.getBounds();
                            //console.log(latLngBounds);


                        });
                        var photo ='';
                        try {
                            for (var j = 0; j <= data.results[i].instagram_urls.length; j++) {
                                photo = photo + '<a target="_blank" href=' + data.results[i].instagram_urls[j]
                                    + '>' + "<img src='" + data.results[i].instagram_urls[j] + "'width = '60'/>" + '</a>';
                            }
                        }catch(e)
                        {

                        }

                        console.log(data.results[i].latitude);
                        console.log(data.results[i].longitude);

                        if (data.results[i].instagram_urls[0] !== null) {
                            var lat = data.results[i].latitude;
                            var lng = data.results[i].longitude;
                            var self = this;
                            console.log([lat, lng]);
                            marker.bindPopup('<b>' + 'Средняя стоимость: ' + '</b>' + data.results[i].cost + '<br>'
                                + '<b>' + 'Тип заведения: ' + '</b>' + data.results[i].ent_type + '<br>'
                                + '<b>' + 'Количество посадочных мест: ' + '</b>' + data.results[i].seats_count + '<br>'
                                + '<b>' + 'Название: ' + '</b>' + data.results[i].title + '<br>'
                                + '<b>' + 'Фото: ' + '</b>' + '<br>' + photo +
                                '<br>' + '<b>' + 'Район: ' + '</b>' + data.results[i].zone_title
                                + '<br>' + '<b>' + '<input id="here" type = "button" value="Сюда" onclick="pidor()" \>');
                        }else{
                            lat = data.results[i].latitude;
                            lng = data.results[i].longitude;
                            console.log([lat, lng]);
                            marker.bindPopup('<b>' + 'Средняя стоимость: ' + '</b>' + data.results[i].cost + '<br>'
                                + '<b>' + 'Тип заведения: ' + '</b>' + data.results[i].ent_type + '<br>'
                                + '<b>' + 'Количество посадочных мест: ' + '</b>' + data.results[i].seats_count + '<br>'
                                + '<b>' + 'Название: ' + '</b>' + data.results[i].title + '<br>'
                                + '<b>' + 'Район: ' + '</b>' + data.results[i].zone_title
                                + '<br>' + '<b>' + '<input id="here" type = "button" value="Сюда" onclick="pidor()""\>');
                        }
                        console.log(data.results[i]);
                        console.log(markers);

                    }
                    map.addLayer(markers);
                }
            });
            if(document.getElementById("Sonya_button").style.display == 'none') {
                document.getElementById("Sonya_button").style.display = 'block';
                document.getElementById(name).style.display = 'none';
            }

        }


    function delete_points(name) {
        map.removeLayer(markers);
        markers = new L.MarkerClusterGroup();
        try {
            document.getElementById('Nekit_button').style.display = 'block';
        }catch(e)
        {
        }
        try {
            document.getElementById('Vlad_button').style.display = 'block';
        }catch(e)
        {
        }try {
            document.getElementById('Dima_button').style.display = 'block';
        }catch(e)
        {
        }try {
            document.getElementById('Ksusha_button').style.display = 'block';
        }catch(e)
        {
        }
    }

    $ ('#Sonya_button').click(function() {

        delete_points();

    });

    $('#Nekit_button').click(function() {
        var bar_points = document.getElementById('Nekit_button').value;
        document.getElementById('Nekit_button').style.display = 'none';
        add_points(bar_points, name);

    });
    $('#Vlad_button').click(function(){
        var bar_points = document.getElementById('Vlad_button').value;
        document.getElementById('Vlad_button').style.display = 'none';
        add_points(bar_points, name);
    });
    $('#Dima_button').click(function(){
        var bar_points = document.getElementById('Dima_button').value;
        document.getElementById('Dima_button').style.display = 'none';
        add_points(bar_points, name);

    });
    $('#Ksusha_button').click(function(){
        var bar_points = document.getElementById('Ksusha_button').value;
        document.getElementById('Ksusha_button').style.display = 'none';
        add_points(bar_points, name);
    });


    //$('#map').click(onMapClick);
    //$('#map').ready(initialize());
}(jQuery));