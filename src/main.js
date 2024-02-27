// import {plus} from './fun.js'
import './main.css'
import icon from './icon.png'

// 魔法注释，目前没效果后面再看看
const autoRun = () => {
    import(/* webpackChunkName: 'funs' */'./fun.js').then((res) => {
        console.log(res);
    })
}

autoRun()

const img = new Image()
img.src = icon
document.body.append(img)