$('.dataInfo')[0].style.display = 'none';

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

    dateBron = event.target.className + '.' + month + '.' + $('.test')[0].getAttribute('data-year');
    console.log(dateBron)
    //посылаем запрос на бек и получаем брони на этот день. 

    $('#calendar2')[0].style.display = 'none';
    $('.dataInfo')[0].style.display = '';
    $('.listBronData')[0].textContent = 'Список броней на ' + dateBron
})