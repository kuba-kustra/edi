$.getJSON('plan.json', function (data) {

    var table = document.createElement('table');
    var tr = document.createElement('tr');
    var tableHeaders = ['termin', 'godz', 'nauczyciel', 'przedmiot', 'sala', 'typ'];
    

    // create table headers
    for (let i=0; i<tableHeaders.length; i++){
        $(tr).append('<th>' + tableHeaders[i] + '</th>');
    }
    table.append(tr);

    // create table rows with data
    $.each(data, function (key, val) {
        var tr = document.createElement('tr');

        $(tr).append(
            '<td>' + val.termin + '</td>'
            + '<td>' + val['od-godz'] + ' - ' + val['do-godz'] + '</td>'
            + '<td>' + val.nauczyciel['#text'] + '</td>'
            + '<td class="subject" data-eng="' + val.eng + '" data-pol="' + val.przedmiot + '">' + val.przedmiot + '</td>'
            + '<td>' + val.sala + '</td>'
            + '<td>' + val.typ + '</td>'
        );

        if (val.kolokwium) {
            $(tr).addClass('red');
            table.append(tr);
            $(table).append('<tr class="kolokwium-info hidden"><td colspan="5">' + val.kolokwium + '</td></tr>');
        } else {
            table.append(tr);
        }
    });
    $('#plan').append(table);

    // show exam info only on mouse over
    $('.red').each(function () {
        $(this).hover(function () {
            $(this).next().removeClass('hidden').addClass('visible')
        }, function () {
            $(this).next().removeClass('visible').addClass('hidden')
        })
    });

    // change subject title language on mouse click
    $('td.subject').each(function () {
        $(this).click(function () {
            if ($(this).attr('data-language') === 'eng'){
                $(this).text($(this).attr('data-pol')).attr('data-language', 'pol');
            } else {
                $(this).text($(this).attr('data-eng')).attr('data-language', 'eng');
            }
        })
    })

});