import { Schema, model, models } from "mongoose";

const CollectionSchema =  Schema({
        type: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true,
            unique: true
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        placeholder: {
            type: String,
            required: true,
            default : 'NA'
        },
        banner: {
            type: String,
            required: true,
            default : 'NA'
        },
});

const Collection = models.Collection || model('Collection', CollectionSchema);

export default Collection;