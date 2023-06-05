; ((doc) => {
    const small = doc.getElementById('small')
    const mark = doc.getElementById('mark')
    const big = doc.getElementById('big')
    const bigImg = doc.getElementById('bigimg')

    const init = () => {
        bindEvent()
    }

    function bindEvent() {
        // 鼠标移动
        small.addEventListener('mousemove', handleMouseMove)
        // 鼠标移入小图显示遮罩和跟随移动的样式
        small.addEventListener('mouseenter', handleMouseEnter)
        // 鼠标移出小图隐藏遮罩和大图
        small.addEventListener('mouseleave', handleMouseLeave)
    }

    // 处理在小图中的鼠标移动事件
    function handleMouseMove(e) {
        // 得到遮罩层相对于小图的偏移量  就是遮罩层在小图里面的位置
        let s_left = e.pageX - mark.offsetWidth / 2 - small.offsetLeft
        let s_top = e.pageY - small.offsetTop - mark.offsetHeight / 2
        // 遮罩层仅可以在小图中移动，需要计算遮罩偏移量的临界值
        let max_left = small.offsetWidth - mark.offsetWidth
        let max_top = small.offsetHeight - mark.offsetHeight
        // 遮罩层移动右侧大图也跟着移动(遮罩层每移动1px 图片需要向相反对的方向移动N倍的距离)
        let n = big.offsetHeight / mark.offsetHeight
        // 遮罩层跟随鼠标移动前判断：遮罩层相对于小图的偏移量不能超过范围，超出范围要重新赋值（临界值已经计算完成）
        // 判断水平边界
        if (s_left < 0) {
            s_left = 0
        } else if (s_left > max_left) {
            s_left = max_left
        }

        // 判断垂直边界
        if (s_top < 0) {
            s_top = 0;
        } else if (s_top > max_top) {
            s_top = max_top
        }

        // 给遮罩层left和top赋值(动态的 因为e.pageX 和e.pageY 是不断变化的)
        mark.style.left = s_left + 'px'
        mark.style.top = s_top + 'px'
        //计算大图移动的距离
        let lavelx = -n * s_left
        let vertically = -n * s_top
        // 让图片动起来
        bigImg.style.left = lavelx + 'px'
        bigImg.style.top = vertically + 'px'
    }

    function handleMouseEnter(e) {
        mark.style.display = 'block'
        big.style.display = 'block'
    }

    function handleMouseLeave() {
        mark.style.display = 'none'
        big.style.display = 'none'
    }

    init()
})(document)