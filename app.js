const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const restRouter = require('./routes/restaurants');
const menuItemRouter = require('./routes/menuItem');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());


app.use('/restaurants',restRouter);
app.use('/menuitems',menuItemRouter);



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
