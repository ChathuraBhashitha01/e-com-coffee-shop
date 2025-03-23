import mongoose, { Schema, Document } from 'mongoose';

interface Item {
    code: string;
    name: string;
    price: number;
    itemCount: number;
}

interface Payment extends Document {
    paymentID: string;
    userName: string;
    date: string;
    total: number;
    itemsList: Item[];
}

const PaymentSchema: Schema = new Schema(
    {
        paymentID: {
            required: true,
            type: String,
            unique: true,
            index: true
        },
        userName: {
            required: true,
            type: String
        },
        date: {
            required: true,
            type: String
        },
        total: {
            required: true,
            type: Number
        },
        itemsList: [
            {
                code: { type: String, required: true },
                name: { type: String, required: true },
                price: { type: Number, required: true },
                itemCount: { type: Number, required: true }
            }
        ]
    },
    { versionKey: false }
);

const Payment = mongoose.model<Payment>('Payment', PaymentSchema);

export default Payment;
