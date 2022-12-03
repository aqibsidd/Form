const { application } = require('express')
const express = require('express')
const bodyParser = require('body-parser')
const {check, validationResult} = require('express-validator')
const app = express()
const port = 5000

app.set('view engine','ejs')
app.engine('ejs', require('ejs').__express);

const urlencoderParse = bodyParser.urlencoded({extended: false})
app.use(urlencoderParse);
let formValidation=[
    check('username','This username must be 4+ character long')
        .exists()
        .isLength({min: 4}),
    check('email','Email is not valid')
        .isEmail()
        .normalizeEmail(),
    check('password','password must 8 character')
        .isLength({min: 8}) 
]
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/register', (req, res) => {
    res.render('register')
})
let mydata=[];
app.post('/register',formValidation,(req, res) => {
    console.log(req.body);
    const error = validationResult(req)
    console.log(error);
    if(!error.isEmpty()){ 
        const alert = error.array()
        res.render('register',{
            alert
        })
    }else{
        mydata.push(req.body);
        res.render('register',{
            data:mydata
        })
    }      
})
app.listen(port, () => console.info(`App is listenin on port: ${port}`));
 