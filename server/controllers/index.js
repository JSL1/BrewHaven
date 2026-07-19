module.exports.welcome = function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send("Welcome do my Backend API Server.")
}

module.exports.sayHello = function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send("Hello World!")
}

module.exports.sayBye = function (req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send("Bye, everyone!")
}