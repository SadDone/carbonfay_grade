// console.log($('.sendRequest > button'))
// $('.sendRequest > button').attr('disabled', '');

console.log($('.testIframe').val())

$(document).on('blur', '.nameInput', function() {
    var regexp = /^[а-яА-Яa-zA-Z]{2}/

    console.log(regexp.test($('.nameInput').val()))
});

$('.phoneInput').mask("+7 (999) 999-99-99")

setTimeout(function() {
    $('.phoneInput').mask("+7 (999) 999-99-99")
}, 300)

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
    }
}


$(document).on('click', '.sendRequest > button', function() {
    validate()
})