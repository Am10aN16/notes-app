const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require("path");
require('dotenv').config();  

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const URI = process.env.MONGODB_URI
mongoose.connect(URI, {

}).then(() => {
    console.log('Connected to MongoDB');
})

const groupRoutes = require('./routes/group');
const noteRoutes = require('./routes/note');

app.use('/api/groups', groupRoutes);
app.use('/api/notes', noteRoutes);

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname1, '/notes-frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname1, 'notes-frontend', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send("Hello from the server")
    })
}
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
