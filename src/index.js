import {
    sync,
    isArray
} from "./components/sync/index.js";
import(/* webpackChunkName:'Magic-comments-test' */'./components/async/').then(_=>{
    console.log('这里是webpack chunk name魔法函数******',_)
    _.default.init();
})
sync()
console.log('hello world')