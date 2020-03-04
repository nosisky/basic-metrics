import express from 'express';
import winston from 'winston';
import bodyParser from 'body-parser';
import MetricRoutes from './server/routes/MetricRoutes';

const server = express();
const port = process.env.PORT || 3000;
server.use(bodyParser.json());
server.use('/api/v1', MetricRoutes);

server.get('*', (req, res) => {
    res.send({
        message: "Welcome to the Metrics logger API"
    })
});


if (process.env.NODE_ENV !== "test") {
    server.listen(port);
    winston.info(`App connected to port: ${port}`);

}


export default server;