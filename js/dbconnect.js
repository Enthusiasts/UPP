$(function() {

    $.getScript("js/leaflet.js", function(){

    });


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
                        map.addLayer(markers);
                        if (data.results[i].instagram_urls[0] !== null) {
                            marker.bindPopup('<b>' + 'Средняя стоимость: ' + '</b>' + data.results[i].cost + '<br>'
                                + '<b>' + 'Тип заведения: ' + '</b>' + data.results[i].ent_type + '<br>'
                                + '<b>' + 'Количество посадочных мест: ' + '</b>' + data.results[i].seats_count + '<br>'
                                + '<b>' + 'Название: ' + '</b>' + data.results[i].title + '<br>'
                                + '<b>' + 'Фото: ' + '</b>' + '<br>' + "<img src='" + data.results[i].instagram_urls[0]
                                + "'width = '60'/>" + '<br>'
                                + '<b>' + 'Район: ' + '</b>' + data.results[i].zone_title);
                        }else{
                            marker.bindPopup('<b>' + 'Средняя стоимость: ' + '</b>' + data.results[i].cost + '<br>'
                                + '<b>' + 'Тип заведения: ' + '</b>' + data.results[i].ent_type + '<br>'
                                + '<b>' + 'Количество посадочных мест: ' + '</b>' + data.results[i].seats_count + '<br>'
                                + '<b>' + 'Название: ' + '</b>' + data.results[i].title + '<br>'
                                + '<b>' + 'Район: ' + '</b>' + data.results[i].zone_title);
                        }
                        console.log(data.results[i]);
                        console.log(markers);

                    }
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
}(jQuery));