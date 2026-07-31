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


    // --- 2. PAC-MAN STYLE MINI GAME WITH START & GHOSTS ---
    const gameBoard = document.getElementById('game-board');
    const scoreText = document.getElementById('score-display');
    const startButton = document.getElementById('startBtn');
    const gameOverScreen = document.getElementById('game-over-screen');

    // Game state variables
    let isGameRunning = false;
    let score = 0;
    let playerX = 114;
    let playerY = 114;
    const speed = 12;

    // Ghost obstacle array to hold multiple moving threats
    let ghosts = [
        { x: 30, y: 30, dx: 3, dy: 2, element: null },
        { x: 180, y: 180, dx: -2, dy: 3, element: null }
    ];

    // Create the player element
    const player = document.createElement('div');
    player.classList.add('player');
    gameBoard.appendChild(player);

    // Create the food dot element
    const dot = document.createElement('div');
    dot.classList.add('dot');
    let dotX, dotY;

    // Spawn dot at random coordinates
    function spawnDot() {
        dotX = Math.floor(Math.random() * 220) + 10;
        dotY = Math.floor(Math.random() * 220) + 10;
        dot.style.left = dotX + 'px';
        dot.style.top = dotY + 'px';
        gameBoard.appendChild(dot);
    }

    // Initialize ghost DOM elements
    ghosts.forEach(ghost => {
        const el = document.createElement('div');
        el.classList.add('ghost');
        gameBoard.appendChild(el);
        ghost.element = el;
    });

    // Reset game positions and score
    function resetGame() {
        score = 0;
        scoreText.textContent = `Score: ${score}`;
        playerX = 114;
        playerY = 114;
        player.style.left = playerX + 'px';
        player.style.top = playerY + 'px';
        gameOverScreen.classList.add('hidden');
        spawnDot();
    }

    // Start Game Button click handler
    startButton.addEventListener('click', () => {
        resetGame();
        isGameRunning = true;
        startButton.textContent = "Restart Game";
    });

    // Handle player movement with keyboard arrow keys
    window.addEventListener('keydown', (e) => {
        if (!isGameRunning) return; // Do nothing if game hasn't started or is over

        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
            e.preventDefault(); // Stop page scrolling
        }

        switch(e.key) {
            case 'ArrowUp':
                if (playerY > 0) playerY -= speed;
                break;
            case 'ArrowDown':
                if (playerY < 228) playerY += speed;
                break;
            case 'ArrowLeft':
                if (playerX > 0) playerX -= speed;
                break;
            case 'ArrowRight':
                if (playerX < 228) playerX += speed;
                break;
        }

        player.style.left = playerX + 'px';
        player.style.top = playerY + 'px';

        // Check collision with food dot
        const dotDistance = Math.sqrt(Math.pow(playerX - dotX, 2) + Math.pow(playerY - dotY, 2));
        if (dotDistance < 20) {
            score += 10;
            scoreText.textContent = `Score: ${score}`;
            spawnDot();
        }
    });

    // Main Game Loop running every 30 milliseconds to animate ghosts & check collisions
    setInterval(() => {
        if (!isGameRunning) return;

        // Move each ghost obstacle
        ghosts.forEach(ghost => {
            ghost.x += ghost.dx;
            ghost.y += ghost.dy;

            // Bounce ghosts off walls (board is 250px, ghost is 22px -> limit 228)
            if (ghost.x <= 0 || ghost.x >= 228) ghost.dx *= -1;
            if (ghost.y <= 0 || ghost.y >= 228) ghost.dy *= -1;

            // Update ghost element position on screen
            ghost.element.style.left = ghost.x + 'px';
            ghost.element.style.top = ghost.y + 'px';

            // Check collision between player and ghost
            const ghostDistance = Math.sqrt(Math.pow(playerX - ghost.x, 2) + Math.pow(playerY - ghost.y, 2));
            if (ghostDistance < 18) {
                // COLLISION DETECTED: Game Over!
                isGameRunning = false;
                gameOverScreen.classList.remove('hidden');
            }
        });

    }, 30);

});
