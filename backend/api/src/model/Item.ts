import mongoose, { Schema, Document } from 'mongoose';

interface IBook extends Document {
    code: string;
    name: string;
    description: string;
    category: string;
    quantity: number;
    price: number;
    picture: string;
}

const CoffeeItemSchema: Schema = new Schema(
    {
        code: {
            required: true,
            type: String,
            unique: true,
            index: true
        },
        name: {
            required: true,
            type: String
        },
        description: {
            required: true,
            type: String
        },
        category: {
            required: true,
            type: String
        },
        quantity: {
            required: true,
            type: Number
        },
        price: {
            required: true,
            type: Number
        },
        picture: {
            required: false,
            type: String
        },
    },
    { versionKey: false }
);

const CoffeeItem = mongoose.model<IBook>('CoffeeItem', CoffeeItemSchema);

export default CoffeeItem;
