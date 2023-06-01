; (function () {
    const oImgFileSelector = document.querySelector('#imgFileSelector')
    const oOriginImgPreview = document.querySelector('#originImgPreview')
    const oCompressedImgPreview = document.querySelector('#compressedImgPreview')
    const reader = new FileReader() //FileReader() 允许web应用程序异步读取计算机上的文件的内容，使用File或Blob对象指定要读取文件的内容

    let imgFile = null          //操作的文件对象
    let quality = 90            //画布压缩图片的质量
    let compressedImgSrc = ''  //压缩后的图片的base64编码

    const IMG_TYPE = {
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/gif': 'gif'
    }

    const init = () => {
        bindEvent()
    }

    function bindEvent() {
        oImgFileSelector.addEventListener('change', handleFileSelectorChange, false)
    }

    function handleFileSelectorChange(e) {
        imgFile = e.target.files[0]

        if (!imgFile || !IMG_TYPE[imgFile.type]) {    //如果没有文件或者文件类型不对不执行压缩的操作
            setImgFileEmpty()                           //清空文件对象
            alert('请选择正确格式的图片')
            return;
        }

        setImgPreview(imgFile)
    }

    function setImgPreview(imgFile) {
        if (imgFile instanceof File) {
            reader.onload = async () => {              //异步请求，在读取操作完成后触发
                const originImgSrc = reader.result   //获得图片的base64编码
                await createCompressedImage({        //图片压缩的函数
                    imgSrc: originImgSrc,
                    type: imgFile.type
                })
                oOriginImgPreview.src = originImgSrc
                oCompressedImgPreview.src = compressedImgSrc
                setPreviewVisible(oOriginImgPreview, true)   //原图片显示
                setPreviewVisible(oCompressedImgPreview, true)  //压缩图片显示

                console.log(compressedImgSrc.length, originImgSrc.length, quality)
            }

            reader.readAsDataURL(imgFile)   //将文件对象转化为base64编码
        }
    }

    function createCompressedImage({ imgSrc, type }) {
        const oCan = document.createElement('canvas')  //生成画布
        const oImg = document.createElement('img')     //生成一个新的img
        const ctx = oCan.getContext('2d')

        oImg.src = imgSrc

        return new Promise((resolve) => {
            oImg.onload = () => {
                const imgWidth = oImg.width
                const imgHeight = oImg.height

                oCan.width = imgWidth
                oCan.height = imgHeight

                // 把图片画到canvas上
                ctx.drawImage(oImg, 0, 0, imgWidth, imgHeight)

                // 生成压缩图片
                doCompress(oCan, imgSrc, type)
                resolve(compressedImgSrc)
            }
        })
    }

    function doCompress(canvas, imgSrc, type) {                 //递归调用生成压缩图片的函数，因为可能压缩后压缩图片比原图片的更大
        compressedImgSrc = canvas.toDataURL(type, quality / 100)  //  第一个参数图片的类型默认是png，第二个参数图片的质量 0-1
        if (compressedImgSrc.length >= imgSrc.length && quality > 10) {
            quality -= 10;
            doCompress(canvas, imgSrc, type)
        }
    }

    function setImgFileEmpty() {
        oImgFileSelector.value = ''
        imgFile = null

        setPreviewVisible(oOriginImgPreview, false)
        setPreviewVisible(oCompressedImgPreview, false)
    }

    function setPreviewVisible(node, visible) {    //图片显示与隐藏的函数
        switch (visible) {
            case true:
                node.classList.remove('hide')
                node.classList.add('show')
                break;
            case false:
                node.classList.remove('show')
                node.classList.add('hide')
                break;
            default:
                break;
        }
    }

    init()
})()