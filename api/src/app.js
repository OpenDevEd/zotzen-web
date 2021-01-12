import app from './index';
import connection from './config/connections';
const PORT = process.env.PORT || 5000;

connection().then(() => {
  app.listen(
    PORT,
    () =>
      process.env.NODE_ENV === 'development' &&
      console.log(`Listening on port ${PORT}`)
  );
});
