import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Payment from '../model/Payment';
import Item from '../model/Item';
import { error } from 'console';

const PaymentController = {
    createPayment: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            try {
                const { paymentID, date, total, itemsList } = req.body;

                const payment = new Payment({ paymentID, date, total, itemsList });
                await payment.save({ session });

                for (const item of itemsList) {
                    const isItemExist = await Item.findOne({code: itemsList.code})
                    if(!isItemExist){
                        const error: any = new Error("Item not found"); 
                        error.status = 404;
                        throw error;
                    }
                    await Item.updateOne(
                        { code: item.code },
                        { $inc: { qty: -item.itemCount } },
                        { session }
                    );
                }

                await session.commitTransaction();
                await session.endSession();
            }catch (error){
                await session.abortTransaction();
                await session.endSession();
                res.status(400).json({error: 'Invalied input provided'})
            }
        } catch (error) {
            next(error);
        }
    },

    findPayment: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const payments = await Payment.find();
            res.status(200).json(payments);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Something went wrong' });
        }
    },

    findPaymentByUserName: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user =req.params.username;
            const payments = await Payment.find({userName:user});
            res.status(200).json(payments);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Something went wrong' });
        }
    },

    findTotal: async (req: Request, res: Response, next: NextFunction) => {
        try {
            let total = 0;
            const currentDate = new Date().toISOString().split('T')[0];
            const payments = await Payment.find();

            for (const payment of payments) {
                if (payment.date.split('T')[0] === currentDate) {
                    total += payment.total;
                }
            }

            res.status(200).json(total);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Something went wrong' });
        }
    }
};

export default PaymentController;
