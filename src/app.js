const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const routeMain = require('./routes/main.routes');
const routeAccount = require('./routes/account.routes');
const routeClient = require('./routes/client.routes');
const routeSummary = require('./routes/summary.routes');
const routeAuth = require('./routes/auth.routes')

dotenv.config();

//App
const app = express();

// Config

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use(routeMain);
app.use(routeAccount);
app.use(routeClient);
app.use(routeSummary);
app.use(routeAuth);

// Server
const PORT = process.env.PORT || 4000

app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
})