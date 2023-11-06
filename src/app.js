const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8000;
const hbs = require('hbs');
const conn = require('./db/conn'); 

const formData = require('./models/formDetails');
const basicDetail = require('./models/formAllDetails')
// Set up static paths
const templatePath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');
const staticPath = path.join(__dirname, '../public');

// Middleware for form data
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
app.use(express.static(staticPath));

// Set up the view engine
app.set('view engine', 'hbs');
app.set('views', templatePath);
hbs.registerPartials(partialPath);

app.get('/', (req, res) => {
  res.render('index');
  // res.send(req.body)
});
app.post('/', async (req, res) => {
  // console.log('Received form data:', req.body);
  try {
    const Data = new formData(req.body);
    await Data.save();
   res.status(201).render('mainpage');
   
  } catch (error) {
    console.error('Error saving data:', error); // Log the specific error
    res.status(500).send(error);
  }
});
// 2nd collection data add in mongoose
app.get('/mainpage', (req, res) => {
  res.render('mainpage');
  // res.send(req.body)
});
app.post('/mainpage', async (req, res) => {
  // console.log('Received form data:', req.body);
  try {
    const Data1 = new basicDetail(req.body);
    await Data1.save();
   res.status(201).render('index');
   
  } catch (error) {
    console.error('Error saving data:', error); // Log the specific error
    res.status(500).send(error);
  }
});

app.get('*', (req, res) => {
  res.render('error', {
    errorMsg: 'Oops, page not found',
  });
});
// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
