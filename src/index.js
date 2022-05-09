const express = require('express')
const path = require('path')
const indexRouter = require('./routes')
const homeRouter = require('./routes/computer')

const app = express();

app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, '/public')))

app.use('/', homeRouter)
app.use('/', indexRouter)

app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`)
})
