

// module.exports = (req, res, next) => {
//     try {
//         var token = req.cookies.user
//             console.log(token)

//         var decode = jwt.verify(token, 'poojapichad')
//         req.userData = decode
//             // console.log(decode)

//         next()
//     } catch (error) {
//         console.log(error)
//         res.status(401).json({
//             message: 'You are not logged '
//         })
//     }

// }

// const jwt = require("jsonwebtoken")

// const verifyToken=(req,res,next)=>{
//     try{
//         var token=req.cookies.user
//         console.log(token)
//         var decode =jwt.verify(token,'poojapichad')
//         req.userdata=decode
//         console.log(decode)
//         next()
//     }catch(err){
//         console.log(err)
//         res.send (err)
//     }
// }

// module.exports = {verifyToken}

// const jwt = require("jsonwebtoken")

// module.exports = (req, res, next) => {
//     const bearerHeader = req.headers['authorization'];
//     if (typeof bearerHeader !== 'undefined') {
//         const bearer = bearerHeader.split(' ');
//         const bearerToken = bearer[1];
//         req.token = bearerToken;
//         var decoded = jwt.decode(bearerToken);
//         req.data = decoded
//         next();
//     } else {
//             res.status(403).send("user is not authenticated")
//     }
// }

