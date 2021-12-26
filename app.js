const express = require('express')
const path = require('path');

const app = express()
const port = process.env.PORT || 5001 // Heroku will need the PORT environment variable

app.use(express.static('unicorn-front/build'));
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'unicorn-front', 'build', 'index.html' ))
})

app.listen(port, () => console.log(`App is live on port ${port}!`))