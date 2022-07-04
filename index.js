const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 2000;

const geners = [
  { id: 1, gener: 'comdey' },
  { id: 2, gener: 'action' },
  { id: 3, gener: 'thriller' }
];

app.get('/', (req, res) => {
  res.send('Welcome to videly');
});

// Get all the geners
app.get('/api/geners', (req, res) => {
  res.send(geners);
});

//Get the particular gener
app.get('/api/geners/:id', (req, res) => {
  const matchGeners = geners.find((c) => c.id === parseInt(req.params.id));
  if (!matchGeners) res.status(404).send('The gener is not found');
  res.send(matchGeners);
});

//Add new gener
app.post('/api/geners', (req, res) => {
  const { error } = validateGener(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  console.log(req.body, 'this si requiest');
  const gener = { id: geners.length + 1, gener: req.body.gener };
  geners.push(gener);
  res.send(gener);
});

//Edit the existing gener
app.put('/api/geners/:id', (req, res) => {
  const copiedValue = [...geners];
  const matchGener = copiedValue.find((c) => c.id === parseInt(req.params.id));
  if (!matchGener) res.status(404).send('The course is not found');

  const { error } = validateGener(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  matchGener.gener = req.body.gener;
  console.log(copiedValue);
  res.send(matchGener);
});

//Validate the gener
function validateGener(gener) {
  const scheme = Joi.object({
    gener: Joi.string().min(3).required()
  });
  return scheme.validate(gener);
}

app.listen(port, () => console.log(`server is running ${port}`));
