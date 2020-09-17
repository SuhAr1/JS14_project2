const toggleMenu = () => {

    // const btnMenu = document.querySelector('.menu');
    const menu = document.querySelector('menu');
    // const closeBtn = document.querySelector('.close-btn');
    // const menuItems = menu.querySelectorAll('ul>li');

    const handlerMenu = () => {
        menu.classList.toggle('active-menu');
    };

    document.body.addEventListener('click', event => {
        const target = event.target;
        if (target.closest('.menu')) {
            handlerMenu();
        }
        if (target.closest('.close-btn')) {
            handlerMenu();
        }
        if (target.closest('menu>ul>li')) {
            handlerMenu();
        }
    });

};

export default toggleMenu;