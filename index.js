const express = require('express');

const app = express();

app.use(express.json());

let notes = [
  {
    id: 1,
    content: 'content 1',
    date: '2019-05-23T17:31:31.098z',
    important: true,
  },
  {
    id: 2,
    content: 'content 2',
    date: '2019-05-24T17:32:31.098z',
    important: false,
  },
  {
    id: 3,
    content: 'content 3',
    date: '2019-05-25T17:33:31.098z',
    important: true,
  },
]

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' });
//   response.end(JSON.stringify(NOTES));
// })

app.get('/', (request, response) => {
  response.send('<h1>Hello world</h1>')
})

app.get('/notes', (request, response) => {
  response.json(notes);
})

app.get('/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find(note => note.id === id);
  note ? response.json(note) : response.status(400).end();
})

app.del('/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter(note => note.id !== id);
  response.status(202).end();
})

app.post('/notes', (request, response) => {
  const note = request.body;

  if (!note || !note.content) {
    response.status(400).json({
      error: 'note.content is missing'
    })
  }

  const ids = notes.map(note => note.id);
  const newNote = {
    id: Math.max(...ids) + 1,
    content: note.content,
    important: !!note.important,
    date: new Date().toISOString,
  }
  notes = [...notes, newNote];
  response.status(201).json(newNote);
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
