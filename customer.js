// $('#calendar2')[0].style.display = 'none'
$('.modal-footer')[0].style.display = 'none'
$('.changeTime')[0].style.display = 'none'
$('.formData')[0].style.display = 'none'
// $('.changeDate')[0].style.display = 'none'
$('.btnClose')[0].style.display = 'none'
$('.sendAgain')[0].style.display = 'none'
var flag = false

function getWeekDay(date) {
    date = date || new Date();
    let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    let day = date.getDay();

    return days[day];
}

let timeInfo

// обработчик нажатий на календарь

$('tbody').on('click', (event) => { // работает только на кликабельных кнопках, при нажатии будет отправка на сервер даты и отрисовка модалки с данными, пришедшими с сервера
    // console.log(event)
    let date = new Date(),
        daysMonth = date.daysInMonth(),
        month = $('.test')[0].getAttribute('data-month')

    if (getWeekDay(new Date(2020, month, event.target.className)) == 'Воскресенье') {
        return
    }


    if (event.target.tagName != 'TD' || event.target.className == null || (month != date.getMonth() && month != date.getMonth() + 1))
        return


    if (daysMonth - date.getDate() < 14) {
        if (month == date.getMonth() && event.target.className < date.getDate())
            return
        if (month == date.getMonth() + 1 && (event.target.className >= 14 - (daysMonth - date.getDate()) || event.target.className == ''))
            return
    } else {
        if (event.target.className < date.getDate() || event.target.className >= date.getDate() + 14 || month == date.getMonth() + 1)
            return
    }

    dateBron = event.target.className + '.' + month + '.' + $('.test')[0].getAttribute('data-year');


    $.ajax({
        type: "GET",
        url: "../getDataTime.php",
        dataType: "json",
        async: true,
        data: {
            date: dateBron
        },
        complete: (data) => {
            timeInfo = JSON.stringify(data.responseText);

            console.dir('Информация с сервера о занятом времени - ' + timeInfo)
            if(flag == true) {
                $('.changeTime')[0].innerHTML = ''
            }
            showFreeTime(timeInfo, event.target.className, month)
        }
    })


    $('#calendar2')[0].style.display = 'none';
    $('.changeTime')[0].style.display = '';
    $('.bodyHeader')[0].textContent = 'Выберите время';
    console.log(event.target.className + '.' + month + '.' + $('.test')[0].getAttribute('data-year'));
}) //срабатывает только на клетках, кроме прошедших дней и пустых клеток.


let timeBron

// Обработчик, срабатывающий при клике на время

$('.changeTime').on('click', (event) => {
    if (event.target.className == 'col-sm-3 butChangeTime') {
        console.log(1)
        $('.changeTime')[0].style.display = 'none'
        console.log(event)
        timeBron = event.target.textContent
        // console.log(datetimeBron)
        // $('.timeBron')[0].textContent = datetimeBron
        $('.formData')[0].style.display = '';
        $('.modal-footer')[0].style.display = ''
        $('.bodyHeader')[0].textContent = 'Заполните данные';
    }
})

// Обработчик, срабатывающий при клике на кнопку "Отправить"

$('.sendRequest').on('click', () => {
    // console.log('Дата и время:' + datetimeBron + '\n Имя: ' + $('#exampleFormControlInput1').val() + '\n Почта: ' + $('#exampleFormControlInput2').val() + '\n Телефон: ' + $('#exampleFormControlInput3').val())
    $('.formData')[0].style.display = 'none';
    $('.btnClose')[0].style.display = ''
    $('.sendRequest')[0].style.display = 'none'
    $('.sendAgain')[0].style.display = ''

    $.ajax({
        type: "POST",
        url: "../sendData.php",
        dataType: "json",
        async: true,
        data: {
            date: dateBron,
            time: timeBron,
            name: $('#exampleFormControlInput1').val(),
            email: $('#exampleFormControlInput2').val(),
            phoneNumber: $('#exampleFormControlInput3').val()
        },
        complete: (data) => {
            console.log('Информация с сервера - ' + data)
            $('.sendInfo')[0].style.display = ''
            $('.sendInfo')[0].textContent = 'Наш менеджер свяжется с Вами в ближайшее время для подтверждения брони'
        }
    })
})

$('.btnClose').on('click', () => {
    $('#calendar2')[0].style.display = ''
    $('.modal-footer')[0].style.display = 'none'
    $('.btnClose')[0].style.display = 'none'
    $('.sendInfo')[0].style.display = 'none'
    $('.sendAgain')[0].style.display = 'none'
})

$('.sendAgain').on('click', () => {
    flag = true
    $('#calendar2')[0].style.display = ''
    $('.modal-footer')[0].style.display = 'none'
    $('.btnClose')[0].style.display = 'none'
    $('.sendInfo')[0].style.display = 'none'
    $('.sendAgain')[0].style.display = 'none'
})


function showFreeTime(arrTime, className, month) {
    if (getWeekDay(new Date(2020, month, className)) == "Суббота") {
        // let times;
        for (let i = 0; i < (22 - 10) / 1; i++) { // здесь 21 - время, когда заканчивается работа, 10 - когда начинается, 1 - промежуток
            let temp = 10 + i + ':00'
            if (arrTime.indexOf(temp) == -1) {
                showResult(temp)
            }
            // times.push(temp)
        }
        // let times = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']
    } else {
        let times;
        for (let i = 0; i < (21 - 10) / 1; i++) { // здесь 21 - время, когда заканчивается работа, 10 - когда начинается, 1 - промежуток
            let temp = 10 + i + ':00'
            if (arrTime.indexOf(temp) == -1) {
                showResult(temp)
            }
            // times.push(temp)
        }
    }
}

function showResult(time) {
    console.log(time)
    let container = $('.changeTime'),
        rows = container[0].getElementsByClassName('row'),
        lengths = [rows.length]

    if (lengths[0] == 0) {
        let div = document.createElement('div')
        div.className = 'row justify-content-around'
        div.innerHTML = `<div class="col-sm-3 butChangeTime">${time}</div>`
        container[0].append(div)
    } else {
        let items = rows[lengths[0] - 1].getElementsByClassName('butChangeTime')
        lengths.push(items.length)

        if (lengths[1] != 3) {
            let div = document.createElement('div')
            div.className = 'col-sm-3 butChangeTime'
            div.innerHTML = time
            rows[lengths[0] - 1].append(div)
        } else {
            let div = document.createElement('div')
            div.className = 'row justify-content-around'
            div.innerHTML = `<div class="col-sm-3 butChangeTime">${time}</div>`
            container[0].append(div)
        }
    }
}

// При наведении на время - делает его поинтером (визуально кликабельным)
// $('.сhangeTime').on('mouseover', '.butChangeTime', (event) => {
//     event.target.style.cursor = 'pointer'
// })

