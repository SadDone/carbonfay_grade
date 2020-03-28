// $('#calendar2')[0].style.display = 'none'
$('.modal-footer')[0].style.display = 'none'
$('.changeTime')[0].style.display = 'none'
$('.formData')[0].style.display = 'none'
// $('.changeDate')[0].style.display = 'none'
$('.btnClose')[0].style.display = 'none'


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

    $('#calendar2')[0].style.display = 'none';
    $('.changeTime')[0].style.display = '';
    $('.bodyHeader')[0].textContent = 'Выберете время';
    dateBron = event.target.className + '.' + month + '.' + $('.test')[0].getAttribute('data-year');
    console.log(event.target.className + '.' + month + '.' + $('.test')[0].getAttribute('data-year'));
}) //срабатывает только на клетках, кроме прошедших дней и пустых клеток.

$('.but').on('click', () => {
    if (flag === true) {
        $('#calendar2')[0].style.display = 'none';
        flag = false;
    } else {
        $('#calendar2')[0].style.display = '';
        flag = true;
    }
    console.log($('#calendar2'))
})

$('.butChangeTime').on('mouseover', (event) => {
    event.target.style.cursor = 'pointer'
})

$('.butChangeTime').on('click', (event) => {
    $('.changeTime')[0].style.display = 'none'
    console.log(event)
    datetimeBron = dateBron + ' ' + event.target.textContent
    console.log(datetimeBron)
    // $('.timeBron')[0].textContent = datetimeBron
    $('.formData')[0].style.display = '';
    $('.modal-footer')[0].style.display = ''
    $('.bodyHeader')[0].textContent = 'Заполните данные';
})

$('.sendForm').on('click', () => {
    $('.formData')[0].style.display = 'none';
    $('.sendInfo')[0].textContent = 'Ваш запрос отправлен. Проверьте почту.'
})

$('.openModalButton').on('click', () => {
    // $('.changeDate')[0].style.display = ''
    // $('#exampleModalLong').modal({
    //     keyboard: false
    // })
})

$('.sendRequest').on('click', () => {
    $('.sendInfo')[0].textContent = 'Ваша заявка отправлена. Подтверждение придет по почте'
    $('.formData')[0].style.display = 'none';
    $('.btnClose')[0].style.display = ''
    $('.sendRequest')[0].style.display = 'none'
})