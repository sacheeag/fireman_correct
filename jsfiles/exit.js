document.addEventListener('DOMContentLoaded', () => {
    const scoreMessage = document.getElementById('score-message');

    // Retrieve the score from localStorage
    const score = localStorage.getItem('gameScore');

    if (score !== null) {
        scoreMessage.textContent = `Congratulations! Your score is ${score}.`;
    } else {
        scoreMessage.textContent = 'Score not found.';
    }

    restart.addEventListener('click', () => {
        // Clear the score from localStorage
        localStorage.removeItem('gameScore');
        
        // Redirect to the game page
        window.location.href = 'mainpage.html'; // Change to your game page URL
    });
});





