/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/
var db = require('../configDb');

/*
* Récupérer la liste des initials des pilotes
* @return un tableau contenant la liste des initials des pilotes présent
*     dans la BDD
*/
module.exports.getListeInitial= function (callback)
{
  db.getConnection(function(err, connexion)
  {
    if(!err)
    {
      //S'il n'y a as d'erreur, on execute la requete SQL
      var sql = "SELECT DISTINCT LEFT(PILNOM, 1) AS initial FROM pilote ";
      sql = sql+ "ORDER BY initial ASC"
      connexion.query(sql, callback);

      connexion.release();
    }
  });
}

module.exports.getListePilote = function (lettre, callback)
{
  db.getConnection(function(err,connexion){
    if(!err)
    {
      var sql = "SELECT DISTINCT PILNOM, PILPRENOM, pilote.PILNUM, photo.PHOADRESSE FROM pilote";
      sql = sql + " INNER JOIN photo ON photo.PILNUM = pilote.PILNUM "
      sql = sql + " WHERE PILNOM LIKE '"+lettre+"%' ";
      sql = sql + " AND photo.PHONUM = 1"

      connexion.query(sql,callback);
      connexion.release();
    }
  });
}

module.exports.getInfoPilote = function (numPilote, callback)
{
  db.getConnection(function(err, connexion){
    if(!err)
    {
      var sql = "SELECT pi.PILNUM, PILNOM, PILPRENOM, PILTEXTE,"
      sql=sql+" DATE_FORMAT(PILDATENAIS, '%d/%m/%Y') AS PILDATENAIS, PILPOIDS, PILTAILLE,";
      sql= sql+"PAYNAT, ph.PHOADRESSE FROM pilote pi, pays pa, photo ph ";
      sql = sql+"WHERE pi.PILNUM = "+numPilote+" ";
      sql = sql+"AND pi.PAYNUM = pa.PAYNUM AND ph.PILNUM=pi.PILNUM AND ph.PHONUM = 1"

      connexion.query(sql,callback);
      connexion.release();
    }
  });
}

module.exports.getEcurie = function (numPilote, callback)
{
  db.getConnection(function(err, connexion){
    if(!err)
    {
      var sql = "SELECT ECUNOM from ECURIE e, pilote p WHERE p.ecunum=e.ecunum  AND p.pilnum ="+numPilote+"";

      connexion.query(sql,callback);
      connexion.release();
    }
  });
}

module.exports.getSponsor = function (numPilote, callback)
{
  db.getConnection(function(err, connexion){
    if(!err)
    {
      var sql = "SELECT SPONOM, SPOSECTACTIVITE from sponsor s1, sponsorise s2 "
      sql = sql +"WHERE s2.PILNUM ="+numPilote+" ";
      sql= sql+"AND s1.SPONUM = s2.SPONUM"

      connexion.query(sql,callback);
      connexion.release();
    }
  });
}

module.exports.getPhoto = function (numPilote, callback)
{
  db.getConnection(function(err, connexion){
    if(!err)
    {
      var sql = "SELECT PHOADRESSE, PHOCOMMENTAIRE from photo ";
      sql = sql +"WHERE PILNUM ="+numPilote+" ";
      sql= sql+"AND PHONUM!=1";

      connexion.query(sql,callback);
      connexion.release();
    }
  });
}
