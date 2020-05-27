$(document).ready(function () {
    init();
    document.querySelector('body').addEventListener('chatItemCreated', function (e) {
        init()
    }, false);
});

var url = 'https://9b30c1f4.ngrok.io/carbonfay_grade/script2.php';

function init() {
    var dateBron;
    function getWeekDay(date) {
        date = date || new Date();
        var days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        var day = date.getDay();

        return days[day];
    }
    var daysBlock = getDaysBlock();

    Date.prototype.daysInMonth = function () {
        return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
    };

    function Calendar2(id, year, month) {
        var Dlast = new Date(year, month + 1, 0).getDate(),
            D = new Date(year, month, Dlast),
            DNlast = new Date(D.getFullYear(), D.getMonth(), Dlast).getDay(),
            DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay(),
            calendar = '<tr>',
            month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
        if (DNfirst != 0) {
            for (var i = 1; i < DNfirst; i++) calendar += '<td>';
        } else {
            for (var i = 0; i < 6; i++) calendar += '<td>';
        }
        for (var i = 1; i <= Dlast; i++) {
            if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
                calendar += '<td class="today ' + i + '">' + i;
            } else {
                calendar += '<td class="' + i + '">' + i;
            }
            if (new Date(D.getFullYear(), D.getMonth(), i).getDay() == 0) {
                calendar += '<tr>';
            }
        }
        for (var i = DNlast; i < 7; i++) calendar += '<td>&nbsp;';
        document.querySelector('#' + id + ' tbody').innerHTML = calendar;
        document.querySelector('#' + id + ' thead td:nth-child(2)').innerHTML = month[D.getMonth()] + ' ' + D.getFullYear();
        document.querySelector('#' + id + ' thead td:nth-child(2)').dataset.month = D.getMonth();
        document.querySelector('#' + id + ' thead td:nth-child(2)').dataset.year = D.getFullYear();
        if (document.querySelectorAll('#' + id + ' tbody tr').length < 6) {
            // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
            document.querySelector('#' + id + ' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
        }

        var arr = $('tbody').children().children();

        testDisplayButton(arr, daysBlock); // Делаем визуально некликабельными ненужные дни
    }
    Calendar2("calendar2", new Date().getFullYear(), new Date().getMonth());
// переключатель минус месяц
    document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(1)').onclick = function () {
        Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month) - 1);
    };
// переключатель плюс месяц
    document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(3)').onclick = function () {
        Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month) + 1);
    };

    $('tbody').on('mouseover', function (event) {
        // при наведении на некликабельные кнопки некликабельный курсор
        var date = new Date(),
            daysMonth = date.daysInMonth(),
            month = $('.test')[0].getAttribute('data-month');

        // if(event.target.style.color == 'rgba(0,0,0,.26)') {
        //     event.target.style.cursor = 'default'
        // }

        if (daysBlock.indexOf(getWeekDay(new Date(2020, month, event.target.className))) != -1) {
            event.target.style.cursor = 'default';
        }

        if (event.target.className == null || event.target.tagName != 'TD' || month != date.getMonth() && month != date.getMonth() + 1) {
            event.target.style.cursor = 'default';
        }

        if (daysMonth - date.getDate() < 14) {
            if (month == date.getMonth() && event.target.className < date.getDate()) event.target.style.cursor = 'default';
            if (month == date.getMonth() + 1 && (event.target.className >= 14 - (daysMonth - date.getDate()) || event.target.className == '')) event.target.style.cursor = 'default';
        } else {
            if (event.target.className < date.getDate() || event.target.className >= date.getDate() + 14 || month == date.getMonth() + 1) event.target.style.cursor = 'default';
        }
    });


    function testDisplayButton(arr, daysBlock) {
        // Визуально делает кнопки некликабельными
        var date = new Date(),
            daysMonth = date.daysInMonth();
        for (var i = 0; i < arr.length; i++) {
            // arr[i].style.backgroundColor = 'rgb(189, 189, 189)'
            var className = arr[i].getAttribute('class'),
                month = $('.test')[0].getAttribute('data-month');

            if (className != null && className != '' && daysBlock.indexOf(getWeekDay(new Date(2020, month, className))) != -1) {
                arr[i].style.color = 'rgba(0,0,0,.26)';
            }

            if ($('.test')[0].getAttribute('data-month') != date.getMonth() && $('.test')[0].getAttribute('data-month') != date.getMonth() + 1) {
                arr[i].style.color = 'rgba(0,0,0,.26)';
            }

            if (daysMonth - date.getDate() < 14) {
                // Проверка, сколько осталось до конца этого месяца, если меньше 14 дней, то нужно сделать активными кнопки в след месяце
                if ($('.test')[0].getAttribute('data-month') == date.getMonth() && className < date.getDate()) {
                    arr[i].style.color = 'rgba(0,0,0,.26)'; // Делаем неактивными даты в этом месяце
                } else if ($('.test')[0].getAttribute('data-month') == date.getMonth() + 1 && className >= 14 - (daysMonth - date.getDate()) && className != null) {
                    arr[i].style.color = 'rgba(0,0,0,.26)'; // Делаем неактивными даты в след. месяце
                }
            } else {
                if ($('.test')[0].getAttribute('data-month') != date.getMonth() || className < date.getDate() || className >= date.getDate() + 14) {
                    arr[i].style.color = 'rgba(0,0,0,.26)'; // Если до конца месяца больше 14 дней, то делаем кликабельными только 14 дней этого месяца
                }
            }

            // if(getWeekDay(className) == 'Воскресенье')
            //     arr[i].style.color = 'rgba(0,0,0,.26)'
        }
    }

