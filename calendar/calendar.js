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
    if (document.querySelectorAll('#' + id + ' tbody tr').length < 6) { // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
        document.querySelector('#' + id + ' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
    }

    let arr = $('tbody').children().children();

    testDisplayButton(arr) // Делаем визуально некликабельными ненужные дни
}
Calendar2("calendar2", new Date().getFullYear(), new Date().getMonth());
// переключатель минус месяц
document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(1)').onclick = function () {
    Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month) - 1);
}
// переключатель плюс месяц
document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(3)').onclick = function () {
    Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month) + 1);
}


$('tbody').on('mouseover', (event) => { // при наведении на некликабельные кнопки некликабельный курсор
    let date = new Date(),
        daysMonth = date.daysInMonth(),
        month = $('.test')[0].getAttribute('data-month')


    if (event.target.className == null || event.target.tagName != 'TD' || (month != date.getMonth() && month != date.getMonth() + 1)) {
        event.target.style.cursor = 'default'
    }

    if (daysMonth - date.getDate() < 14) {
        if (month == date.getMonth() && event.target.className < date.getDate())
            event.target.style.cursor = 'default'
        if (month == date.getMonth() + 1 && (event.target.className >= 14 - (daysMonth - date.getDate()) || event.target.className == ''))
            event.target.style.cursor = 'default'
    } else {
        if (event.target.className < date.getDate() || event.target.className >= date.getDate() + 14 || month != date.getMonth() + 1)
            event.target.style.cursor = 'default'
    }
})

$('tbody').on('click', (event) => { // работает только на кликабельных кнопках, при нажатии будет отправка на сервер даты и отрисовка модалки с данными, пришедшими с сервера
    // console.log(event)
    let date = new Date(),
        daysMonth = date.daysInMonth(),
        month = $('.test')[0].getAttribute('data-month')


    if (event.target.tagName != 'TD' || event.target.className == null || (month != date.getMonth() && month != date.getMonth() + 1))
        return



    if (daysMonth - date.getDate() < 14) {
        if (month == date.getMonth() && event.target.className < date.getDate())
            return
        if (month == date.getMonth() + 1 && (event.target.className >= 14 - (daysMonth - date.getDate()) || event.target.className == ''))
            return
    } else {
        if (event.target.className < date.getDate() || event.target.className >= date.getDate() + 14 || month != date.getMonth() + 1)
            return
    }

    console.log(event.target.className + '.' + month + '.' + $('.test')[0].getAttribute('data-year'));
}) //срабатывает только на клетках, кроме прошедших дней и пустых клеток.


function testDisplayButton(arr) { // Визуально делает кнопки некликабельными
    for (let i = 0; i < arr.length; i++) {
        // arr[i].style.backgroundColor = 'rgb(189, 189, 189)'
        let date = new Date(),
            daysMonth = date.daysInMonth(),
            className = arr[i].getAttribute('class')

        if($('.test')[0].getAttribute('data-month') != date.getMonth() && $('.test')[0].getAttribute('data-month') != date.getMonth()+1) {
            arr[i].style.color = 'rgba(0,0,0,.26)'
        }

        if (daysMonth - date.getDate() < 14) { // Проверка, сколько осталось до конца этого месяца, если меньше 14 дней, то нужно сделать активными кнопки в след месяце
            if ($('.test')[0].getAttribute('data-month') == date.getMonth() && className < date.getDate()) {
                arr[i].style.color = 'rgba(0,0,0,.26)' // Делаем активными даты в этом месяце
            } else if ($('.test')[0].getAttribute('data-month') == date.getMonth() + 1 && className >= 14 - (daysMonth - date.getDate()) && className != null) {
                arr[i].style.color = 'rgba(0,0,0,.26)' // Делаем активными даты в след. месяце
            }
        } else {
            if ($('.test')[0].getAttribute('data-month') == date.getMonth() && className >= date.getDate() && className < date.getDate() + 14) {
                arr[i].style.color = 'rgba(0,0,0,.26)' // Если до конца месяца больше 14 дней, то делаем кликабельными только 14 дней этого месяца
            }
        }

    }
}


// alert(new Date().daysInMonth())