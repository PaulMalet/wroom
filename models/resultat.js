/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/
var db = require('../configDb');


module.exports.getListeChampionnat= function ( callback)
{
  db.getConnection(function(err, connexion)
  {
    if(!err)
    {
      var sql = "SELECT GPNUM, GPNOM, PAYADRDRAP FROM grandprix g, circuit c, pays p ";
      sql = sql+"WHERE g.CIRNUM = c.CIRNUM AND c.PAYNUM=p.PAYNUM ";
      sql=sql+"ORDER BY GPNOM ASC";
      connexion.query(sql, callback);

      connexion.release();
    }
  });
}

module.exports.getDetailGP= function (numChamp, callback)
{
  db.getConnection(function(err, connexion)
  {
    if(!err)
    {
      var sql = "SELECT GPNOM, GPDATE, GPCOMMENTAIRE, TEMPSCOURSE, PILNOM FROM grandprix g, course c, pilote p ";
      sql = sql +"WHERE g.GPNUM =  "+numChamp+" ";
      sql = sql +"AND g.GPNUM = c.GPNUM ";
      sql = sql+"AND c.PILNUM = p.PILNUM ";
      sql = sql+"ORDER BY c.TEMPSCOURSE ASC ";
      console.log(sql);
      connexion.query(sql, callback);

      connexion.release();
    }
  });
}
