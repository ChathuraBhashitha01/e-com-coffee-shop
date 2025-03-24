import mongoose, { Schema, Document } from 'mongoose';

interface UserCart extends Document {
    userCartID:string;
    userName: string;
    code:string;
    price: number;
    quantity: number;
    totalOfItem: number;
}

const UserCartSchema: Schema = new Schema(
    {
        userCartID: { 
                required: true,  
                type: String,   
                unique: true,
                index: true
            },
        userName: { 
                required: true,  
                type: String
            },
        code: { 
                required: true, 
                type: String,
            },
        quantity: {
                    required: true,
                    type: Number
                },
        price: {   
                required: true,
                type: Number
            },
        totalOfItem: {
                required: true,
                type: Number
            },
        
    },
    { versionKey: false }
);

const UserCart = mongoose.model<UserCart>('userCart', UserCartSchema);

export default UserCart;
