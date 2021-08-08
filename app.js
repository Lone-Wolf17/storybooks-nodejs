const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');
const connectDB = require('./config/db.js');
const morgan = require('morgan');
const indexRouter = require('./routes/index.js');

// Load Config
dotenv.config({ path: './config/config.env' });

connectDB();

const app = express()

/// Setup Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

/// Setup Handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Setup Routes
app.use('/', indexRouter);

const PORT = process.env.PORT || 5000

process.on('SIGINT', function () {
    // this is only called on ctrl+c, not restart
    process.kill(process.pid, 'SIGINT');
})

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

process.once('SIGUSR2', function() {
    server.close(function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});