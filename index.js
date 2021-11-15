const express = require("express");
const app = express();
app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateID = () => {
  let id = Math.floor(Math.random() * 100);
  return id;
};

app.get("/", (request, response) => {
  response.send("<h1> Hello World</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  const newPerson = {
    id: generateID(),
    name: body.name,
    number: body.number,
  };

  if (!body.name || !body.number) {
    return response.status(400).json({ error: " name or number is missing" });
  } else if (persons.some((p) => p.name === body.name)) {
    return response.status(403).json({ error: " name must be unique" });
  }

  persons = persons.concat(newPerson);
  response.json(newPerson);
});

app.get("/info", (request, response) => {
  const numberofpeople = persons.length;
  const date = new Date();
  response.send(`<p>Phonebook has info for ${numberofpeople} people</p>
  <p> ${date}</p>`);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`);
});