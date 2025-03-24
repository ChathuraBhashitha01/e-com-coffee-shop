import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import expressWinston from 'express-winston';
import DBConnection from './db/DBConnection';
import logger from './util/logger';
import itemRouter from './route/ItemRoute';
import userRouter from './route/UserRoute';
import paymentRouter from './route/PaymentRoute';
import userCartRouter from './route/UserCartRoute';
import authRouter from './route/authRoutes';

DBConnection();

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// app.engine('pug', require('pug').__express)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

// Routes
app.use('/api/v1/coffeShop/item', itemRouter);
app.use('/api/v1/coffeShop/user', userRouter);
app.use('/api/v1/coffeShop/payment', paymentRouter);
app.use('/api/v1/coffeShop/cart', userCartRouter);
app.use('/api/v1/coffeShop/auth', authRouter);

// Catch 404 
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

app.use(
    expressWinston.logger({
      winstonInstance: logger,
      meta: true, 
      msg: "HTTP {{req.method}} {{req.url}}", 
      expressFormat: true, 
      colorize: false, 
      ignoreRoute: function () {
        return false; 
      }
    })
  );
  
  app.use(
    expressWinston.errorLogger({
      winstonInstance: logger
    })
  );

export default app;
