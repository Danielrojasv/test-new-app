import { Schema, model } from 'mongoose';

let newSchema = new Schema({
    new_id:{
        type: Number,
        unique: true,
    },
    title:{
        type: String,
    },
    author:{
        type: String,
    },
    url:{
        type: String,
    },
    date:{
        type: Date,
    },
    is_delete:{
        type: Boolean,
        default: false
    }
});

export default model('New', newSchema);