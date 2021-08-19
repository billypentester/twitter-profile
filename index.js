const express = require('express')
const request = require('request')
const path = require('path')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000

const statweb = path.join(__dirname, "/public")
const tempweb = path.join(__dirname, "/public")
// const partial = path.join(__dirname, "/web/partials")

app.use(express.static(statweb))
app.set('views', tempweb);
app.set("view engine", "hbs")
// hbs.registerPartials(partial)

app.get('/', (req, res) => {
    res.send('welcome to the app.')
})

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/:name', (req, res) => {
    
    var name = req.params.name

    var web = 'http://nitter-scrap.herokuapp.com' 

    var url = web + '/' + name

    console.log(url)

    request(url, function (error, response, body) {
        if (error) console.error('error:', error); 
        if(response) console.log('statusCode:', response && response.statusCode);
        try 
        {

            var obj = JSON.parse(body)
    
            res.render("index", {
              name : `${obj.data.name}`,
              uname : `${obj.data.username}`,
              bio : `${obj.data.bio}`,
              location : `${obj.data.location}`,
              link : `${obj.data.website}`,
              join : `${obj.data.joindate}`,
              tweets : `${obj.data.tweets}`,
              following : `${obj.data.following}`,
              followers : `${obj.data.followers}`,
              likes : `${obj.data.likes}`,
              banner : `${obj.data.banner}`,
              profile : `${obj.data.profile}`,
            })
    
        } 
        
        catch (e) 
        {
            console.log('error occured........')
        } 
    })      

})




app.listen(port, () => {
    console.log(`Example app listening on port port!`)
})
