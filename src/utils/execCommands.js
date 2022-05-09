const util = require('util')
const exec = util.promisify(require('child_process').exec)

exports.execCommands = async (ip, option, community) => {
    try{
        console.log(`${ip} ${option} ${community}`)
        if (community){
            const { stdout } = await exec(`snmpget -v1 -c ${community} ${ip} ${option}`)
            return stdout
        }

        const { stdout, stderr } = await exec(`./monitorizacion.sh ${ip} ${option}`)
        
        if(stderr) return "Algo salio mal, vuelva a intentarlo"

        return stdout
    }catch(e){
        console.log('ERROR: ' + e.message)
        return
    }
}