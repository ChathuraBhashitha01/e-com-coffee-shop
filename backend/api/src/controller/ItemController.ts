import { Request, Response, NextFunction } from 'express';
import Item from '../model/Item';

const BookController = {
    getAllItems: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const itemData = await Item.find();
            res.status(200).json(itemData);
        } catch (error) {
            next(error);
        }
    },
    
    findItemByCode: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const code = req.params.code;

            const isItemExist = await Item.findOne({code: code})
            if(!isItemExist){
                res.status(404).json({error:"Item not found"});
            }

            const item= await Item.findOne({code:code});
            res.status(200).json(item);
        } catch (error) {
            next(error);
        }
    },

    findItemByName: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const name = req.params.name;

            const isItemExist = await Item.findOne({name: name})
            if(!isItemExist){
                res.status(404).json({error:"Item not found"});
            }

            const item = await Item.findOne({name: name});
            res.status(200).json(item);
        } catch (error) {
            next(error);
        }
    },

    findItemsByCategory: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const category = req.params.category;

            const isItemExist = await Item.findOne({category: category})
            if(!isItemExist){
                res.status(404).json({error:"Items not found"});
            }

            const item=await Item.find({category: category});
            res.status(200).json(item);
        } catch (error) {
            next(error);
        }
    },

    createItem: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const itemData = req.body;

            const isItemExist = await Item.findOne({code: itemData.code})
            if(isItemExist){
                res.status(409).json({error:"Item Already Exist"});
            }

            const item = await Item.create(itemData);
            if(item){
                res.status(201).json({message:"Item created successfully"});
            } else {
                res.status(400).json({error:"Invalied input provided"});
            }
           
        } catch (error) {
            next(error);
        }
    },

    updateItem: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const code = req.params.code;
            const itemData = req.body;

            const isItemExist = await Item.findOne({code: code})
            if(!isItemExist){
                res.status(404).json({error:"Item not found"});
            }

            const item = await Item.findOneAndUpdate({code:code}, itemData,{ new: true});
            if(item){
                res.status(200).json({message:"Item updated successfully"});
            } else {
                res.status(400).json({error:"Invalied input provided"});
            }
        } catch (error) {
            next(error);
        }
    },

    deleteItem: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const code = req.params.code;

            const isItemExist = await Item.findOne({code: code})
            if(!isItemExist){
                res.status(404).json({message:"Item not found"});
            }

            const item = await Item.findOneAndDelete();
            if(item){
                res.status(200).json({message:"Item removed successfully"});
            } 
        } catch (error) {
            next(error);
        }
    },
};

export default BookController;