// todo сделать, чтоб бралась инфа с БД и если день заполнен, то он рисовался как запрещенный для выбора

// alert(new Date().daysInMonth())

    function getDaysBlock() {
        var daysBlock = [];
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            async: false,
            data: {
                action: 'getBlockDay'
            },
            success: function success(data) {
                console.dir(data);
                var dataJSON = data;
                console.log(typeof data);
                dataJSON.forEach(function (item) {
                    switch (item.name) {
                        case 'monIsWeekend':
                            daysBlock.push('Понедельник');
                            break;
                        case 'tuesIsWeekend':
                            daysBlock.push('Вторник');
                            break;
                        case 'wedIsWeekend':
                            daysBlock.push('Среда');
                            break;
                        case 'thursIsWeekend':
                            daysBlock.push('Четверг');
                            break;
                        case 'friIsWeekend':
                            daysBlock.push('Пятница');
                            break;
                        case 'satIsWeekend':
                            daysBlock.push('Суббота');
                            break;
                        case 'sunIsWeekend':
                            daysBlock.push('Воскресенье');
                            break;
                    }
                });
            },
            error: function error(data) {
                console.log('error');
                console.dir(data);
            }
        });

        return daysBlock;
    }

// $.ajax({
//     type: 'POST',
//     contentType: 'application/json; charset=utf-8',
//     dataType: 'json',
//     url: 'какой-то url',
//     crossDomain: true,
//     data: JSON.stringify($.extend($('#data').serializeJSON(), $(form).serializeJSON())),
//     timeout: 5000,
//     success: function(data, textStatus) {},
//     error: function(data, textStatus) {}
// })



// $('.dataInfo')[0].style.display = 'none';
    'use strict';

    $('.infoAboutDay')[0].style.display = 'none';

    $(document).on('click', 'tbody', function (event) {
        // работает только на кликабельных кнопках, при нажатии будет отправка на сервер даты и отрисовка модалки с данными, пришедшими с сервера
        // console.log(event)
        var date = new Date(),
            daysMonth = date.daysInMonth(),
            month = $('.test')[0].getAttribute('data-month');

        if (event.target.style.cursor == 'default') {
            return;
        }

        dateBron = event.target.className + '.' + month + '.' + $('.test')[0].getAttribute('data-year');
        console.log(dateBron);
        //посылаем запрос на бек и получаем брони на этот день.

        // showInformation(dateBron)

        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            async: true,
            data: {
                action: 'getInfoAboutBron',
                date: dateBron
            },
            success: function success(data) {
                console.dir(data);
                if (data.length) {
                    $('.infoList').empty();
                    data.forEach(function (item) {
                        showInformationAboutBronOnAdmin(item);
                    });
                } else {
                    $('.infoList').textContent = 'Броней на этот день нет.';
                }

                // $('.sendInfo')[0].style.display = ''
                // $('.sendInfo')[0].textContent = 'Наш менеджер свяжется с Вами в ближайшее время для подтверждения брони'
            },
            error: function error() {
                console.error("Huyna");
            }
        });

        month = Number(month) + 1;

        var dateBron1 = event.target.className + '.' + '0' + month + '.' + $('.test')[0].getAttribute('data-year');
        $('.calendar')[0].style.display = 'none';
        $('.infoAboutDay')[0].style.display = '';
        $('.dateInformationSpan')[0].textContent = '' + dateBron1;
        // $('.listBronData')[0].textContent = 'Список броней на ' + dateBron
    });

    $(document).on('click', '.nazad', function() {
        $('.infoAboutDay')[0].style.display = 'none';
        $('.calendar')[0].style.display = '';
    })

