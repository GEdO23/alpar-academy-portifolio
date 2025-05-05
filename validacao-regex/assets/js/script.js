// @ts-nocheck
const userFormEl = document.getElementById('user-form');

String.prototype.validateName = function () {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(this);
}

String.prototype.validateEmail = function () {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(this);
}

String.prototype.validateCpf = function () {
    const regex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
    return regex.test(this);
}

HTMLInputElement.prototype.validate = function validate() {
    const type = this.dataset.inputType;

    if (type === 'username') {
        return `${this.value}`.validateName();
    }

    if (type === 'email') {
        return `${this.value}`.validateEmail();
    }

    if (type === 'cpf') {
        return `${this.value}`.validateCpf();
    }

    return false;
}

document.querySelectorAll('.form-validate').forEach(form => {
    const btnValidateEl = form.querySelector('.btn-validate');
    const btnSendEl = form.querySelector('.btn-send');

    btnValidateEl.addEventListener('click', (e) => {
        e.preventDefault();

        let areInputsValid = true;

        form.querySelectorAll('.input').forEach(inputEl => {
            inputEl.classList.remove('valid-input', 'invalid-input');

            const validationMessageEl = inputEl.parentElement.querySelector(`.validation-message`);

            if (inputEl.validate()) {
                inputEl.classList.add('valid-input');
                validationMessageEl.innerHTML = 'Válido ✅';
            } else {
                inputEl.classList.add('invalid-input');
                validationMessageEl.innerHTML = 'Inválido ❌';
                areInputsValid = false;
            }
        })

        btnSendEl.disabled = !areInputsValid;
    })
})

userFormEl.addEventListener('submit', (e) => e.preventDefault())