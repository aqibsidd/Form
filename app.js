const { application } = require('express')
const express = require('express')
const bodyParser = require('body-parser')
const {check, validationResult} = require('express-validator')
const app = express()
const port = 5000

app.set('view engine','ejs')
app.engine('ejs', require('ejs').__express);

const urlencoderParse = bodyParser.urlencoded({extended: false})

app.get('/', (req, res) => {
  res.render('index')
})
app.get('/register', (req, res) => {
    res.render('register')
})
app.post('/register', urlencoderParse,[
    check('username','This username must be 4+ character long')
        .exists()
        .isLength({min: 4}),
    check('email','Email is not valid')
        .isEmail()
        .normalizeEmail(),
    check('password','password must 8 character')
        .isStrongPassword()
        .isLength({min: 8})


], (req, res) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        //return res.status(422).jsonp(error.array())
        const alert = error.array()
        res.render('register',{
            alert
        })
    }
    res.json(req.body)
})
app.listen(port, () => console.info('App is listenin on port: ${port}'))
console.log("Aqib")