import { uploadImgFn } from './uploadImg'
import { useRoute } from './Router'
    ; (() => {
        const oSwitchUploadBtn = document.querySelector('.upload-img')
        const oSwitchImgListBtn = document.querySelector('.image-List')
        const main = document.querySelector('.main')
        const init = () => {
            //useRoute({ path: '/', node: main })
            bindEvent()
            uploadImgFn()
        }

        function bindEvent() {
            oSwitchUploadBtn.addEventListener('click', handleClickPushUpload)
            oSwitchImgListBtn.addEventListener('click', handleClickPushImgList)
        }

        //修改路由切换页面
        function handleClickPushUpload(e) {
            // useRoute({ path: '/upload', node: main })
        }
        function handleClickPushImgList(e) {
            useRoute({ path: '/imgList', node: main })
        }

        init()
    })()