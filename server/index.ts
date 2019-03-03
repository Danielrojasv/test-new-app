import { Server } from "./controllers/server.controller";
import index from "./routes/index.route";
import news from "./routes/news.route";

const port = 4201;

const server = Server.init( port );

server.app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Method','OPTIONS, GET, POST, PUT, DELETE');

    if( 'OPTIONS' == req.method ){
        res.sendStatus(200);
    } else {
        console.log(`${ req.ip } ${ req.method } ${ req.url } `);
        next();
    }
});

server.app.use('/', index);
server.app.use('/api/news', news);

server.start(() => console.log(`Server started in port ${ port }`));