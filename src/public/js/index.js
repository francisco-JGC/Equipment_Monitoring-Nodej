const monitoring = document.querySelector('#monitoring')
const computerBody = document.querySelector('.monitoring__body-computer')
const radioActions = document.querySelectorAll('input[name="action"]')
const optionsSSH = document.querySelector('#optionsSSH')
const optionsSNMP = document.querySelector('#optionsSNMP')
const community = document.querySelector('#community')

radioActions.forEach(radio => {
    radio.addEventListener('click', (e) => {
        if (e.target.attributes.id.value == 'ssh') {
            optionsSSH.style.display = 'block'
            optionsSNMP.style.display = 'none'
            community.style.display = 'none'
        }
        if (e.target.attributes.id.value == 'snmp') {
            optionsSSH.style.display = 'none'
            optionsSNMP.style.display = 'block'
            community.style.display = 'flex'
        }
        console.log(e.target.attributes.id)
    })
})

const newFormatDataText = text => text.replace(/\n/g, '<br>')

const fetchMonitoringComputer = async (data) => {
    const response = await fetch('/monitoring', {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return await response.json()
}

const errorFetchMonitoring = message => computerBody.innerHTML = `
<div>
    <strong${message}</strong>
</div>
`

const submitMonitoring = async (e) => {
    e.preventDefault();
    const options = []
    let community = ''
    let selected = undefined

    if(radioActions[0].checked){
        selected = e.currentTarget.optionsSSH
    }


    if(radioActions[1].checked){
        selected = e.currentTarget.optionsSNMP
        community = e.currentTarget.community.value
    }

    for (let i = 0; i < selected.length; i++) {
        if (selected[i].selected) {
            options.push(selected[i].value)
        }
    }
    let data = {}
    if(radioActions[1].checked){
        data = {
            ip: e.target.ip.value,
            options,
            community
        }    
    }else{
        data = {
            ip: e.target.ip.value,
            options
        }
    }

    const {
        status,
        resolve,
        message,
        ip
    } = await fetchMonitoringComputer(data)

    if (!status) return errorFetchMonitoring(message)

    const newResolve = resolve.map(element => newFormatDataText(element.stdout))
    const newResolveCommand = resolve.map(element => element.command)

    computerBody.innerHTML += UItemplateFetchingComputer(ip, newResolve, newResolveCommand)

    const spanIntervalCount = document.querySelector(`.interval${ip.substr(ip.length - 2)}`)

    let count = 5;
    setInterval(async () => {
        if (count >= 0) {
            spanIntervalCount.textContent = `Se actualizara en ${count} seg`
            count--
        } else {
            count = 5
        }

        if (count == 0) {
            const {
                resolve,
                ip
            } = await fetchMonitoringComputer(data)

            const bodyContent = document.querySelector(`.body${ip.substr(ip.length - 2)}`)
            bodyContent.innerHTML = ''

            const updateResolve = resolve.map(element => newFormatDataText(element.stdout))
            const updateResolveCommand = resolve.map(element => element.command)
            debugger;

            bodyContent.innerHTML += loadTemplatesData(updateResolve, updateResolveCommand)
        }
    }, 1000)
}

monitoring.addEventListener('submit', submitMonitoring)