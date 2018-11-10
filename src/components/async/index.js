import help from "../common/help.js";
console.log('async引用',help.version);
const test={
    init(){
        console.log('test');
        console.log(help.version)
    }
}
export default test;