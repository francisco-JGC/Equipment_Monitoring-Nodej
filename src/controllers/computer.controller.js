const { commandsSSH } = require('../utils/commandsSSH')
const { commandsSNMP } = require('../utils/commandsSNMP')
const { execCommands } = require('../utils/execCommands')

const Home = (req,res) => {
    res.render('index', { commandsSSH, commandsSNMP })
}

const Monitoring = async (req,res) => {
    const { ip, options,community } = req.body

    if(!ip && !options) return res.json({status: false, message: 'Ago salio mal, Verifique los parametros'})

    const resolve = []

    try{
        for(let i = 0; i < options.length; i++){
            let res = undefined
            if(community){
                res = await execCommands(ip, options[i], community)
            }else{
                res = await execCommands(ip, options[i])
            }
            resolve.push({command: options[i], stdout: res})
        }
    }catch(e){
        res.json({status : false, message: "No se pudideron traducir las peticiones"})
    }
    res.json({status : true, resolve, ip})
}

module.exports = {
    Home,
    Monitoring
}