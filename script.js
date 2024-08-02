document.addEventListener("DOMContentLoaded", function() {
    const gameArea = document.getElementById('gameArea'); // Get the game area element
    const gridSize = 20; // Size of each grid cell
    const gameSize = 400; // Size of the game area
    const snake = [{x: 0, y: 0}]; // Initial position of the snake
    let food = {x: 0, y: 0}; // Initial position of the food
    let direction = {x: 1, y: 0}; // Initial direction of the snake
    let gameInterval;

    // Function to create a div element for the snake or food
    function createDiv(className, x, y) {
        const div = document.createElement('div');
        div.className = className;
        div.style.left = `${x}px`;
        div.style.top = `${y}px`;
        gameArea.appendChild(div);
    }

    // Function to place food at a random position
    function placeFood() {
        food.x = Math.floor(Math.random() * gridSize) * gridSize;
        food.y = Math.floor(Math.random() * gridSize) * gridSize;
    }

    // Function to draw the snake and food on the game area
    function draw() {
        gameArea.innerHTML = ''; // Clear the game area
        snake.forEach(segment => createDiv('snake', segment.x, segment.y)); // Draw the snake
        createDiv('food', food.x, food.y); // Draw the food
    }

    // Function to move the snake
    function move() {
        const head = {x: snake[0].x + direction.x * gridSize, y: snake[0].y + direction.y * gridSize};
        snake.unshift(head); // Add new head to the snake

        if (head.x === food.x && head.y === food.y) {
            placeFood(); // If the snake eats the food, place new food
        } else {
            snake.pop(); // Otherwise, remove the last segment of the snake
        }

        // Check for collisions with walls or itself
        if (head.x < 0 || head.x >= gameSize || head.y < 0 || head.y >= gameSize || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
            clearInterval(gameInterval); // Stop the game
            alert('Game Over'); // Display game over message
            return;
        }

        draw(); // Redraw the game area
    }

    // Function to change the direction of the snake based on key press
    function changeDirection(event) {
        const key = event.key;

        if (key === 'ArrowUp' && direction.y === 0) {
            direction = {x: 0, y: -1}; // Move up

        } else if (key === 'ArrowDown' && direction.y === 0) {
            direction = {x: 0, y: 1}; // Move down

        } else if (key === 'ArrowLeft' && direction.x === 0) {
            direction = {x: -1, y: 0}; // Move left
            
        } else if (key === 'ArrowRight' && direction.x === 0) {
            direction = {x: 1, y: 0}; // Move right
        }
    }

    document.addEventListener('keydown', changeDirection); // Listen for key presses to change direction
    placeFood(); // Place the initial food
    draw(); // Draw the initial game state
    gameInterval = setInterval(move, 200); // Start the game loop
});