import mongoose, { Schema, Document } from 'mongoose';

interface Item {
    code: string;
    price: number;
    quantity: number;
    totalOfItem: number;
}

interface UserCart extends Document {
    userName: string;
    itemList: Item[];
}

const UserCartchema: Schema = new Schema(
    {
        userName: {
            required: true,
            type: String,
            unique: true,
            index: true
        },

        itemsList: [
            {
                code: { required: true, type: String,},
                quantity: {required: true,type: Number},
                price: {required: true,type: Number},
                totalOfItem: {required: true,type: Number}
            }
        ]
    },
    { versionKey: false }
);

const UserCart = mongoose.model<UserCart>('userCart', UserCartchema);

export default UserCart;
