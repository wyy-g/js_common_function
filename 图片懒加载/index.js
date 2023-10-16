((doc) => {
    const imgs = doc.getElementsByTagName('img')
    function lazyload(imgs) {
        console.log('懒加载被触发了')
        // 浏览器可视窗口的距离
        const windowHeight = window.innerHeight
        // 可视窗口滚过的距离/滚动条距离顶部的距离
        const scrollHeight = doc.documentElement.scrollTop
        for (let i = 0; i < imgs.length; i++) {
            if (
                windowHeight + scrollHeight > imgs[i].offsetTop &&
                !imgs[i].src &&
                imgs[i].offsetTop + imgs[i].offsetHeight > scrollHeight
            ) {
                imgs[i].src = imgs[i].dataset.src
            }
            // 第二种判断
            // if (imgs[i].getBoundingClientRect().top < windowHeight && imgs[i].getBoundingClientRect().top > -imgs[i].clientHeight && !imgs[i].src) {
            //     imgs[i].src = imgs[i].dataset.src;
            // }
        }
    }
    lazyload(imgs)
    document.addEventListener('scroll', () => lazyload(imgs))
})(document);


/*
待加载图片的高度：img.clientHeight
图片顶部到文档顶部的距离：img.offsetTop
浏览器窗口滚动过的距离：document.documentElement.scrollTop 或 document.body.scrollTop
浏览器可视窗口高度：document.documentElement.clientHeight 或 window.innerHeight 
*/

