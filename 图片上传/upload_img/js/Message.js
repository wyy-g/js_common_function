export default function Message(type, message) {
    const msgDiv = document.createElement('div')
    msgDiv.innerHTML = message
    msgDiv.className = 'message'
    // msgDiv.style.width = 500 + 'px'
    // msgDiv.style.height = 40 + 'px'
    // msgDiv.style.position = 'absolute'
    // msgDiv.style.top = '12%'
    // msgDiv.style.left = '50%'
    // msgDiv.style.transform = 'translate(-50%, -50%)'
    switch (type) {
        case 'error':
            msgDiv.classList.add('error')
            break;
        case 'success':
            msgDiv.classList.add('success')
            break;
        default:
            break;
    }
    document.body.appendChild(msgDiv)
    setTimeout(() => {
        document.body.removeChild(msgDiv)
    }, 1500)
}