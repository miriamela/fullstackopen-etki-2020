const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const Person = require("./models/person");

const app = express();
app.use(express.static("build"));
app.use(express.json());
app.use(cors());

//MORGAN creating token for logging info about newContact in case the request is POST
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
// GET info
app.get("/api/persons/info", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.send(
        `<p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}</p>`
      );
    })
    .catch((error) => next(error));
});
// GET complete api
app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons);
    })
    .catch((error) => next(error));
});
// GET specific contact
app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      }
    })
    .catch((error) => next(error));
});
// PUT change the phone number
app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;
  const person = {
    number: body.number,
  };
  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
  })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => next(error));
});
// DELETE contact
app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((res) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

// POST create a new contact
app.post("/api/persons", (req, res, next) => {
  const body = req.body;
  const name = body.name;
  const number = body.number;
  if (!name) {
    return res.status(400).json({
      error: "name missing",
    });
  } else if (!number) {
    return res.status(400).json({
      error: "number missing",
    });
  }

  const person = new Person({
    name: name,
    number: number,
  });

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => next(error));
});
// handling errors
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).send({ error: error.message });
  }
  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
