// Wait for the HTML document to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    
    // Grab the button element from our HTML using its ID
    const colorButton = document.getElementById('colorBtn');

    // Array of fun background colors to cycle through
    const colors = ['#ff9a9e', '#fad0c4', '#a1c4fd', '#c2e9fb', '#d4fc79', '#96e6a1'];

    // Add an event listener to listen for a 'click' event on the button
    colorButton.addEventListener('click', () => {
        // Pick a random color from our array
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Change the background color of the main body element
        document.body.style.backgroundColor = randomColor;
        
        // Log a message to the browser console for debugging
        console.log(`Background color changed to: ${randomColor}`);
    });

});
