import bodyParser from 'body-parser';
import express, { Application, Request, Response, NextFunction } from 'express';

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  throw new Error('User not found');
  res.status(200).json({ message: 'Hello World' });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(400).json({ success: false, message: err.message });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
