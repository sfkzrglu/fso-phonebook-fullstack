require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', function (req, res) {
    return JSON.stringify(req.body)
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: "malformatted id" })
    }
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use((req, res, next) => {
    console.log('Request URL:', req.originalUrl);
    next();
});

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', async (request, response) => {
    try {
        const countPerson = await Person.countDocuments({})
        console.log(countPerson);
        const html = `<div>Phonebook has info for ${countPerson} people </div>
        <br/>
        <div>${Date()}</div>`
        response.send(html)
    } catch (error) {
        console.log("Error counting documents", error);
    }

})

app.get('/api/person/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            return response.json(person)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            return response.status(204).end()
        })
        .catch(error => next(error))
})


app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'missing name or number'
        })
    }

    // if (persons.find(person => person.name === body.name)) {
    //     return response.status(400).json({
    //         error: 'name must be unique'
    //     })
    // }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(person => {
        response.json(person)
    })

    //return response.json(person)
})

app.put("/api/persons/:id", (request, response, next) => {
    const { name, number } = request.body

    Person.findById(request.params.id)
        .then(person => {
            if (!person) {
                return response.status(404).end()
            }
            person.name = name
            person.number = number

            return person.save().then(updatedPerson => {
                response.json(updatedPerson)
            })
        })
        .catch(error => next(error))

})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})