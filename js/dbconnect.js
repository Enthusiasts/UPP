$(function() {

    $.getScript("js/leaflet.js", function(){

    });

    var nekit = false;
    var vlad = false;
    var dima = false;
    var ksusha = false;

    $ ('#Sonya_button').click(function() {
        document.getElementsByClassName("leaflet-marker-pane").innerHTML = '';
        //var map = L.map('map').setView([55.75, 37.61], 11);
        //L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        //    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        //}).addTo(map);
    }),
    $('#Nekit_button').click(function() {
        if (nekit == false) {
            nekit = true;
            var routeObj = {};
            routeObj["type"] = 'bar';
            $.ajax({
                type: 'get',//тип запроса: get,post либо head
                url: 'http://ec2-52-18-236-104.eu-west-1.compute.amazonaws.com/rona/api/entertainment/',//url адрес файла обработчика
                data: routeObj,//параметры запроса
                response: 'text',//тип возвращаемого ответа text либо xml
                success: function (data) {//возвращаемый результат от сервера
                    console.log('success');
                    for (var i = 0; i < data.results.length; i++) {
                        var marker = new L.marker([data.results[i].latitude, data.results[i].longitude]);
                        title = {
                            'cost': data.results[i].cost,
                            'ent_type': data.results[i].ent_type,
                            'seats_count': data.results[i].seats_count,
                            'title': data.results[i].title,
                            'zone_title': data.results[i].zone_title
                        };
                        markers.addLayer(marker);
                        map.addLayer(markers);
                        marker.bindPopup('<b>' + 'Средняя стоимость: ' + '</b>' + data.results[i].cost + '<br>'
                            + '<b>' + 'Тип заведения: ' + '</b>' + data.results[i].ent_type + '<br>'
                            + '<b>' + 'Количество посадочных мест: ' + '</b>' + data.results[i].seats_count + '<br>'
                            + '<b>' + 'Название: ' + '</b>' + data.results[i].title + '<br>'
                            + '<b>' + 'Район: ' + '</b>' + data.results[i].zone_title);
                        console.log(data.results[i]);
                        console.log(markers);

                    }
                }
            });
            if(document.getElementById("Sonya_button").style.display == 'none') {
                document.getElementById("Sonya_button").style.display = 'block';
            }
        }
        else{
            alert("Бары уже добавлены на карту");
        }
    });
    $('#Vlad_button').click(function()
    {   if (vlad == false) {
        vlad = true;
        var routeObj = {};
        routeObj["type"] = 'cafe';
        $.ajax({
            type: 'get',//тип запроса: get,post либо head
            url: 'http://ec2-52-18-236-104.eu-west-1.compute.amazonaws.com/rona/api/entertainment/',//url адрес файла обработчика
            data: routeObj,//параметры запроса
            response: 'text',//тип возвращаемого ответа text либо xml
            success: function (data) {//возвращаемый результат от сервера
                console.log('success');
                for (var i = 0; i < data.results.length; i++) {
                    var marker = new L.marker([data.results[i].latitude, data.results[i].longitude]);
                    title = {
                        'cost': data.results[i].cost,
                        'ent_type': data.results[i].ent_type,
                        'seats_count': data.results[i].seats_count,
                        'title': data.results[i].title,
                        'zone_title': data.results[i].zone_title
                    };
                    markers.addLayer(marker);
                    map.addLayer(markers);
                    marker.bindPopup('<b>' + 'Средняя стоимость: ' + '</b>' + data.results[i].cost + '<br>'
                        + '<b>' + 'Тип заведения: ' + '</b>' + data.results[i].ent_type + '<br>'
                        + '<b>' + 'Количество посадочных мест: ' + '</b>' + data.results[i].seats_count + '<br>'
                        + '<b>' + 'Название: ' + '</b>' + data.results[i].title + '<br>'
                        + '<b>' + 'Район: ' + '</b>' + data.results[i].zone_title);
                    console.log(data.results[i]);
                    console.log(markers);

                }
            }
        });
        if(document.getElementById("Sonya_button").style.display == 'none') {
            document.getElementById("Sonya_button").style.display = 'block';
        }
    }else{
        alert("Кафе уже добавлены на карту");
    }
    });
    $('#Dima_button').click(function()
    {   if(dima == false) {
        dima = true;
            var routeObj = {};
            routeObj["type"] = 'cookery';
            $.ajax({
                type: 'get',//тип запроса: get,post либо head
                url: 'http://ec2-52-18-236-104.eu-west-1.compute.amazonaws.com/rona/api/entertainment/',//url адрес файла обработчика
                data: routeObj,//параметры запроса
                response: 'text',//тип возвращаемого ответа text либо xml
                success: function (data) {//возвращаемый результат от сервера
                    console.log('success');

                    for (var i = 0; i < data.results.length; i++) {
                        var marker = new L.marker([data.results[i].latitude, data.results[i].longitude]);
                        title = {
                            'cost': data.results[i].cost,
                            'ent_type': data.results[i].ent_type,
                            'seats_count': data.results[i].seats_count,
                            'title': data.results[i].title,
                            'zone_title': data.results[i].zone_title
                        };
                        markers.addLayer(marker);
                        map.addLayer(markers);
                        marker.bindPopup('<b>' + 'Средняя стоимость: ' + '</b>' + data.results[i].cost + '<br>'
                            + '<b>' + 'Тип заведения: ' + '</b>' + data.results[i].ent_type + '<br>'
                            + '<b>' + 'Количество посадочных мест: ' + '</b>' + data.results[i].seats_count + '<br>'
                            + '<b>' + 'Название: ' + '</b>' + data.results[i].title + '<br>'
                            + '<b>' + 'Район: ' + '</b>' + data.results[i].zone_title);
                        console.log(data.results[i]);
                        console.log(markers);
                    }
                }
            });
        if(document.getElementById("Sonya_button").style.display == 'none') {
            document.getElementById("Sonya_button").style.display = 'block';
        }
        }
        else{
            alert('Кулинарные магазины уже добавлены на карту');
        }
    });
    $('#Ksusha_button').click(function()
    {
        if(ksusha == false) {
            ksusha = true;
            var routeObj = {};
            routeObj["type"] = 'eatery';
            $.ajax({
                type: 'get',//тип запроса: get,post либо head
                url: 'http://ec2-52-18-236-104.eu-west-1.compute.amazonaws.com/rona/api/entertainment/',//url адрес файла обработчика
                data: routeObj,//параметры запроса
                response: 'text',//тип возвращаемого ответа text либо xml
                success: function (data) {//возвращаемый результат от сервера
                    console.log('success');
                    for (var i = 0; i < data.results.length; i++) {
                        var marker = new L.marker([data.results[i].latitude, data.results[i].longitude]);
                        title = {
                            'cost': data.results[i].cost,
                            'ent_type': data.results[i].ent_type,
                            'seats_count': data.results[i].seats_count,
                            'title': data.results[i].title,
                            'zone_title': data.results[i].zone_title
                        };
                        markers.addLayer(marker);
                        map.addLayer(markers);
                        marker.bindPopup('<b>' + 'Средняя стоимость: ' + '</b>' + data.results[i].cost + '<br>'
                            + '<b>' + 'Тип заведения: ' + '</b>' + data.results[i].ent_type + '<br>'
                            + '<b>' + 'Количество посадочных мест: ' + '</b>' + data.results[i].seats_count + '<br>'
                            + '<b>' + 'Название: ' + '</b>' + data.results[i].title + '<br>'
                            + '<b>' + 'Район: ' + '</b>' + data.results[i].zone_title);
                        console.log(data.results[i]);
                        console.log(markers);
                    }

                }
            });
            if(document.getElementById("Sonya_button").style.display == 'none') {
                document.getElementById("Sonya_button").style.display = 'block';
            }
        }
        else
        {
            alert('Закусочные уже добавлены');
        }
    });
}(jQuery));