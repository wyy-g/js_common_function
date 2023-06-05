; ((doc) => {
    let small = doc.querySelector('.small')
    const mark = doc.querySelector('.mark')
    const img = doc.querySelector('.img')
    const imgSrc = img.src

    const init = () => {
        bindEvent()
    }

    function bindEvent() {
        small.addEventListener('mousemove', handleMouseMove)
        small.addEventListener('mouseenter', handleMouseEnter)
        small.addEventListener('mouseleave', handleMouseLeave)
    }

    function handleMouseMove(e) {
        // 获取遮罩层相对于图片的偏移量
        let mark_left = e.pageX - small.offsetLeft - mark.offsetWidth / 2
        let mark_top = e.pageY - small.offsetTop - mark.offsetHeight / 2
        // 遮罩层的临界值
        const max_left = small.offsetWidth - mark.offsetWidth
        const max_top = small.offsetHeight - mark.offsetHeight

        if (mark_left < 0) {
            mark_left = 0
        } else if (mark_left > max_left) {
            mark_left = max_left
        }

        if (mark_top < 0) {
            mark_top = 0
        } else if (mark_top > max_top) {
            mark_top = max_top
        }

        mark.style.left = mark_left + 'px'
        mark.style.top = mark_top + 'px'

        // 计算背景图片的偏移量
        const bgPositionX = -mark_left * 2
        const bgPositionY = -mark_top * 2
        // 背景图片扩大两倍
        const bgSize = `${img.offsetWidth * 2}px ${img.offsetHeight * 2}px`

        mark.style.background = `url(${imgSrc})`
        mark.style.backgroundSize = bgSize

        mark.style.backgroundPositionX = `${bgPositionX}px`
        mark.style.backgroundPositionY = `${bgPositionY}px`
    }

    function handleMouseEnter(e) {
        mark.style.display = 'block'
    }

    function handleMouseLeave() {
        mark.style.display = 'none'
    }

    init()
})(document)