document.addEventListener('DOMContentLoaded', function() {
    mostrarbrands();
    showArticles();
    showMenu();
});
// ------------------------------MENU----------------------------
function showMenu() {
    try {
        fetch('./menus.json').then(function(response) {
            response.json().then(function(data) {
                console.dir(data);
                const bar = data.menu;
                bar.forEach((menu) => {
                    const { section } = menu;

                    // make button
                    const nameMenu = document.createElement('A');
                    nameMenu.setAttribute('href', '#');
                    nameMenu.textContent = section;


                    const enlace = document.createElement('LI');
                    enlace.classList.add('font-bar');
                    enlace.appendChild(nameMenu)

                    const nameUl = document.createElement('UL');
                    nameUl.classList.add('nav', 'navbar-nav', 'navbar-left');
                    nameUl.appendChild(enlace)

                    document.querySelector('#enlaces').appendChild(nameUl);
                });
            });
        });
    } catch (wrong) {
        console.log(wrong);
    }
}
//-------------------------------Brands---------------------------------

function mostrarbrands() {
    try {
        fetch('./brands.json').then(function(response) {
            response.json().then(function(data) {
                console.dir(data);
                brands = data.brands;
                brands.forEach((brand) => {
                    const { src } = brand;

                    // crear image
                    const imagebrand = document.createElement('IMG');
                    imagebrand.setAttribute('src', src);
                    imagebrand.classList.add('imagebrand-style');

                    // Generar DIV container de la image
                    const brandDiv = document.createElement('DIV');
                    brandDiv.classList.add('col-lg-1', 'col-md-1', 'col-sm-3', 'col-xs-3');
                    brandDiv.appendChild(imagebrand);

                    // inyectar todo en el HTML
                    document.querySelector('#brands').appendChild(brandDiv);
                });
            });
        });
    } catch (wrong) {
        console.log(wrong);
    }
}

//-------------------------------ARTICLES-------------------------------

function showArticles() {
    try {
        fetch('./articles.json').then(function(response) {
            response.json().then(function(data) {
                console.dir(data);
                const articles = data.articles;
                articles.forEach((article) => {
                    const { name } = article;

                    // make button
                    const nameArticleButton = document.createElement('BUTTON');
                    nameArticleButton.setAttribute('type', 'button');
                    nameArticleButton.textContent = name;
                    nameArticleButton.classList.add('btn', 'btn-secondary', 'mt-5', 'col-md-2', 'btn-block', 'btn-wrap-text');

                    // DIV Button container
                    const articleDiv = document.createElement('DIV');
                    articleDiv.classList.add('col-md-2');

                    articleDiv.appendChild(nameArticleButton);

                    document.querySelector('#articles').appendChild(articleDiv);
                });
            });
        });
    } catch (wrong) {
        console.log(wrong);
    }
}
// ----------------------------VALIDATE FORM---------------------------
const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input, #form textarea');

const expresions = {
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    surname: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    mail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    phone: /^\d{7,14}$/, // 7 a 14 numeros
};

const validateForm = (e) => {
    switch (e.target.name) {
        case 'name':
            validateField(expresions.name, e.target, 'name');
            break;
        case 'surname':
            validateField(expresions.surname, e.target, 'surname');
            break;
        case 'mail':
            validateField(expresions.mail, e.target, 'mail');
            break;
        case 'phone':
            validateField(expresions.phone, e.target, 'phone');
            break;
    }
};

const validateField = (expresion, input, field) => {
    if (expresion.test(input.value)) {
        document.getElementById(`group__${field}`).classList.remove('form__group-incorrect');
        document.getElementById(`group__${field}`).classList.add('form__group-correct');
        document.querySelector(`#group__${field} .form__input-wrong`).classList.remove('form__input-wrong-active');
    } else {
        document.getElementById(`group__${field}`).classList.add('form__group-incorrect');
        document.getElementById(`group__${field}`).classList.remove('form__group-correct');
        document.querySelector(`#group__${field} .form__input-wrong`).classList.add('form__input-wrong-active');
    }
};

inputs.forEach((input) => {
    input.addEventListener('keyup', validateForm);
    input.addEventListener('blur', validateForm);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.querySelector('#name').value;
    const surname = document.querySelector('#surname').value;
    const phone = document.querySelector('#phone').value;
    const mail = document.querySelector('#mail').value;
    const message = document.querySelector('#message').value;

    if (name === '' || surname === '' || phone === '' || mail === '' || message === '') {
        showMessage('All fields are required', 'wrong');

        return;
    }
    // crear la otra alerta de send form correctamente
    showMessage('The message was sent successfully', 'validateMesagge');
});

function showMessage(message, typeOfMessage) {
    const element = document.createElement('P');
    element.textContent = message;
    element.classList.add(typeOfMessage);

    // se muestra el message en el HTML
    form.appendChild(element);

    // desaparece el wrong despues de 5segundos
    setTimeout(() => {
        element.remove();
    }, 5000);
}