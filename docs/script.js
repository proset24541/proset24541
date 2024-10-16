let clickCount = 0;

const coin = document.getElementById('coin');
const clicksDisplay = document.getElementById('clicks');

coin.addEventListener('click', () => {
    clickCount++;
    clicksDisplay.textContent = clickCount;

    // Добавление анимации при клике
    coin.classList.add('clicked');

    setTimeout(() => {
        coin.classList.remove('clicked');
    }, 200); // Очищаем класс после 200 мс
});

function openPost(postId) {
    // Здесь можно реализовать логику открытия поста
    alert("Открытие поста: " + postId);
