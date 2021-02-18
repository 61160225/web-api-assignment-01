const MongoClient = require('mongodb').MongoClient
const express = require('express')

const app = express()
const url = 'mongodb+srv://superadmin:Nagi4659@cluster0.7iotp.mongodb.net/sample_weatherdata?retryWrites=true&w=majority'

const client = new MongoClient(url,{useNewUrlParser: true})

async function connect() {
    await client.connect()
}
connect()

app.get('/weather', async (req, res) => {
    try {
        await client.connect()
        const callLetters = req.query.callLetters

        const db = client.db('sample_weatherdata')
        const collection = db.collection('data')
        // http://localhost:3000/restaurants?callLetters=<value>&borough<value>
        // const query = { callLetters: callLetters, borough: borough}
        let query = {}
        if (callLetters) {
            query.callLetters = callLetters
        }

        const cursor = collection.find(query).limit(10)
        let weather = []
        await cursor.forEach(doc => weather.push(doc))
        
        res.send(weather)
    } catch (e) {
        console.error(e)
    }
})

app.listen(3000,console.log('Start application at port 3000'))