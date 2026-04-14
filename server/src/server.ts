import express, { Request, Response } from 'express';
import { configureCORS } from './middlewares/cors-middleware.js';
import { errorMiddleware } from './middlewares/error-middleware.js';
import friendRouter from './routes/friends-route.js';
const connectDatabase = require('./database/db.js');

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

connectDatabase();

configureCORS(app);

app.use(errorMiddleware);

app.use('/friends', friendRouter);

app.use((req: Request, res: Response) => {
    res.status(404).json({
        message: 'Rota não encontrada.',
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
