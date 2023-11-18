const route = [
    {
        path: '/',
        page: '/pages/upload.html',
        title: '上传文件'
    },
    {
        path: '/upload',
        page: '/pages/upload.html',
        title: '上传文件'
    },
    {
        path: '/imgList',
        page: '/pages/imgList.html',
        title: '图片列表'
    }
]

export const useRoute = (arg) => {
    const { path, node } = arg
    window.history.pushState(null, null, path || '/')
    _renderPage(node)
    window.addEventListener('beforeunload', function (e) { _renderPage(node); console.log('1234') })
}

async function _renderPage(node) {
    const location = window.location.pathname
    const { page, title } = route.find(item => {
        return item.path === location
    })
    if (!page) {
        console.log('path不存在')
    }
    const res = await fetch(page)
    console.log(res.text())
    node.innerHTML = res.text().then(res => res)
    // res.text().then(res => {
    //     node.innerHTML = res
    //     document.title = title
    // })
}

window.onpopstate = _renderPage