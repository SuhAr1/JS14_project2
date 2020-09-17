const sendForm = () => {
    const errorMessage = 'Что то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся';

    const userName = document.getElementsByName('user_name'),
        userEmail = document.getElementsByName('user_email'),
        userPhone = document.getElementsByName('user_phone'),
        userMessage = document.getElementsByName('user_message');


    newForm(document.getElementById('form1')); // title form
    newForm(document.getElementById('form2')); // contact form
    newForm(document.getElementById('form3')); // modal

    const statusMessage = document.createElement('div');

    statusMessage.style.cssText = 'font-size: 2rem;';

    function newForm(form) {
        const formInput = form.querySelectorAll('input');

        formInput.forEach(item => {
            item.addEventListener('input', e => {
                if (e.target.name === 'user_name' || e.target.name === 'user_message') {
                    e.target.value = e.target.value.replace(/[^А-Яа-я]/, '');
                } else if (e.target.name === 'user_phone') {
                    e.target.pattern = "[+][0-9]{11}";
                    e.target.value = e.target.value.replace(/[^0-9+]/, '');
                } else if (e.target.name === 'user_email') {
                    e.target.value = e.target.value.replace(/[^A-za-z0-9@]/, '');
                }
            });
        });

        form.addEventListener('submit', event => {
            event.preventDefault();
            form.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;

            const formData = new FormData(form);
            const body = {};
            // for (const val of formData.entries()) {
            // 	body[val[0]] = val[1];
            // }
            formData.forEach((val, key) => {
                body[key] = val;
            });

            postData(body)
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error('status network not 200');
                    }
                    console.log(response);
                    statusMessage.textContent = successMessage;
                })
                .catch((error => {
                    statusMessage.textContent = errorMessage;
                    console.error(error);
                })
                );
            userName.forEach(item => item.value = '');
            userEmail.forEach(item => item.value = '');
            userPhone.forEach(item => item.value = '');
            userMessage.forEach(item => item.value = '');
        });
    }

    const postData = body => fetch('./server.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
};

export default sendForm;