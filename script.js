// Wait for the HTML document to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. COLOR CHANGING BUTTON FEATURE ---
    const colorButton = document.getElementById('colorBtn');
    const colors = ['#ff9a9e', '#fad0c4', '#a1c4fd', '#c2e9fb', '#d4fc79', '#96e6a1'];

    colorButton.addEventListener('click', () => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.style.backgroundColor = randomColor;
        console.log(`Background color changed to: ${randomColor}`);
    });


    // --- 2. PAC-MAN STYLE MINI GAME FEATURE ---
    const gameBoard = document.getElementById('game-board');
    const scoreDisplay = c_getScoreDisplay(); // helper or direct query
    const scoreText = document.getElementById('score-display');

    // Game variables
    let playerX = 112; // Starting X pixel position (center of 250px board)
    let playerY = 112; // Starting Y pixel position
    const speed = 12;  // Pixels moved per keypress
    let score = 0;

    // Create the player element dynamically
    const player = document.createElement('div');
    player.classList.add('player');
    player.style.left = playerX + 'px';
    player.style.top = playerY + 'px';
    gameBoard.appendChild(player);

    // Create a food dot element
    const dot = document.createElement('div');
    dot.classList.add('dot');
    let dotX, dotY;

    // Function to place the food dot at a random location within the board
    function spawnDot() {
        // Keep coordinates within bounds (board is 250px, dot is 8px)
        dotX = Math.floor(Math.random() * 220) + 10;
        dotY = Math.floor(Math.random() * 220) + 10;
        dot.style.left = dotX + 'px';
        dot.style.top = dotY + 'px';
        gameBoard.appendChild(dot);
    }

    spawnDot(); // Spawn the first dot when page loads

    // Listen for keyboard arrow keys to move the player
    window.addEventListener('keydown', (e) => {
        // Prevent default browser scrolling when using arrow keys
        if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
            e.preventDefault();
        }

        // Move based on key pressed, keeping player inside the 250x250 boundaries
        switch(e.key) {
            case 'ArrowUp':
                if (playerY > 0) playerY -= speed;
                break;
            case 'ArrowDown':
                if (playerY < 225) playerY += speed;
                break;
            case 'ArrowLeft':
                if (playerX > 0) playerX -= speed;
                break;
            case 'ArrowRight':
                if (playerX < 225) playerX += speed;
                break;
        }

        // Update player position on screen
        player.style.left = playerX + 'px';
        player.style.top = playerY + 'px';

        // Check if player collides with the food dot (simple distance check)
        const distance = Math.sqrt(Math.pow(playerX - dotX, 2) + Math.pow(playerY - dotY, 2));
        if (distance < 20) {
            score += 10;
            scoreText.textContent = `Score: ${score}`;
            spawnDot(); // Respawn a new dot in a new random location
        }
    });

});

// Helper function placeholder for safe scoping reference
function c_getScoreDisplay() {
    return null;
}
