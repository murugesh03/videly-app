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

app.get('/api/geners', (req, res) => {
  res.send(geners);
});

app.get('/api/geners/:id', (req, res) => {
  const matchGeners = geners.find((c) => c.id === parseInt(req.params.id));
  if (!matchGeners) res.status(404).send('The gener is not found');
  res.send(matchGeners);
});

app.listen(port, () => console.log(`server is running ${port}`));
