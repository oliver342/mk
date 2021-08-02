const WebSocket = require('ws');
const fs = require('fs');
const port = process.env.PORT || 8989;
const wss = new WebSocket.Server({ port });
wss.on('connection', function connection(ws, req) {
    const ip = req.headers['x-forwarded-for'].split(',')[0].trim();
    const id = req.headers['sec-websocket-key'];
    ws.on('message', function incoming(data) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
               client.send("'ip':'" + ip + "','id':'" + id + "',message:" + data);
		    var x= "ip:" + ip + "id:" + id + "message:"+data;
		    
 fs.appendFile('message.txt', x, function (err) {
  if (err) throw err;
  console.log('Saved!');
});
            }
        });
    });
    ws.on('close', function incoming(data) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
            	client.send("'ip':'" + ip + "','id':'" + id + "','message:closed");
               
            }
        });
    });
    		  var idx = setInterval(function() {
		    ws.send(JSON.stringify(new Date()), function() {  })
		  }, 10000)
});
