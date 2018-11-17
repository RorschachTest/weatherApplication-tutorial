const express = require('express');
const app = express();
const PORT = parseInt(process.env.PORT, 10) | 3003;

const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res)=>{
    res.render('index');
});

app.post('/', (req, res)=>{
    console.log(req.body.city);

    res.render('index');
});

app.listen(PORT, ()=>{
    console.log("server is listenting to ", PORT);
});