const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const errorMiddleware = require('./middlewares/error');

const compression = require('compression');

const app = express();

// Gzip compression for high-speed download
app.use(compression());

// config
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: 'backend/config/config.env' });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const connectDatabase = require('./config/database');

// Ensure database connection for all API requests
app.use(async (req, res, next) => {
    try {
        await connectDatabase();
    } catch (e) {
        console.error('DB connect middleware error:', e);
    }
    next();
});

const user = require('./routes/userRoute');
const product = require('./routes/productRoute');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');
const shop = require('./routes/shopRoute');
const owner = require('./routes/ownerRoute');

// Health check & keep-alive endpoints
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Custom Hub Server is Active 🚀', timestamp: new Date() });
});

app.get('/ping', (req, res) => {
    res.status(200).send('pong');
});

app.use('/api/v1', user);
app.use('/api/v1', product);
app.use('/api/v1', order);
app.use('/api/v1', payment);
app.use('/api/v1', shop);
app.use('/api/v1', owner);

// Serve Static Frontend Files with asset caching
const buildPath = path.resolve(__dirname, '../frontend/build');
if (fs.existsSync(path.join(buildPath, 'index.html'))) {
    app.use(express.static(buildPath, {
        maxAge: '1y',
        etag: true,
        setHeaders: (res, filePath) => {
            if (filePath.endsWith('.html')) {
                res.setHeader('Cache-Control', 'no-cache');
            }
        }
    }));

    app.get('*', (req, res) => {
        res.setHeader('Cache-Control', 'no-cache');
        res.sendFile(path.join(buildPath, 'index.html'));
    });
}

// error middleware
app.use(errorMiddleware);

module.exports = app;