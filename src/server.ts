import express, { Application, NextFunction, Request, Response } from 'express';
import { ErrorHandler, throwError } from './helpers/ErrorHandler.helper';
import * as dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/index';
import cookieParser from 'cookie-parser';
import swaggerUi from "swagger-ui-express";
import swaggerSpec from './utils/swagger';


dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
// ============================================================
// Reconfig origin later
// ============================================================
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });

app.use(`${process.env.BASE_ROUTE}`, router)


// Swagger page
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Docs in JSON format
app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});

app.use(ErrorHandler);

app.use('*', (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send({ message: "Route not found" })
});


console.info(`Docs available at http://localhost:${PORT}/docs`);

app.listen(PORT, () => {
    console.log(`App listening at: ${PORT}`);
});