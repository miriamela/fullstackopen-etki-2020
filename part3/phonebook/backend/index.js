const { json } = require("express");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
//this is just a logging method, instead of a long list of console.log, this gives you some info related with the request made to the server.
const app = express();
app.use(express.json());
app.use(cors());

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];
//creating token for logging info about newContact in case the request is POST
morgan.token("newContact", function (req, res) {
  const newContact = JSON.stringify({
    name: req.body.name,
    number: req.body.number,
  });
  return newContact;
});
// logging basic info in case the requests are get, delete etc.
app.use(
  morgan("tiny", {
    skip: function (req, res) {
      req.method === "POST";
    },
  })
);
// logging info in case method is POST.
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :newContact",
    {
      skip: function (req, res) {
        req.method !== "POST";
      },
    }
  )
);

app.get("/", (req, res) => {
  res.send(`<h1>Hello World!</h1>`);
});
app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}</p>`
  );
});
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

const generateId = () => {
  return Math.floor(Math.random() * Math.floor(1000));
};

app.post("/api/persons", (req, res) => {
  const body = req.body;
  const name = body.name;
  const number = body.number;
  const duplicate = persons.filter((person) => person.name === name);
  console.log(duplicate);
  if (!name) {
    return res.status(404).json({
      error: "name missing",
    });
  } else if (!number) {
    return res.status(404).json({
      error: "number missing",
    });
  } else if (duplicate.length > 0) {
    return res.status(404).json({
      error: "name should be unique",
    });
  }
  const person = {
    name: name,
    number: number,
    id: generateId(),
  };
  console.log(person);
  persons = persons.concat(person);
  res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
