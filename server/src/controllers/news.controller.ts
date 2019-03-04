import { Request, Response } from 'express';
import NewSchema from '../models/new.model';
import axios from "axios";


export class New{
    
     constructor(){}

     synchronizeAll( req?: Request, res?: Response ){
        axios.get(`https://hn.algolia.com/api/v1/search_by_date?query=nodejs`)
        .then( resp => {
            let newsItems = resp.data.hits;
            for(let newItem of newsItems){
                let new_id = newItem.objectID;
                // if story_title is null, title is title
                let title = newItem.story_title;
                if(title == null){
                    title = newItem.title;
                    // if title is null, continue
                    if(title == null) continue;
                }
                
                let author = newItem.author;
                let date = new Date(newItem.created_at_i * 1000);
                // if story_url is null, url is title
                let url = newItem.story_url;
                if(url == null){
                    // if url is null, continue
                    url = newItem.url;
                }
                
                let newSchema = {
                    new_id,
                    title,
                    author,
                    date,
                    url
                };

                NewSchema.findOneAndUpdate(
                    {new_id}, 
                    newSchema,
                    {upsert: true, new: true, runValidators: true}, 
                    (err:any, newDB:any) => {
                        if( err ){
                            console.log("ERROR  ->"+err);
                        }
                        
                    }
                );
            }
            console.log(`Synchronize done at ${ new Date() }`);
            if(res){
                res.json({
                    ok: true,
                    message: `Synchronize done at ${ new Date() }`,
                }); 
            }
            
        })
        .catch(err => {
            console.log(err);
            if(res){
                res.status(400).json({
                    ok: false,
                    message: 'Error, please retry',
                    err
                });
            }
        });

     }

     getAll( req: Request, res: Response ){
        NewSchema.find(null, null, {
            sort:{
                date: -1 
            }
        })
        .exec( (err:any, news:any) => {
            if(err) {
                return res.status(400).json({
                    ok: false,
                    message: 'Error, please retry',
                    err
                });
            }
            if(res){
                res.json({
                    ok: true,
                    message: `news found`,
                    news
                }); 
            }
            

        });
     }

     deleteView( req: Request, res: Response ){
         let id = req.params.id;
         let errModule = false

         let newSchema = {
            is_delete: true,
        };

        NewSchema.findOneAndUpdate(
            {new_id : id}, 
            newSchema,
            {}, 
            (err:any, newDB:any) => {
                if( err ){
                    errModule = true;
                    console.log("ERROR  ->"+err);
                }
               
            }
        );

         if(errModule){
            return res.status(400).json({
                ok: false,
                message: 'Error, please retry',
                errModule
            });
         }
         
         res.json({
            ok: true,
            message: "done!"
        });
     } 
}