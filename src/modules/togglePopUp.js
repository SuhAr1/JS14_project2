const togglePopUp = () => {
    const popUp = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupContent = document.querySelector('.popup-content');


    // animation

    const modalAnimation = () => {
        let count = 0;
        popupContent.style.top = 0;
        function newAnimation() {
            popupContent.style.top = count + `%`;
            count++;
            if (count <= 38) {
                requestAnimationFrame(newAnimation);
            }
        }
        newAnimation();
    };

    popupBtn.forEach(elem => {
        elem.addEventListener('click', () => {
            popUp.style.display = 'block';
            if (window.screen.availWidth > 768) modalAnimation();
        });
    });

    popUp.addEventListener('click', event => {
        let target = event.target;

        if (target.classList.contains('popup-close')) {
            popUp.style.display = 'none';
        } else {
            target = target.closest('.popup-content');
            if (!target) {
                popUp.style.display = 'none';
            }
        }
    });
};

export default togglePopUp;