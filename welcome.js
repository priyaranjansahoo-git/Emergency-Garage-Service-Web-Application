// JavaScript code to fetch user data and display welcome message

// Function to fetch user data from the server
function fetchUserData() {
    // Make an AJAX request to the server to fetch user data
    fetch('/nextpage') // Update the URL as per your server route
        .then(response => response.json())
        .then(data => {
            // Update the welcome message with the username
            const welcomeMessage = document.getElementById('message');
            welcomeMessage.textContent = `Welcome, ${data.username}!`;
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
}

// Call the function when the page loads
window.addEventListener('load', fetchUserData);
