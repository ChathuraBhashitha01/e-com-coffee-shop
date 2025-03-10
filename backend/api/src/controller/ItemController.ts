import { Request, Response, NextFunction } from 'express';
import Item from '../model/Item';

const BookController = {
    getAllItems: async (req: Request, res: Response, next: NextFunction) => {
        try {
            
        } catch (error) {

        }
    },
    
    findItemByCode: async (req: Request, res: Response, next: NextFunction) => {
        try {
           
        } catch (err) {
          
        }
    },

    findItemByName: async (req: Request, res: Response, next: NextFunction) => {
        try {
           
        } catch (err) {
          
        }
    },

    findItemsByCategory: async (req: Request, res: Response, next: NextFunction) => {
        try {
            
        } catch (err) {
           
        }
    },

    createItem: async (req: Request, res: Response, next: NextFunction) => {
        try {

        } catch (err) {

        }
    },

    updateItem: async (req: Request, res: Response, next: NextFunction) => {
        try {
          
        } catch (err) {
           
        }
    },

    deleteItem: async (req: Request, res: Response, next: NextFunction) => {
        try {
           
        } catch (err) {
           
        }
    },
};

export default BookController;