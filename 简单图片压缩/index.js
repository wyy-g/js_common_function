; (function () {
    const oImgFileSelector = document.querySelector('#imgFileSelector')
    const oOriginImgPreview = document.querySelector('#originImgPreview')
    const oCompressedImgPreview = document.querySelector('#compressedImgPreview')
    const reader = new FileReader()

    let imgFile = null
    let quality = 90
    let compressedImgSrc = ''

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

        if (!imgFile || !IMG_TYPE[imgFile.type]) {
            setImgFileEmpty()
            alert('请选择正确格式的图片')
            return;
        }

        setImgPreview(imgFile)
    }

    function setImgPreview(imgFile) {
        if (imgFile instanceof File) {
            reader.onload = async () => {
                const originImgSrc = reader.result
                await createCompressedImage({
                    imgSrc: originImgSrc,
                    type: imgFile.type
                })
                oOriginImgPreview.src = originImgSrc
                oCompressedImgPreview.src = compressedImgSrc
                setPreviewVisible(oOriginImgPreview, true)
                setPreviewVisible(oCompressedImgPreview, true)

                console.log(compressedImgSrc.length, originImgSrc.length, quality)
            }

            reader.readAsDataURL(imgFile)
        }
    }

    function createCompressedImage({ imgSrc, type }) {
        const oCan = document.createElement('canvas')
        const oImg = document.createElement('img')
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

    function doCompress(canvas, imgSrc, type) {
        compressedImgSrc = canvas.toDataURL(type, quality / 100)
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

    function setPreviewVisible(node, visible) {
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