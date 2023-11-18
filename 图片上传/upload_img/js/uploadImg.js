import Message from "./message";

const imgType = {
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif'
}
const fileListName = []
let file = null



const fileImg = document.querySelector('.file-img')  //上传文件
const uploadImg = document.querySelector('.selectBox') //选择图片的框
const tipInfo = document.querySelector('.tipInfo')  //提示信息
const photoBox = document.querySelector('.photoBox')
const photo = document.querySelector('.photo')  //在选择框上展示的图片
const delOrlargeImg = document.querySelector('.delOrlargeImg')
const del = document.querySelector('.del')

const init = () => {
    bindUploadEvent()
}

function bindUploadEvent() {
    fileImg.addEventListener('change', handleChangeImg)
    uploadImg.addEventListener('click', handleSelectImg)
    uploadImg.addEventListener('dragenter', handleDragenter)
    uploadImg.addEventListener('dragleave', handleDragleave)
    uploadImg.addEventListener('dragover', handleDragover)
    uploadImg.addEventListener('drop', handleDrop)
    photoBox.addEventListener('mouseenter', handleEnterImg)  //鼠标进入预览图的事件
    photoBox.addEventListener('mouseleave', handleLeaveImg)   //鼠标离开预览图的事件
    del.addEventListener('click', handleDelImg) //删除图片

}

// 点击上传
function handleSelectImg() {
    fileImg.click()
}

function handleChangeImg(e) {
    file = e.target.files[0]
    if (!iScheckImg(file)) { //检测img
        return
    }
    checkSuccess(file)
}

// 检测图片是否合格
function iScheckImg(file) {
    const { type, size } = file
    if (!imgType[type] || !type) {
        Message('error', '类型错误')
        return false;
    }
    if (size / 1024 / 1024 > 10) {
        Message('error', '图片太大了')
        return false;
    }
    return true
}
// 图片检测后执行的函数
function checkSuccess(file) {
    Message('success', '成功上传')
    const imgUrl = URL.createObjectURL(file)  //读取图片本地地址
    tipInfo.style.display = 'none'  //隐藏提示信息
    photo.src = imgUrl              //展示图片
    fileImg.disabled = true         //禁用上传文件
    uploadImg.style.cursor = 'auto' //选择框去掉小手样式
    localStorage.setItem(`${file.name}_localUrl`, imgUrl)  //存到localStorage中，做图片墙的时候用到
    fileListName.push(`${file.name}_localUrl`)  //将存在localStorage中的图片的key值存放在数组，可以快速取出图片
    //createImgList(imgUrl)  //创建图片并显示
}

// 拖拽图片进入
function handleDragenter(e) {
    uploadImg.classList.add('active')
}
// 离开目标元素
function handleDragleave(e) {
    uploadImg.classList.remove('active')
}
// 在目标元素上移动
function handleDragover(e) {
    e.preventDefault()
}
// 在目标元素上松开
function handleDrop(e) {
    e.preventDefault()
    uploadImg.classList.remove('active')
    console.log(photo.src)
    // if (photo.src) {
    //     Message('error', '请先取消预览')
    //     return;
    // }
    const file = e.dataTransfer.files[0]  //获取到图片  FileList对象
    if (!iScheckImg(file)) { //检测img
        return
    }
    checkSuccess(file)
}

//鼠标进入预览图的事件
function handleEnterImg() {
    delOrlargeImg.style.display = 'flex'
}

//鼠标离开预览图的事件
function handleLeaveImg() {
    delOrlargeImg.style.display = 'none'
}

// 删除图片的回调
function handleDelImg(e) {
    e.stopPropagation() //阻止事件冒泡
    delImg()
}

// 删除图片的函数
function delImg() {
    photo.setAttribute('src', ' ')
    tipInfo.style.display = 'block'
    fileImg.removeAttribute('disabled')
    uploadImg.style.cursor = 'pointer'
}


export const uploadImgFn = () => {
    init()
}

