import mongoose, { Schema } from "mongoose";

export interface ExternalProduct {
    externalId: {type: string, unique: true},
    id: number,
    title:string,
    completed: boolean,
    source: {type: string, default: "external-api"}
}

const externalProductSchema = new Schema<ExternalProduct>({
    externalId:{
        type: String,
        unique: true
    },
    id:{
        type: Number
    },
    title:{
        type: String
    },
    completed:{
        type: Boolean
    }

},
{timestamps: true}
);

export const ExternalProduct = mongoose.model('ExternalProduct', externalProductSchema);