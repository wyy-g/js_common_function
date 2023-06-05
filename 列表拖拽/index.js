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
        const oDragWarp1 = doc.querySelector('.drag-warp1')
        const oDragList = doc.querySelector('.drag-list')
        const oDragList1 = doc.querySelector('.drag-list1')

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
            oDragList.addEventListener('dragover', handleDragOver) //ondragover  被拖拽元素在目标元素上移动
            oDragList1.addEventListener('dragenter', handleDargEnter) //dragenter 被拖拽元素进入目标元素的事件
            oDragList1.addEventListener('dragleave', handleDargLeave)
            oDragList1.addEventListener('drop', handleDrop)
            oDragList1.addEventListener('dragover', handleDragOver1)
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

        function handleDargEnter(e) {
            e.preventDefault()
            if (e.clientX > oDragList1.offsetLeft) {
                oDragWarp1.style.border = '1px dashed red'
            }
        }

        function handleDargLeave(e) {
            e.preventDefault()
            oDragWarp1.style.border = '1px dashed #ccc'
        }

        function handleDrop(e) {
            e.preventDefault()
            const dragingItem = oDragList.querySelector('.dragging')
            oDragList1.appendChild(dragingItem)
            dragingItem.draggable = false
            oDragWarp1.style.border = '1px dashed #ccc'
        }

        function handleDragOver1(e) {
            e.preventDefault()
        }

        init()
    })(document)