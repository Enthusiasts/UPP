
$(function() {
    var self = this;
    const api_root = "http://ec2-52-18-236-104.eu-west-1.compute.amazonaws.com/rona/api";

    /*$.getScript("js/leaflet.js", function(){
    });*/
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

    self.get_marker_icon = function (num) {
        if (num === null) num = 0;
        return L.icon({
            iconUrl: api_root + '/static/img/marker/' + num + '.png',
            iconSize: [40, 40],
            iconAnchor: [22, 40],
            popupAnchor: [-3, -40]
        });
    };

    //Cluster type is 0 - 10
    //Stat is inner text
    //Size_type is 3, 5
    self.get_cluster_icon = function(cluster_type, stat, size_type) {
        if (cluster_type === null) cluster_type = 0;
        if (stat === null) stat = "";
        if (size_type === null || !$.inArray(size_type, [3,5])) size_type = 3;
        const size = size_type * 10;
        return L.divIcon({
            //iconUrl: api_root + '/static/img/cluster/' + num + '.png',
            html:   "<img src=\"" + api_root + "/static/img/cluster/" + cluster_type +".png\"/> " +
                    "<div>" + stat + "</div>",
            className: "rona-cluster rona-cluster-" + size_type,
            iconSize: [size, size],
            iconAnchor: [22, size],
            popupAnchor: [-3, -size]
        });
    };

    self.createRonaMarkerClusterGroup = function() {
        return new L.MarkerClusterGroup({
            iconCreateFunction: function(cluster) {
                var childs = cluster.getAllChildMarkers();
                var childs_clusters_sum = childs
                    .map(function(marker) {
                        return marker.model.cluster_type;
                    })
                    .reduce(function(a,b) {
                        return a + b;
                    });
                const size_type = childs.length < 100 ? 3 : 5;
                return get_cluster_icon(Math.floor(childs_clusters_sum/childs.length), childs.length, size_type);
            }
        });
    }

    function add_points(value, name) {


            var routeObj = {};
            routeObj["type"] = value;
            //routeObj["photos"] = "true";
            routeObj["cluster"] = "checkins";
            $.ajax({
                type: 'get',
                url: api_root + '/entertainment/',
                data: routeObj,
                response: 'text',
                success: function (data) {
                    console.log('success');
                    //console.log(data);
                    for (var i = 0; i < data.results.length; i++) {
                        var marker = new L.marker([data.results[i].latitude, data.results[i].longitude],
                            {
                                icon: get_marker_icon(data.results[i].cluster_type)
                            });
                        marker.model = {
                            'instagram_urls': data.results.instagram_urls,
                            'cost': data.results[i].cost,
                            'ent_type': data.results[i].ent_type,
                            'seats_count': data.results[i].seats_count,
                            'title': data.results[i].title,
                            'zone_title': data.results[i].zone_title,
                            'cluster_type': data.results[i].cluster_type
                        };
                        markers.addLayer(marker);


                        markers.on('clusterclick', function (a) {

                            var latLngBounds = a.layer.getBounds();
                            //console.log(latLngBounds);


                        });
                        var photo ='';
                        try {
                            for (var j = 0; j < data.results[i].instagram_urls.length; j++) {
                                photo = photo + '<a target="_blank" href=' + data.results[i].instagram_urls[j]
                                    + '>' + "<img src='" + data.results[i].instagram_urls[j] + "'width = '60'/>" + '</a>';
                            }
                        }catch(e)
                        {

                        }

                        //console.log(data.results[i].latitude);
                        //console.log(data.results[i].longitude);

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
                            );//+ '<br>' + '<b>' + '<input id="here" type = "button" value="Сюда" onclick="pidor()" \>');
                        }else{
                            lat = data.results[i].latitude;
                            lng = data.results[i].longitude;
                            console.log([lat, lng]);
                            marker.bindPopup('<b>' + 'Средняя стоимость: ' + '</b>' + data.results[i].cost + '<br>'
                                + '<b>' + 'Тип заведения: ' + '</b>' + data.results[i].ent_type + '<br>'
                                + '<b>' + 'Количество посадочных мест: ' + '</b>' + data.results[i].seats_count + '<br>'
                                + '<b>' + 'Название: ' + '</b>' + data.results[i].title + '<br>'
                                + '<b>' + 'Район: ' + '</b>' + data.results[i].zone_title
                            );//+ '<br>' + '<b>' + '<input id="here" type = "button" value="Сюда" onclick="pidor()""\>');
                        }
                        //console.log(data.results[i]);
                        //console.log(markers);

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
        markers = createRonaMarkerClusterGroup();
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