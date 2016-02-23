/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/
var db = require('../configDb');


module.exports.getListeCircuit= function ( callback)
{
  db.getConnection(function(err, connexion)
  {
    if(!err)
    {
      var sql = "SELECT CIRNUM, CIRNOM, PAYADRDRAP FROM circuit c, pays p WHERE c.PAYNUM = p.PAYNUM";
      connexion.query(sql, callback);

      connexion.release();
    }
  });
}

module.exports.getInfoCircuit = function (idCircuit, callback)
{
  db.getConnection(function(err,connexion)
  {
  if(!err)
  {
    var sql = "SELECT CIRNOM, CIRLONGUEUR,CIRNBSPECTATEURS, CIRADRESSEIMAGE, CIRTEXT, PAYNOM FROM circuit c, pays p ";
    sql = sql+"WHERE CIRNUM ="+idCircuit+" ";
    sql = sql+"AND c.PAYNUM = p.PAYNUM";

    connexion.query(sql, callback);

    connexion.release();
  }

});
}
