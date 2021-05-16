import express from 'express';
import dotenv from 'dotenv';
import formidable from 'formidable';
import https from 'https';
const paymentRouter = express.Router();
import {v4 as uuidv4} from 'uuid';

dotenv.config();

paymentRouter.post('/callback', (req, res) => {
    const form = new formidable.Incomingform();

    form.parse(req,(err,fields,file)=> {
        var PaytmChecksum = require("./PaytmChecksum");

        paytmChecksum = fields.CHECKSUMHASH;
        delete fields.CHECKSUMHASH;

        var isVerifySignature = PaytmChecksum.verifySignature(fields, process.env.PAYTM_MERCHANT_KEY, paytmChecksum);
        if (isVerifySignature) {

            var paytmParams = {};

            /* body parameters */
            paytmParams.body = {

                /* Find your MID in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */
                "mid" : fields.MID,

                /* Enter your order id which needs to be check status for */
                "orderId" : fields.ORDER_ID,
            };

            /**
            * Generate checksum by parameters we have in body
            * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
            */
            PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.PAYTM_MERCHANT_KEY).then(function(checksum){
                /* head parameters */
                paytmParams.head = {

                    /* put generated checksum value here */
                    "signature"	: checksum
                };

                /* prepare JSON string for request */
                var post_data = JSON.stringify(paytmParams);

                var options = {

                    /* for Staging */
                    hostname: 'securegw-stage.paytm.in',

                    /* for Production */
                    // hostname: 'securegw.paytm.in',

                    port: 443,
                    path: '/v3/order/status',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': post_data.length
                    }
                };

                // Set up the request
                var response = "";
                var post_req = https.request(options, function(post_res) {
                    post_res.on('data', function (chunk) {
                        response += chunk;
                    });

                    post_res.on('end', function(){
                        console.log('Response: ', response);
                    });
                });

                // post the data
                post_req.write(post_data);
                post_req.end();
            });
                console.log("Checksum Matched");
            } else {
                    console.log("Checksum Mismatched");
                    }
    })
})

paymentRouter.post('/payment', (req, res) => {

    const {totalPrice, email} = req.body();

    const totalAmount = JSON.stringify(totalPrice);
    /* import checksum generation utility */
    var params = {};

    /* initialize an array */
    params['MID'] = process.env.PAYTM_MID,
    params['WEBSITE'] = process.env.PAYTM_WEBSITE,
    params['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID,
    params['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID,
    params['ORDER_ID'] = uuidv4(),
    params['CUST_ID'] = process.env.PAYTM_CUST_ID,
    params['TXN_AMOUNT'] = totalAmount,
    params['CALLBACK_URL'] = 'http://localhost:5000/api/callback',
    params['EMAIL'] =email,
    params['MOBILE_NO'] = '9876543210'

    /**
    * Generate checksum by parameters we have
    * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
    */
    var paytmChecksum = PaytmChecksum.generateSignature(params, process.env.PAYTM_MERCHANT_KEY,);
    paytmChecksum.then(function(checksum){
        let paytmParams={
            ...params,
            "CHECKSUMHASH":checksum
        }
        res.json(paytmParams)
    }).catch(function(error){
        console.log(error);
    });
});

export default paymentRouter;