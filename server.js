const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const app = express()


mongoose.connect('mongodb://localhost:27017/url' , { // urlShortener asa se numeste data de baze in care punem informatiile
    useNewUrlParser:true, useUnifiedTopology:true
})

app.set('view engine', 'ejs')


//asa ii spunem aplicatiei ca folosim date de tip url
app.use(express.urlencoded({extended: false})) 


app.get('/', async (req,res) => {
    const shortUrls= await ShortUrl.find()
    res.render('index', {shortUrls:shortUrls}) // afisam html ul din index si shortUrls pe care urmeaza sa il cream
})

// create a short url and redirect back to the homepage
app.post('/shortUrls', async (req,res) => {
    await ShortUrl.create({ full : req.body.fullUrl})  // vrem sa accesam fullUrl din body
    res.redirect('/')

})

app.get('/:shortUrl', async (req, res) => {  // give me any route  that has information directly after the first  / 
    // cand short property = short Url , vrem sa gasim un model de scurtate a linkului
    const shortUrl = await ShortUrl.findOne({ short : req.params.shortUrl}) // informatiile apoi o sa fie salvate in variabila shortUrl, 
     
    if (shortUrl == null) return res.sendStatus(404)

    shortUrl.clicks++
    shortUrl.save()

    res.redirect(shortUrl.full)
})

 
app.listen(process.env.PORT || 5000)






