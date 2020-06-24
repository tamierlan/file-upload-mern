const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan') // to get info for each request
const bodyParser = require('body-parser')
const cors = require('cors') //tp allow different domains
const path = require('path')

const app = express()

app.use('/uploads', express.static('uploads')) //use upload folder to save image
// Connect mongodb in local you can use atlas
mongoose.connect('mongodb+srv://tamerlan:tamerlan12@cluster0-bdr3x.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
.then(() => console.log('DB Connected'));

// check connet to db
mongoose.connection.on('error', err => {
  console.log("DB Connection error" + err.message)
})

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors())

app.use('/api', require('./routes/category.route.js'))

// Page not found 404
app.use((req, res) => {
  res.status(404).json({
    errors: 'page not found'
  })
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
