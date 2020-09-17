const changeImageTeam = () => {
    const imageTeam = document.querySelectorAll('.command__photo');
    imageTeam.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.dataset.oneImg = item.src;
            item.src = item.dataset.img;
        });
        item.addEventListener('mouseout', () => {
            item.dataset.twoImg = item.src;
            item.src = item.dataset.oneImg;
        });
    });
};

export default changeImageTeam;