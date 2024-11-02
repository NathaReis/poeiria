function hash() {
    const str = new Date().toISOString()
    const hash = [];
    for(let i = 0;i < str.length; i++) {
        hash.push(str.charCodeAt(i));
    }
    return hash.join("");
}
console.log(hash());