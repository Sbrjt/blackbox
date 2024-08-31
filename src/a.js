let x = new Date()
let y = x.toISOString().split('T')[0]
console.log(y)
console.log(x.toLocaleDateString('en-CA'))
