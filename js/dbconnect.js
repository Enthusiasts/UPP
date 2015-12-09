$(function() {

    $.getScript("js/leaflet.js", "js/leaflet.js", function(){

    });



    $('#Nekit_button').click(function()
    {
        var routeObj = {};
        routeObj["type"] = 'bar';
        $.ajax({
            type: 'get',//тип запроса: get,post либо head
            url: 'http://127.0.0.1:5000/entertainment/',//url адрес файла обработчика
            data: routeObj,//параметры запроса
            response: 'text',//тип возвращаемого ответа text либо xml
            success: function (data) {//возвращаемый результат от сервера
                console.log('success');
                for (var i = 0; i < data.results.length; i++){
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
                        + '<b>' + 'Тип заведения: ' + '</b>' +  data.results[i].ent_type + '<br>'
                        + '<b>' + 'Количество посадочных мест: ' + '</b>' +  data.results[i].seats_count  + '<br>'
                        +  '<b>' + 'Название: ' + '</b>' + data.results[i].title + '<br>'
                        + '<b>' + 'Район: ' + '</b>' +  data.results[i].zone_title );
                    console.log(data.results[i]);
                    console.log(markers);
                    //var marker = new L.marker([data.results[i].latitude, data.results[i].longitude]).addTo(map);
                    //marker.bindPopup(data.results[i].cost + '<br>'
                    //    +  data.results[i].ent_type + '<br>'
                    //    + data.results[i].seats_count  + '<br>'
                    //    +  data.results[i].title + '<br>'
                    //    +  data.results[i].zone_title );
                }
            }
        });
    });
    $('#Vlad_button').click(function()
    {
        var routeObj = {};
        routeObj["type"] = 'cafe';
        $.ajax({
            type: 'get',//тип запроса: get,post либо head
            url: 'http://127.0.0.1:5000/entertainment/',//url адрес файла обработчика
            data: routeObj,//параметры запроса
            response: 'text',//тип возвращаемого ответа text либо xml
            success: function (data) {//возвращаемый результат от сервера
                console.log('success');
                for (var i = 0; i < data.results.length; i++){
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
                        + '<b>' + 'Тип заведения: ' + '</b>' +  data.results[i].ent_type + '<br>'
                        + '<b>' + 'Количество посадочных мест: ' + '</b>' +  data.results[i].seats_count  + '<br>'
                        +  '<b>' + 'Название: ' + '</b>' + data.results[i].title + '<br>'
                        + '<b>' + 'Район: ' + '</b>' +  data.results[i].zone_title );
                    console.log(data.results[i]);
                    console.log(markers);

                }
            }

        });
    });
    $('#Dima_button').click(function()
    {
        var routeObj = {};
        routeObj["type"] = 'cookery';
        $.ajax({
            type: 'get',//тип запроса: get,post либо head
            url: 'http://127.0.0.1:5000/entertainment/',//url адрес файла обработчика
            data: routeObj,//параметры запроса
            response: 'text',//тип возвращаемого ответа text либо xml
            success: function (data) {//возвращаемый результат от сервера
                console.log('success');

                for (var i = 0; i < data.results.length; i++){
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
                        + '<b>' + 'Тип заведения: ' + '</b>' +  data.results[i].ent_type + '<br>'
                        + '<b>' + 'Количество посадочных мест: ' + '</b>' +  data.results[i].seats_count  + '<br>'
                        +  '<b>' + 'Название: ' + '</b>' + data.results[i].title + '<br>'
                        + '<b>' + 'Район: ' + '</b>' +  data.results[i].zone_title );
                    console.log(data.results[i]);
                    console.log(markers);
                }
            }
        });
    });
    $('#Ksusha_button').click(function()
    {
        var routeObj = {};
        routeObj["type"] = 'eatery';
        $.ajax({
            type: 'get',//тип запроса: get,post либо head
            url: 'http://127.0.0.1:5000/entertainment/',//url адрес файла обработчика
            data: routeObj,//параметры запроса
            response: 'text',//тип возвращаемого ответа text либо xml
            success: function (data) {//возвращаемый результат от сервера
                console.log('success');
               for (var i = 0; i < data.results.length; i++){
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
                       + '<b>' + 'Тип заведения: ' + '</b>' +  data.results[i].ent_type + '<br>'
                       + '<b>' + 'Количество посадочных мест: ' + '</b>' +  data.results[i].seats_count  + '<br>'
                       +  '<b>' + 'Название: ' + '</b>' + data.results[i].title + '<br>'
                       + '<b>' + 'Район: ' + '</b>' +  data.results[i].zone_title );
                   console.log(data.results[i]);
                   console.log(markers);
                    }

            }
        });
    });
}(jQuery));