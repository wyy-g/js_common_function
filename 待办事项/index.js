; (() => {
    const oTodolistInput = document.querySelector('.todolist-input')
    const oTodolistAdd = document.querySelector('.todolist-add')
    const oUl = document.querySelector('.ul')


    const init = () => {
        bindEvent()
    }


    function bindEvent() {
        oTodolistAdd.addEventListener('click', handleAddEvent)
    }

    function handleAddEvent(e) {
        const inputValue = oTodolistInput.value.trim()
        if (!inputValue) return
        createLi(inputValue);
    }

    function createLi(inputValue) {
        const oLi = document.createElement('li');
        oLi.className = 'todolist-item'
        let oCheckbox = document.createElement('input')
        oCheckbox.setAttribute('type', 'checkbox')
        oLi.appendChild(oCheckbox)
        let oSpan = document.createElement('span')
        oSpan.innerHTML = inputValue
        oLi.appendChild(oSpan)
        let deleteBtn = document.createElement('button')
        deleteBtn.classList = 'delete noSelected'
        deleteBtn.innerHTML = '删除'
        deleteBtn.disabled = true
        oLi.appendChild(deleteBtn)
        oUl.appendChild(oLi)
        oCheckbox.addEventListener('click', function (e) { handleChecked(e, deleteBtn) })
        deleteBtn.addEventListener('click', function (e) { handeleDelEvent(oLi) })
    }


    function handeleDelEvent(oLi) {
        oUl.removeChild(oLi)
    }

    function handleChecked(e, deleteBtn) {
        if (e.target.checked) {
            deleteBtn.classList.remove('noSelected')
            deleteBtn.disabled = false
        } else {
            deleteBtn.classList.add('noSelected')
            deleteBtn.disabled = true
        }
    }



    init()

})()