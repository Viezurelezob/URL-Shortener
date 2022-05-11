// aici stocam short url information

const mongoose= require('mongoose')
const shortId = require('shortid') // short id e o librarie care sa ne genereze id-uri mai scurte

const shortUrlSchema = new mongoose.Schema({
    // astea o sa fie coloane cu informatiile pe care i le dam
    full: { // full e doar numele coloanei din data de baze
        type: String,
        required:true
    },
    short:{
        type: String,
        required:true,
        default: shortId.generate // de fiecare data cand cream un short url ,se genezereaz un short id si se salveaza in short collumn
    },
    clicks: {
        type: Number,
        required:true,
        default:0
    }
})

module.exports = mongoose.model('ShortUrl',shortUrlSchema)





