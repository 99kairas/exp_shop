const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

const app = express()
dotenv.config()

let whitelist = ['http://localhost:8080']
let corsOption = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) != -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOption))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
})) // BERFUNGSI MENGIRIMKAN DATA DARI CLIENT

const db = require('./models')
const seed = require('./models/seeds')
db.sequelize
    // .sync({ force: true }) // BUAT DROP TABLE SAMA IMPORT ULANG DISARANKAN SEKALI AJA 
    .sync({})
    .then(() => {
        // seed.userSeed()
        // seed.categorySeed()
        console.log(`database connected`)
    })

    .catch((err) => {
        console.error(`database connection failed`, err.message)
    })

app.get('/', (req, res) => {
    res.json({
        message: `server is running ...`
    })
})

require('./routes/auth.route')(app)
require('./routes/profile.route')(app)

const PORT = process.env.APP_PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})