$(document).ready(function () {
    init();
    document.querySelector('body').addEventListener('chatItemCreated', function (e) {
        init()
    }, false);
});

var url = 'https://190f385e.ngrok.io/carbonfay_grade/script2.php';

function init() {
    console.log(21)


    var id = $('.identifier').text()

    switch(id) {
        case 'homepage':
            homepage();
            break;
        case 'changeTime':
            changeTime();
            break;
        case 'form':
            form();
            break;
    }


}


function homepage() {
    $('.sendRequest')[0].style.display = 'none';
    $('.sendAgain')[0].style.display = 'none';
    var flagAgainRequest = false;

    console.log($('.blockDay').html());

    var str = $('.blockDay').html().split('&gt;').join('').split('[').join('').split(']').join('').split('=').join(':');

    var value = JSON.parse('[' + str + ']');


    console.log(typeof (value));
    console.log(value);
    var daysBlock = getDaysBlock(value);

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
        console.log(month[D.getMonth()] + ' ' + D.getFullYear());
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

    $(document).on('mouseover', 'tbody', function (event) {
        // при наведении на некликабельные кнопки некликабельный курсор
        var date = new Date(),
            daysMonth = date.daysInMonth(),
            month = $('.test')[0].getAttribute('data-month');

        // if(event.target.style.color == 'rgba(0,0,0,.26)') {
        //     event.target.style.cursor = 'default'
        // }
        console.log(event);

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

    var dateBron;

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

    function getDaysBlock(data) {
        var daysBlock = [];
        console.log('success')
        console.dir(data)
        console.log(data);
        data.forEach(function (item) {
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

        return daysBlock;
    }

    $(document).on('click', 'tbody', function (event) {
        // работает только на кликабельных кнопках, при нажатии будет отправка на сервер даты и отрисовка модалки с данными, пришедшими с сервера
        // console.log(event)
        var date = new Date(),
            daysMonth = date.daysInMonth(),
            month = $('.test')[0].getAttribute('data-month');

        if (event.target.style.cursor == 'default') {
            return;
        }

        if(/today/.test(event.target.className)) {
            dateBron = event.target.className.replace('today ', '') + '.' + month + '.' + $('.test')[0].getAttribute('data-year');
        } else {
            dateBron = event.target.className + '.' + month + '.' + $('.test')[0].getAttribute('data-year');
        }

        $('#inputForm').val(dateBron);
        $('#buttonForm').click();
        $('.formDateBron').remove();
    })

}

function changeTime() {
    console.log('asdasd')
    var flagAgainRequest = false;
    $('.sendRequest')[0].style.display = 'none';
    $('.sendAgain')[0].style.display = 'none';

    var str = $('.getTimeInfo').html().split('&gt;').join('').split('[').join('').split(']').join('').split('=').join(':');

    console.log(str)
    var data = JSON.parse('[' + str + ']');

    // timeInfo = JSON.stringify(data.responseText);

    console.dir('Информация с сервера о занятом времени - ' + data);

    if (flagAgainRequest == true) {
        $('.changeTime')[0].innerHTML = '';
    }

    var className = $('.className').text().slice(0,2);
    var month = $('.className').text().slice(3,5);
    console.log(month);

    showFreeTime(data, className, month);


    function showFreeTime(arrTime, className, month) {
        var str = $('.getCustomField').html().split('&gt;').join('').split('[').join('').split(']').join('').split('=').join(':');

        var data = JSON.parse('[' + str + ']');
        var info = undefined;
        // console.dir(data.responseJSON); //todo сделать потом проверку на то, что берем с БД, сейчас просто тупо используем массив из БД.
        // info = data.responseJSON;
        var start = undefined,
            end = undefined;
        // $('.sendInfo')[0].style.display = ''
        // $('.sendInfo')[0].textContent = 'Наш менеджер свяжется с Вами в ближайшее время для подтверждения брони'
        switch (getWeekDay(new Date(2020, month, className))) {
            case 'Понедельник':
                //todo сделать обработчик под каждый день недели согласно переменным из БД (таблица custom_field)
                //код
                end = Number(data[1].value.slice(0, data[1].value.indexOf(':')));
                start = Number(data[0].value.slice(0, data[0].value.indexOf(':')));
                for (var i = 0; i < end - start; i++) {
                    var time = start + i + ':00';
                    if (arrTime.indexOf(time) == -1) {
                        showResult(time);
                    }
                }
                break;
            case 'Вторник':
                //код
                end = Number(data[4].value.slice(0, data[4].value.indexOf(':')));
                start = Number(data[3].value.slice(0, data[3].value.indexOf(':')));
                for (var i = 0; i < end - start; i++) {
                    var time = start + i + ':00';
                    if (arrTime.indexOf(time) == -1) {
                        showResult(time);
                    }
                }
                break;
            case 'Среда':
                //код
                end = Number(data[7].value.slice(0, data[7].value.indexOf(':')));
                start = Number(data[6].value.slice(0, data[6].value.indexOf(':')));
                for (var i = 0; i < end - start; i++) {
                    var time = start + i + ':00';
                    if (arrTime.indexOf(time) == -1) {
                        showResult(time);
                    }
                }
                break;
            case 'Четверг':
                //код
                end = Number(data[10].value.slice(0, data[10].value.indexOf(':')));
                start = Number(data[9].value.slice(0, data[9].value.indexOf(':')));
                for (var i = 0; i < end - start; i++) {
                    var time = start + i + ':00';
                    if (arrTime.indexOf(time) == -1) {
                        showResult(time);
                    }
                }
                break;
            case 'Пятница':
                //код
                end = Number(data[13].value.slice(0, data[13].value.indexOf(':')));
                start = Number(data[12].value.slice(0, data[12].value.indexOf(':')));
                for (var i = 0; i < end - start; i++) {
                    var time = start + i + ':00';
                    if (arrTime.indexOf(time) == -1) {
                        showResult(time);
                    }
                }
                break;
            case 'Суббота':
                //код
                end = Number(data[16].value.slice(0, data[16].value.indexOf(':')));
                start = Number(data[15].value.slice(0, data[15].value.indexOf(':')));
                for (var i = 0; i < end - start; i++) {
                    var time = start + i + ':00';
                    if (arrTime.indexOf(time) == -1) {
                        showResult(time);
                    }
                }
                break;
            case 'Воскресенье':
                //код
                end = Number(data[19].value.slice(0, data[19].value.indexOf(':')));
                start = Number(data[18].value.slice(0, data[18].value.indexOf(':')));
                for (var i = 0; i < end - start; i++) {
                    var time = start + i + ':00';
                    if (arrTime.indexOf(time) == -1) {
                        showResult(time);
                    }
                }
                break;
        }

    }


    function showResult(time) {
        console.log(time);
        var container = $('.changeTime'),
            rows = container[0].getElementsByClassName('row'),
            lengths = [rows.length];

        if (lengths[0] == 0) {
            var div = document.createElement('div');
            div.className = 'row justify-content-between';
            div.innerHTML = '<div class="col-sm-3 butChangeTime">' + time + '</div>';
            container[0].append(div);
        } else {
            var items = rows[lengths[0] - 1].getElementsByClassName('butChangeTime');
            lengths.push(items.length);

            if (lengths[1] != 3) {
                var div = document.createElement('div');
                div.className = 'col-sm-3 butChangeTime';
                div.innerHTML = time;
                rows[lengths[0] - 1].append(div);
            } else {
                var div = document.createElement('div');
                div.className = 'row justify-content-between';
                div.innerHTML = '<div class="col-sm-3 butChangeTime">' + time + '</div>';
                container[0].append(div);
            }
        }
    }

    $(document).on('click', '.butChangeTime', function(event) {
        var timeBron = event.target.textContent;
        $('#inputForm').val(timeBron);
        $('#buttonForm').click();
        $('.formDateBron').remove();
    })

    console.log(1);
}

function form() {


    $('.phoneInput').mask("+7 (999) 999-99-99")

    function validateName() {
        var regexp = /^[а-яА-Яa-zA-Z]{2}/

        if(!regexp.test($('.emailInput').val()) && $('.nameErrorValidation').length == 0) {
            $('.nameForm').append($('<p>', {
                'class': 'nameErrorValidation errorValid',
                'text': 'Минимум 2 символа',
                'style': 'color: red'
            }))
        }

        return regexp.test($('.nameInput').val());
    }

    function validateEmail() {
        var regexp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/

        if(!regexp.test($('.emailInput').val()) && $('.emailErrorValidation').length == 0) {
            $('.emailForm').append($('<p>', {
                'class': 'emailErrorValidation errorValid',
                'text': 'Некорректный email',
                'style': 'color: red'
            }))
        }

        return regexp.test($('.emailInput').val());
    }

    function validatePhone() {
        console.log($('.phoneInput').val())
        var regexp = /\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}/

        if(!regexp.test($('.phoneInput').val()) && $('.phoneErrorValidation').length == 0) {
            $('.phoneForm').append($('<p>', {
                'class': 'phoneErrorValidation errorValid',
                'text': 'Номер введен некорректно',
                'style': 'color: red'
            }))
        }

        return regexp.test($('.phoneInput').val())
    }

    function validate() {
        var nameValidate = validateName(),
            emailValidate = validateEmail(),
            phoneValidate = validatePhone()

        if(nameValidate && emailValidate && phoneValidate) {
            console.log('ok')
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                async: true,
                data: {
                    action: 'sendForm',
                    date: $('.dateBron').text(),
                    time: $('.timeInfo').text(),
                    name: $('#exampleFormControlInput1').val(),
                    email: $('#exampleFormControlInput2').val(),
                    phoneNumber: $('#exampleFormControlInput3').val()
                },
                success: function success(data) {
                    console.log('Информация с сервера - ' + data);
                    $('.allGood').click();
                    // $('.sendInfo')[0].style.display = '';
                    // $('.sendInfo')[0].textContent = 'Наш менеджер свяжется с Вами в ближайшее время для подтверждения брони';
                },
                error: function error() {
                    console.log('error')
                }
            });
        }
    }

    $(document).on('click', '.sendRequest > button', function() {
        // var str = 'action=sendForm&date=' + $('.dateBron').text() + '&time=' + $('.timeInfo').text() + '&name=' +
        //     $('#exampleFormControlInput1').val() + '&email=' + $('#exampleFormControlInput2').val() + '&phoneNumber=' +
        //     $('#exampleFormControlInput3').val(); //Сразу делаем готовую строку для гет запроса на сервер.

        // console.log(str);

        // $('.timeInput').val($('.timeInfo').text());
        // $('.dateInput').val($('.dateInfo').text());
        // $('.buttonSendFrom').click();
        // $('.allGood').click();
        // $('.formDateBron').remove();
        validate();

    })
    console.log('FORMASDASD');
}


function getWeekDay(date) {
    date = date || new Date();
    var days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    var day = date.getDay();

    return days[day];
}

Date.prototype.daysInMonth = function () {
    return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
};