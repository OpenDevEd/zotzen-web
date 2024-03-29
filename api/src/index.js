import express from 'express';
import cors from 'cors';
import passport from 'passport';
import bodyParser from 'body-parser';
import { errors } from 'celebrate';
import routes from './routes';

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use('/api', routes);
app.use('*', (req, res) =>
  res.status(404).json({
    message: 'API endpoint not found!',
  })
);
app.use(errors());
export default app;
