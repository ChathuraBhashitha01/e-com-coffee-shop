import { Request, Response, NextFunction } from 'express';
import UserCart from '../model/UserCart';

const BookController = {
    getAllUserCarts: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const itemData = await UserCart.find();
            res.status(200).json(itemData);
        } catch (error) {
            next(error);
        }
    },
    
    findUserCartByUserName: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const username = req.params.username;

            const isItemExist = await UserCart.findOne({userName: username})
            if(!isItemExist){
                res.status(404).json({error:"Item not found"});
            }

            const item= await UserCart.findOne({userName:username});
            res.status(200).json(item);
        } catch (error) {
            next(error);
        }
    },

    createUserCart: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const itemData = req.body;

            const isItemExist = await UserCart.findOne({userName: itemData.username})
            if(isItemExist){
                res.status(409).json({error:"Item Already Exist"});
            }

            const item = await UserCart.create(itemData);
            if(item){
                res.status(201).json({message:"Item created successfully"});
            } else {
                res.status(400).json({error:"Invalied input provided"});
            }
           
        } catch (error) {
            next(error);
        }
    },

    deleteUserCart: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const username = req.params.username;

            const isItemExist = await UserCart.findOne({userName: username})
            if(!isItemExist){
                res.status(404).json({message:"Item not found"});
            }

            const item = await UserCart.findOneAndDelete();
            if(item){
                res.status(200).json({message:"Item removed successfully"});
            } 
        } catch (error) {
            next(error);
        }
    },
};

export default BookController;