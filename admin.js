// $('.dataInfo')[0].style.display = 'none';
$('.infoAboutDay')[0].style.display = 'none';

$('tbody').on('click', (event) => { // работает только на кликабельных кнопках, при нажатии будет отправка на сервер даты и отрисовка модалки с данными, пришедшими с сервера
    // console.log(event)
    let date = new Date(),
        daysMonth = date.daysInMonth(),
        month = $('.test')[0].getAttribute('data-month')

    if( event.target.style.cursor == 'default' ) {
        return
    }

    dateBron = event.target.className + '.' + month + '.' + $('.test')[0].getAttribute('data-year');
    console.log(dateBron)
    //посылаем запрос на бек и получаем брони на этот день.

    // showInformation(dateBron)

    $('.calendar')[0].style.display = 'none';
    $('.infoAboutDay')[0].style.display = '';
    $('.dateInformationSpan')[0].textContent = dateBron;
    // $('.listBronData')[0].textContent = 'Список броней на ' + dateBron
})

// todo сделать удаление из БД при удалении брони (и отправка на почту клиенту)


$('.buttonSettingsSave').on('click', () => {
    let obj = {
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
        },
    }
    // console.log($('.mon')[0].getElementsByClassName('check')[0].checked)
    console.dir(obj)

    // todo сделать проверку вводимых данных
    $.ajax({
        type: "POST",
        url: "../script.php",
        dataType: "json",
        async: true,
        data: {
            action: 'sendSettings',
            data: obj,
            email: $('.emailInput').value
        },
        complete: (data) => {
            console.dir(data)
            alert('Настройки сохранены')
            $('#staticBackdrop').modal('hide')
            // $('.sendInfo')[0].style.display = ''
            // $('.sendInfo')[0].textContent = 'Наш менеджер свяжется с Вами в ближайшее время для подтверждения брони'
        }
    })
})


$('.btn-group').on('click', (event) => { // Нажатие на день недели в настройках графика
    $('.btn-group')[0].style.display = 'none'
})





















