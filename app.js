const express = require('express');
const app = express();
const port = 3000;
const authRoutes = require('./routes/auth.routes');
app.use(express.json());
app.use('/auth', authRoutes);
app.listen(port, () => {
});
