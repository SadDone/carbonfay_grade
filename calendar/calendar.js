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
    document.querySelector('#' + id + ' thead td:nth-child(2)').dataset.month = D.getMonth() < 10 ? '0' + D.getMonth() : D.getMonth();
    document.querySelector('#' + id + ' thead td:nth-child(2)').dataset.year = D.getFullYear();
    if (document.querySelectorAll('#' + id + ' tbody tr').length < 6) { // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
        document.querySelector('#' + id + ' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
    }
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

console.log(document.getElementsByClassName('test')[0].getAttribute('data-month')) // my line
// for(let el in $('tbody').children()) {
//     console.log(el)
//     $(el).children().forEach(element => {
//         console.log(element.value)
//         if(element.value == '' || element.val < new Date().getDate()) {
//             element.css({
//                 'background-color': 'rgb(122, 107, 107)',
//             })
//         }
//     })
// }

// for(let element in $('tbody').children('tr')) {
//     console.log(element)
// }
let arr = $('tbody').children().children();

for (let i = 0; i < arr.length; i++) {
    // console.log(arr[i].getAttribute('class'))
    if (arr[i].getAttribute('class') == null || arr[i].getAttribute('class') < new Date().getDate()) {
        arr[i].style.backgroundColor = 'rgb(189, 189, 189)'
    }
} // на пустые клетки и дни, которые уже прошли ставим серый бекграунд, для визуализации запрета нажатия.

// console.log($('tbody').children().children())


$('tbody').on('click', (event) => {
    // console.log(event)
    if (event.target.tagName != 'TD' || event.target.className == null || event.target.className < new Date().getDate()) return

    console.log(event.target.className + '.' + $('.test')[0].getAttribute('data-month'));
}) //срабатывает только на клетках, кроме прошедших дней и пустых клеток.