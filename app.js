const express = require('express');
const app = express();
const port = 3000;
const db = require('./config/db.js');
const authRoutes = require('./routes/auth.routes');
app.use(express.json());
app.use('/auth', authRoutes);
app.listen(port, () => {
});
