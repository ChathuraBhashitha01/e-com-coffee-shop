import { Request, Response, NextFunction } from 'express';
import UserCart from '../model/UserCart';
import Item from '../model/Item';

const UserCartController = {
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
            const userCartItems = await UserCart.find({ userName: username });

            if (userCartItems.length === 0) {
                 res.status(404).json({ error: "Items not found" });
            }

            const itemsWithDetails = await Promise.all(
                userCartItems.map(async (element) => {
                    const itemDetails = await Item.findOne({ code: element.code });

                    return {
                        userCartID: element.userCartID,
                        userName: element.userName,
                        code: element.code,
                        name: itemDetails?.name || "Unknown",
                        picture: itemDetails?.picture || "",
                        price: element.price,
                        quantity: element.quantity,
                        totalOfItem: element.totalOfItem,
                    };
                })
            );

            res.status(200).json(itemsWithDetails);
        } catch (error) {
            next(error);
        }
    },

    createUserCart: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userCartID, userName, code, price, quantity, totalOfItem } = req.body;

            const isItemExist = await UserCart.findOne({ userCartID });
           
            if (isItemExist) {
                 res.status(409).json({ error: "User Cart Already Exists" });
            }
            
            const item = await UserCart.create({userCartID:userCartID, userName:userName, code:code, price:price,  quantity:quantity, totalOfItem:totalOfItem});

            if (item) {
                 res.status(201).json({ message: "User Cart created successfully" });
            } else {
                 res.status(400).json({ error: "Invalid input provided" });
            }
        } catch (error) {
            next(error);
        }
    },

    deleteUserCart: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const username = req.params.username;

            const isItemExist = await UserCart.findOne({ userName: username });

            if (!isItemExist) {
                 res.status(404).json({ message: "Item not found" });
            }

            await UserCart.findOneAndDelete({ userName: username });

             res.status(200).json({ message: "Item removed successfully" });
        } catch (error) {
            next(error);
        }
    },
};

export default UserCartController;
