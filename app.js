const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const restRouter = require('./routes/restaurant');
const menuItemRouter = require('./routes/menuItem');
const orderRouter = require('./routes/order');
const notificationRouter = require('./routes/notification');
const ratingsRouter = require('./routes/rating');
const orderItemRouter = require('./routes/orderItem');
const userRouter = require('./routes/user');
const { authRouter } = require('./routes/auth');



dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    return res.send("delivery APP backend")
})

app.use('/auth',authRouter);
app.use('/menuItem', menuItemRouter);
app.use('/notification', notificationRouter);
app.use('/order', orderRouter);
app.use('/orderItem', orderItemRouter);
app.use('/rating', ratingsRouter);
app.use('/restaurant', restRouter);
app.use('/user', userRouter);



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
