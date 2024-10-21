import bodyParser from 'body-parser';
import express, { Application, Request, Response, NextFunction } from 'express';
import { BadRequestError, NotFoundError } from './utils/ApiError';
import { ErrorHandler } from './middlewares/ErrorHandler';

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  throw new BadRequestError('User not found');
  res.status(200).json({ message: 'Hello World' });
});

app.use((req: Request) => {
  throw new NotFoundError(req.path);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  ErrorHandler.handle(err, req, res, next);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
