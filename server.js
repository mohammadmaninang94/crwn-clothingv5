const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const enforce = require('express-sslify');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

let setCache = function (req, res, next) {
    // here you can define period in second, this one is 5 minutes
    const period = 60 * 5

    // you only want to cache for GET requests
    if (req.method == 'GET') {
        res.set('Cache-control', `public, max-age=${period}`)
    } else {
        // for the other requests set strict no caching parameters
        res.set('Cache-control', `no-store`)
    }

    // remember to call next() to pass on the request
    next();
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(setCache);

if (process.env.NODE_ENV === 'production') {
    app.use(compression());
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        res.set('Cache-control')
        res.sendfile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, error => {
    if (error) throw error;
    console.log('Server running on port ' + port);
});

app.get('/service-worker.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
});

app.post('/create-stripe-payment-intent', async (req, res) => {
    try {
        const { amount, currency } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency
        });

        res.send({
            clientSecret: paymentIntent.client_secret
        });
    }
    catch (error) {
        res.sendStatus(400).send(error.message);
    }
});

app.post('/get-shipping-fee', (req, res) => {
    try {
        res.send({ shippingFee: 50 });
    }
    catch (error) {
        res.sendStatus(400).send(error.message);
    }
});