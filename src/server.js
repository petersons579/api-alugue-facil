const express = require('express');
const path = require('path');
const cors = require('cors');
const routes = require('./routes');

require('./database');

const app = express();
app.use(cors());
app.use('/files', express.static(path.join(__dirname, '../tmp/uploads')));
app.use(express.json());
app.use(express.urlencoded({  extended: true }));
app.use(routes);

app.listen('21204');