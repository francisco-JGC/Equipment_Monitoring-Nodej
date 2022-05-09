const UIfetchingDataComputer = (text, command) => {
    return `
    <div class="computer-body">
        <div class="computer-fetching">
            <span>${command}</span>
        </div>
    
        <div>
            <pre class="data">
                ${text}
            </pre>
        </div>
    </div>
    `
}

const loadTemplatesData = (resolve, resolveCommand) => resolve.map((element , i) => 
    UIfetchingDataComputer(element, resolveCommand[i])
)

const UItemplateFetchingComputer = (ip, resolve, resolveCommand) => {

    return `
    <div class="computer">
    <div class="computer-header">
        <div class="computer-state">
            <h5>${ip}</h5>
            <span class="interval${ip.substr(ip.length - 2)}"></span>
        </div>
        <div class="computer-delete">
            <span>X</span>
        </div>
    </div>
        <div class="body${ip.substr(ip.length - 2)}">
            ${loadTemplatesData(resolve, resolveCommand)}
        <div>
    </div>
    `
}