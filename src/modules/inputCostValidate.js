const inputCostValidate = () => {
    document.querySelector(`.calc-block`).querySelectorAll(`input`).forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, "");
        });
    });
};

export default inputCostValidate;