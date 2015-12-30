
$(function() {
    var self = this;
    const api_root = "http://ec2-52-18-236-104.eu-west-1.compute.amazonaws.com/rona/api";

    /*$.getScript("js/leaflet.js", function(){
    });*/
    //$.getScript("js/l.control.geosearch.js", function(){
    //});

    self.initialize = function() {
        //Global state (crunch?)
        self.global = {
            "cluster": {
                "label": "checkins"
            },
            "ent_types": []
        };

        // Initialize the map
        self.map = L.map('map').setView([55.75, 37.61], 11);
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            maxZoom: 18
        }).addTo(map);

        //Init clusters
        self.markers = createRonaMarkerClusterGroup();

        //Init user position
        self.userLocationControl = L.control.locate({
            position: 'topleft',
            layer: new L.LayerGroup(),
            drawCircle: true,
            follow: true,
            setView: true,
            keepCurrentZoomLevel: true,
            stopFollowingOnDrag: false,
            remainActive: false,
            markerClass: L.circleMarker,
            circleStyle: {
                opacity: 0.2
            },
            markerStyle: {},
            followCircleStyle: {
                opacity: 0.5
            },
            followMarkerStyle: {},
            icon: 'fa fa-bolt',
            iconLoading: 'fa fa-spinner fa-spin',
            circlePadding: [0, 0],
            metric: true,
            onLocationError: function(err) {alert(err.message)},
            onLocationOutsideMapBounds:  function(context) {
                alert(context.options.strings.outsideMapBoundsMsg);
            },
            showPopup: true,
            strings: {
                title: "Покажи меня",
                metersUnit: "метров",
                feetUnit: "шагов",
                popup: "{distance} {unit} от этой точки",
                outsideMapBoundsMsg: "Кажется, вы зашли за край карты."
            },
            locateOptions: {}
        });

        userLocationControl.addTo(map);

        self.routeControl = L.Routing.control({
            position: 'topright',
            layer: new L.LayerGroup(),
            setView: true,
            waypoints: [],
            routeWhileDragging: true,
            geocoder: L.Control.Geocoder.nominatim()
        });
        //routeControl.addTo(map);
        routeControl.on('routingerror', function() {
            alert("hm");
        });

        $ ('#Sonya_button').click(function() {

            delete_points();

        });

        $('#Nekit_button').click(function() {
            var bar_points = document.getElementById('Nekit_button').value;
            document.getElementById('Nekit_button').style.display = 'none';
            add_points(bar_points, name);
            if (self.global.ent_types == "undefined") self.global.ent_types = [bar_points];
            self.global.ent_types.push(bar_points);
            //alert(bar_points)

        });
        $('#Vlad_button').click(function(){
            var bar_points = document.getElementById('Vlad_button').value;
            document.getElementById('Vlad_button').style.display = 'none';
            add_points(bar_points, name);
            if (self.global.ent_types == "undefined") self.global.ent_types = [bar_points];
            self.global.ent_types.push(bar_points);
        });
        $('#Dima_button').click(function(){
            var bar_points = document.getElementById('Dima_button').value;
            document.getElementById('Dima_button').style.display = 'none';
            add_points(bar_points, name);
            if (self.global.ent_types == "undefined") self.global.ent_types = [bar_points];
            self.global.ent_types.push(bar_points);

        });
        $('#Ksusha_button').click(function(){
            var bar_points = document.getElementById('Ksusha_button').value;
            document.getElementById('Ksusha_button').style.display = 'none';
            add_points(bar_points, name);

            if (self.global.ent_types == "undefined") self.global.ent_types = [bar_points];
            self.global.ent_types.push(bar_points);
        });

        $('#change_cluster_checkins').click(function(){
            self.global.cluster.label = document.getElementById('change_cluster_checkins').value;
            //document.getElementById('change_cluster_checkins').style.display = 'none';

            map.removeLayer(markers);
            markers = createRonaMarkerClusterGroup();
            //alert(self.global.cluster.label);
            //alert(self.global.ent_types.length);
            for (var i = 0; i < self.global.ent_types.length; i++)
            {
                add_points(self.global.ent_types[i], "");
            }

        });

        $('#change_cluster_none').click(function(){
            self.global.cluster.label = document.getElementById('change_cluster_none').value;
            //document.getElementById('change_cluster_none').style.display = 'none';

            map.removeLayer(markers);
            markers = new L.markerClusterGroup();

            //alert(self.global.cluster.label);
            //alert(self.global.ent_types.length);
            for (var i = 0; i < self.global.ent_types.length; i++)
            {
                add_points(self.global.ent_types[i], "");
            }

        });
    };

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
        return L.markerClusterGroup({
            chunkedLoading: true,
            iconCreateFunction: function(cluster) {
                var childs = cluster.getAllChildMarkers();
                const childs_clusters_sum = childs
                    .map(function(marker) {
                        return marker.model.cluster_type;
                    })
                    .reduce(function(a,b) {
                        return a + b;
                    });

                const childs_checkins_sum = childs
                    .map(function(marker) {
                        return marker.model.checkins_num;
                    })
                    .reduce(function(a,b) {
                        return a + b;
                    });


                const size_type = childs_checkins_sum < 100 ? 3 : 5;
                return get_cluster_icon(Math.floor(childs_clusters_sum/childs.length), childs_checkins_sum, size_type);
            }
        });
    };

    self.add_points = function(value, name) {


            var routeObj = {};
            routeObj["type"] = value;
            //routeObj["photos"] = "true";
            routeObj["cluster"] = self.global["cluster"]["label"];
            $.ajax({
                type: 'get',
                url: api_root + '/entertainment/',
                data: routeObj,
                response: 'text',
                success: function (data) {
                    console.log('success');
                    //console.log(data);
                    for (var i = 0; i < data.results.length; i++) {
                        var marker;
                        if (global.cluster.label == "checkins"){
                            marker = new L.marker([data.results[i].latitude, data.results[i].longitude],
                            {
                                icon: get_marker_icon(data.results[i].cluster_type)
                            });
                        } else {
                            marker = new L.marker([data.results[i].latitude, data.results[i].longitude]);
                        }

                        marker.model = {
                            'instagram_urls': data.results.instagram_urls,
                            'cost': data.results[i].cost,
                            'ent_type': data.results[i].ent_type,
                            'seats_count': data.results[i].seats_count,
                            'title': data.results[i].title,
                            'zone_title': data.results[i].zone_title,
                            'cluster_type': data.results[i].cluster_type == null ? 0 : data.results[i].cluster_type,
                            'checkins_num': data.results[i].checkins_num
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
                            //console.log([lat, lng]);
                            marker.bindPopup('<b>' + 'Средняя стоимость: ' + '</b>' + data.results[i].cost + '<br>'
                                + '<b>' + 'Тип заведения: ' + '</b>' + data.results[i].ent_type + '<br>'
                                + '<b>' + 'Количество посадочных мест: ' + '</b>' + data.results[i].seats_count + '<br>'
                                + '<b>' + 'Название: ' + '</b>' + data.results[i].title + '<br>'
                                + '<b>' + 'Найдено фото:' + '</b>' + data.results[i].checkins_num +'<br/>'
                                + '<b>' + 'Фото: ' + '</b>' + '<br>' + photo +
                                '<br>' + '<b>' + 'Район: ' + '</b>' + data.results[i].zone_title
                                + '<br>' + '<b>'); //+
                                //'<input id="here" type = "button" value="Сюда" onclick="createPath('+ lat + ',' + lng + ')" \>');
                                /* Мы же html генерим, поэтому вставляем точечки хардкорно.
                                 * Единственная альтернатива - давать каждой кнопек айди и ловить через джейквери.*/
                        }else{
                            lat = data.results[i].latitude;
                            lng = data.results[i].longitude;
                            //console.log([lat, lng]);
                            marker.bindPopup('<b>' + 'Средняя стоимость: ' + '</b>' + data.results[i].cost + '<br>'
                                + '<b>' + 'Тип заведения: ' + '</b>' + data.results[i].ent_type + '<br>'
                                + '<b>' + 'Количество посадочных мест: ' + '</b>' + data.results[i].seats_count + '<br>'
                                + '<b>' + 'Название: ' + '</b>' + data.results[i].title + '<br>'
                                + '<b>' + 'Район: ' + '</b>' + data.results[i].zone_title
                                + '<br>' + '<b>');//+
                                //'<input id="here" type = "button" value="Сюда" onclick="createPath('+ lat + ',' + lng + ')" \>');
                        }
                        //console.log(data.results[i]);
                        //console.log(markers);

                    }
                    map.addLayer(markers);
                    //updateLegend();
                }
            });
            if(document.getElementById("Sonya_button").style.display == 'none') {
                document.getElementById("Sonya_button").style.display = 'block';
                document.getElementById(name).style.display = 'none';
            }

        };


    function delete_points(name) {
        map.removeLayer(markers);

        if (self.global.cluster.label == "checkins") markers = createRonaMarkerClusterGroup();
        else markers = new L.markerClusterGroup();


        //alert(self.global.ent_types.length);
        self.global.ent_types = [];
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

    self.createPath = function(lat_to, lon_to){
        console.log("Catched to: " + lat_to + " " + lon_to);
        var loc = map.locate()
            .on('locationfound', function(from){
                console.log("Catched from: " + from.latitude + " " + from.longitude);
                self.routeControl.waypoints = [
                    L.latLng({lon: lon_to, lat: lat_to}),
                    L.latLng({lon: from.longitude, lat: from.latitude})
                ];
            })
            .on('locationerror', function(){
                console.log("Error during geolocation occured.")
            })
    };
    //$('#map').click(onMapClick);
    //$('#map').ready(initialize());

    self.updateLegend = function()
    {
        var params = {
            "label": self.global.cluster.label
        };

        if (params.label==="none"){
            document.getElementById("legend").style.display = 'none';
        } else {
            $.ajax({
                type: 'get',
                url: api_root + '/entertainment/clusterinfo/',
                data: params,
                //response: 'text',
                success: function (data){
                    //alert(data.length);
                    for (var i = 0; i < data.length; i++) {
                        //alert(i + " " + data.results[i].cluster_type);
                        jQuery(
                            "<div class='leaflet-marker-icon rona-cluster rona-cluster-3 leaflet-zoom-animated leaflet-clickable' " +
                                "tabindex='0' " +
                                "style='margin-left: -22px; margin-top: -30px; width: 30px; height: 30px; transform: translate3d(464px, 145px, 0px); z-index: 145;'/>" +
                                "<img src=\"" + api_root + "/static/img/cluster/" + data.results[i].cluster_type + ".png\"/>" +
                                "<div>"+ data.results[i].cluster_mean_rounded + "</div>" +
                            "</div>"
                        ).appendTo("#legend-content")
                    }

                    document.getElementById("legend").style.display = 'block';
                }
            });
        }
    }
}(jQuery));