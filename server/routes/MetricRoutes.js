import express from 'express';
import loki from 'lokijs';

const db = new loki('metricStore');
const metric = db.addCollection('metrics');

const MetricRouter = express.Router();

MetricRouter.route('/metric/:key').post(function(req, res){
    const { body: { value }, params: { key } } = req;
    if(!value || !/\d/.test(value)){
         res.status(400).send({
            message: 'Please insert numeric metric log value'
        })
        return;
    }
   if(key === 'active_visitors'){
    const metricsValue = req.body.value;
    const timestamp = new Date();
    metric.insert({
        value: metricsValue,
        timestamp
    });

    return res.status(200).send({
        message: "Metrics logged successfully!"
    })
   } else {
       res.status(400).send({
           message: 'Unrecognized key!'
       })
   }

});

MetricRouter.route('/metric/:key/sum').get(function(req, res){
    if(req.params.key === 'active_visitors'){
        let metricCount = 0;
        metric.where(function(obj) {
            const ONE_HOUR = 60 * 60 * 1000;
             if(((new Date) - new Date(obj.timestamp)) <= ONE_HOUR)
                metricCount += Number(obj.value);
        });
        res.send(String(metricCount));
    } else {
        res.status(400).send({
            message: 'Unrecognized key!'
        })
    }
});

export default MetricRouter;