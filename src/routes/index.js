const router = require('express').Router()
const fs = require('fs')

const pathRouter = `${__dirname}`
const removeExtension = file => file.replace(/\.[^/.]+$/, "")

fs.readdirSync(pathRouter).forEach(file => {
    if (file.includes('.js') && file !== 'index.js'){
        const routeName = removeExtension(file);
        router.use(`/${routeName}`, require(`./${file}`))
    }
})

router.get('*', (req,res) => {
    res.status(404).send('404 NOT FOUND')
})

module.exports = router