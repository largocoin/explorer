var request = require('request');
 
var base_url = 'https://exchange-open-api.coineal.com';
function get_summary(coin, exchange, cb) {
    var summary = {};
    request({uri: base_url + '/open/api/get_ticker?symbol='+coin.toLowerCase()+exchange.toLowerCase(), json: true}, function (error, response, body) {
        if (error) {
            return cb(error, null);
        } else if (body.msg === "suc") {
            summary['bid'] = parseFloat(body.data['buy']).toFixed(8);
            summary['ask'] = parseFloat(body.data['sell']).toFixed(8);
            summary['volume'] = body.data['vol'];
            summary['high'] = parseFloat(body.data['high']).toFixed(8);
            summary['low'] = parseFloat(body.data['low']).toFixed(8);
            summary['last'] = parseFloat(body.data['last']).toFixed(8);
            summary['change'] = '';
            return cb(null, summary);
        } else {
            return cb(error, null);
        }
    });
}
function get_trades(coin, exchange, cb) {
    return cb(null, []);
}

function get_orders(coin, exchange, cb) {
  return cb(null, []);
}


module.exports = {
    get_data: function (coin, exchange, cb) {
        var error = null;
        get_orders(coin, exchange, function (err, buys, sells) {
            if (err) { error = err; }
            get_trades(coin, exchange, function (err, trades) {
                if (err) { error = err; }
                get_summary(coin, exchange, function (err, stats) {
                    if (err) { error = err; }
                    return cb(error, { buys: buys, sells: sells, chartdata: [], trades: trades, stats: stats });
                });
            });
        });
    }
};