// todo сделать удаление из БД при удалении брони (и отправка на почту клиенту)

    $(document).on('click', '.buttonSettingsSave', function () {
        var obj = {
            mon: {
                start: 'monStart' + '&' + $('.start', $('.mon'))[0].value,
                end: 'monEnd' + '&' + $('.end', $('.mon'))[0].value,
                isWeekend: 'monIsWeekend' + '&' + $('.check', $('.mon'))[0].checked
            },
            tues: {
                start: 'tuesStart' + '&' + $('.start', $('.tues'))[0].value,
                end: 'tuesEnd' + '&' + $('.end', $('.tues'))[0].value,
                isWeekend: 'tuesIsWeekend' + '&' + $('.check', $('.tues'))[0].checked
            },
            wed: {
                start: 'wedStart' + '&' + $('.start', $('.wed'))[0].value,
                end: 'wedEnd' + '&' + $('.end', $('.wed'))[0].value,
                isWeekend: 'wedIsWeekend' + '&' + $('.check', $('.wed'))[0].checked
            },
            thurs: {
                start: 'thursStart' + '&' + $('.start', $('.thurs'))[0].value,
                end: 'thursEnd' + '&' + $('.end', $('.thurs'))[0].value,
                isWeekend: 'thursIsWeekend' + '&' + $('.check', $('.thurs'))[0].checked
            },
            fri: {
                start: 'friStart' + '&' + $('.start', $('.fri'))[0].value,
                end: 'friEnd' + '&' + $('.end', $('.fri'))[0].value,
                isWeekend: 'friIsWeekend' + '&' + $('.check', $('.fri'))[0].checked
            },
            sat: {
                start: 'satStart' + '&' + $('.start', $('.sat'))[0].value,
                end: 'satEnd' + '&' + $('.end', $('.sat'))[0].value,
                isWeekend: 'satIsWeekend' + '&' + $('.check', $('.sat'))[0].checked
            },
            sun: {
                start: 'sunStart' + '&' + $('.start', $('.sun'))[0].value,
                end: 'sunEnd' + '&' + $('.end', $('.sun'))[0].value,
                isWeekend: 'sunIsWeekend' + '&' + $('.check', $('.sun'))[0].checked
            }
        };
        // console.log($('.mon')[0].getElementsByClassName('check')[0].checked)
        console.log('начало')
        console.dir(obj);
        console.log('конец')
        // todo сделать проверку вводимых данных
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            async: true,
            data: {
                action: 'sendSettings',
                data: obj,
                email: $('.emailInput').value
            },
            success: function success(data) {
                console.dir(data);
                alert('Настройки сохранены');
                $('#staticBackdrop').modal('hide');
                // $('.sendInfo')[0].style.display = ''
                // $('.sendInfo')[0].textContent = 'Наш менеджер свяжется с Вами в ближайшее время для подтверждения брони'
            },
            error: function error(error) {
                console.error("хуйня: " + error)
            }
        });
    });

// $('.btn-group').on('click', (event) => { // Нажатие на день недели в настройках графика
//     $('.btn-group')[0].style.display = 'none'
// })

    $('.infoList').on('click', '.deleteForm', function (event) {
        console.dir(event.target.id);
        console.log(1);
        var time = event.target.id;
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            async: true,
            data: {
                action: 'deleteBron',
                date: dateBron,
                time: time.replace('p', ':')
            },
            success: function success(data) {
                console.log(time);
                console.log(data);
                $('.' + 'time' + time)[0].remove();
                // $('.sendInfo')[0].style.display = ''
                // $('.sendInfo')[0].textContent = 'Наш менеджер свяжется с Вами в ближайшее время для подтверждения брони'
            },
            error: function error(data) {
                console.error("Не сработал")
                console.dir(data)
            }
        });
    });

    function showInformationAboutBronOnAdmin(item) {
        $('.infoList').innerHTML = '';
        var div = document.createElement('div');
        div.className = 'list-group dataInfo ' + 'time' + item.time.replace(':', 'p');
        div.innerHTML = '                  <p class=\'listBronData\'></p>\n                        <div class="list-group-item container-fluid">\n                            <div class="row justify-content-between">\n                                <div class="col-sm-2 timeBroni">' + item.time + '</div>\n                                <div class="col-sm-6 nameBroni">\n                                    ' + item.name + '<br>\n                                    ' + item.email + '<br>\n                                    ' + item.phoneNumber + '\n                                </div>\n                                <div class="col-sm-2">\n                                    <input class="btn btn-danger deleteForm" id="' + item.time.replace(':', 'p') + '"type="button" value="Удалить">\n                                </div>\n                            </div>\n                        </div>';
        $('.infoList').append(div);
    }

}