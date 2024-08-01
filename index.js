const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
