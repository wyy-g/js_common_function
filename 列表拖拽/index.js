const listData = [
    '111111111111',
    '222222222222',
    '333333333333',
    '444444444444',
    '555555555555',
    '666666666666',
    '777777777777',
    '888888888888',
    '999999999999'
]

    ; ((doc) => {
        const oDragList = doc.querySelector('.drag-list')

        const init = () => {
            createElememntLi()
            bindEvent()
        }

        function createElememntLi() {
            listData.forEach((item, index) => {
                const li = document.createElement('li')
                li.classList = `drag-item item${index + 1}`
                li.draggable = true
                li.innerHTML = item
                oDragList.appendChild(li)
            })
        }

        function bindEvent() {
            const liItem = doc.querySelectorAll('.drag-item')
            oDragList.addEventListener('dragover', handleDragOver)  //ondragover  被拖拽元素在目标元素上移动
            liItem.forEach(item => {
                item.addEventListener('dragstart', handleDargStart)
                item.addEventListener('dragend', handleDargEnd)
            })
        }

        function handleDragOver(e) {
            e.preventDefault()
            const oDragList = this
            const dragingItem = oDragList.querySelector('.dragging')
            const sibItems = oDragList.querySelectorAll('.drag-item:not(.dragging)')
            const sibItem = [...sibItems].find(item => {
                console.log(item.offsetTop)
                return e.clientY < item.offsetTop + item.offsetHeight / 2
            })
            oDragList.insertBefore(dragingItem, sibItem)
        }

        function handleDargStart(e) {
            setTimeout(() => {
                e.target.classList.add('dragging')
            })
        }

        function handleDargEnd(e) {
            e.target.classList.remove('dragging')
        }

        init()
    })(document)