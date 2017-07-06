'use sctrict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_jucabox';

exports.ensureAuth= function(req,res,next){

  if(!req.headers.authorization){
      return res.status(403).send({
        message: 'La petición no tiene la cabecera de autenticación'
      });
  }

  var token = req.headers.authorization.replace(/['"]+/g,'');

  try{
    console.log('EN AUTHENTICATE');
    console.log(token);
    console.log(jwt.decode(token,secret));
    var payload = jwt.decode(token,secret);

    if(payload.exp <= moment().unix()){
      return res.status(401).send({
        message: 'El token ha expirado'
      });
    }

  }catch(ex){
    console.log(ex);
    return res.status(404).send({
      message: 'el token no es válido'
    });
  }

  req.user = payload;

  next();

};
