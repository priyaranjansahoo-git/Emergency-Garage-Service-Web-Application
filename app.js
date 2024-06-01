const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 9500;

app.use('/static', express.static('static'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.get('/nextpage', (req, res) => {
    const params = {}
    res.status(203).render("nextpage.pug", params);
});
app.get('/', (req, res) => {
    const params = {}
    res.status(404).render("SwiftSOS.pug", params);
});


// Connect to MongoDB
mongoose.connect('mongodb+srv://priyaranjansahoo19055:U7cewv7DacWbMhjq@cluster0.3eqcork.mongodb.net/login', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('connected', () => {
    console.log('Connected to MongoDB');
});

// Define the Login Schema
const LoginSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true }
    },
    { timestamps: true }
);

// Create the Login model
const login = mongoose.model('login', LoginSchema);

// Render the login page
app.get('/login', (req, res) => {
    res.render('login');
});

// Handle login form submission
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await login.findOne({ username: username, password: password });
        if (user) {
            // Redirect to next page and pass the username as a query parameter
            res.redirect(`/nextpage?username=${encodeURIComponent(username)}`);
        } else {
            res.status(401).send('Invalid username or password');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing request');
    }
});

// Render the signup page
app.get('/signup', (req, res) => {
    res.render('sign_up');
});

// Handle signup form submission
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const newLogin = new login({
        username: username,
        password: password
    });
    try {
        await newLogin.save();
        res.status(200).send('Data saved successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving to database');
    }
});

app.get('/nextpage', (req, res) => {
    const username = req.query.username;
    res.render('nextpage', { username: username });
});


app.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`);
});

