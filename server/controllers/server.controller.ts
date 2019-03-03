import * as express from "express";
import * as mongoose from "mongoose";
import { CronJob } from "cron";
import { New } from "./news.controller";

export class Server{
    public app = express.application;

    constructor(private port: number){
        this.app = express();
    }

    start(callback: Function){
        //Deprecaciones de mongoose
        mongoose.set('useCreateIndex', true);
        mongoose.set('useFindAndModify', false);
        mongoose.connect('mongodb://localhost:27017/news',{ useNewUrlParser: true }, (err) => {
            if(err) throw err;
            console.log("Connect db successfull");
        });
        // cron cada hora
        const newController = new New();
        new CronJob('0 */1 * * *', newController.synchronizeAll , null, true, 'America/Los_Angeles');

        this.app.listen( this.port, callback);
    }

    static init(port:number): Server{
        return new Server(port);
    }
}