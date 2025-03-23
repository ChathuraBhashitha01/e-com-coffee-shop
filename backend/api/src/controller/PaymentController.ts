import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Payment from '../model/Payment';
import Item from '../model/Item';

const PaymentController = {
    createPayment: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const session = await mongoose.startSession();
            session.startTransaction();
        
            try {
                const { paymentID, userName, date, total, itemsList } = req.body;
        
                const payment = new Payment({ paymentID, userName, date, total, itemsList });
                await payment.save({ session });
                
                for (const item of itemsList) {
                    const isItemExist = await Item.findOne({ code: item.code }).session(session);
        
                    if (!isItemExist) {
                        throw new Error(`Item with code ${item.code} not found`);
                    }
        
                    await Item.updateOne(
                        { code: item.code },
                        { $inc: { quantity: -item.itemCount } },
                        { session }
                    );
                }

                await session.commitTransaction();
                res.status(201).json();  
            } catch (error) {
                await session.abortTransaction();
                console.log(error)
                res.status(400).json({ error: "Invalid input provided"});  
            } finally {
                await session.endSession();   
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
          next(error)
        }
    },

    findPaymentByUserName: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user =req.params.username;
            const payments = await Payment.find({userName:user});
            res.status(200).json(payments);
        } catch (error) {
            next(error)
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
            next(error)
        }
    }
};

export default PaymentController;
