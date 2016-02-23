/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/
var db = require('../configDb');

/*
* Récupérer l'intégralité les écuries avec l'adresse de la photo du pays de l'écurie
* @return Un tableau qui contient le N°, le nom de l'écurie et le nom de la photo du drapeau du pays
*/
module.exports.getListeEcurie = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						var sql ="SELECT ecunum, payadrdrap, ecunom FROM ecurie e INNER JOIN pays p ";
						sql= sql + "ON p.paynum=e.paynum ORDER BY ecunom";
						//console.log (sql);
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getDetailEcurie = function (idEcurie, callback) {
	db.getConnection(function(err, connexion){
		if(!err){
			var sql = "SELECT ECUNOM , ECUNOMDIR, ECUADRSIEGE, PAYNOM, FPNOM, ECUADRESSEIMAGE "
			sql = sql +"FROM ecurie e, fourn_pneu fp, sponsor s1, sponsorise s2, pays p  "
			sql = sql +"WHERE ECUNUM = "+idEcurie+" "
			sql = sql +"AND p.PAYNUM = e.PAYNUM "
			sql = sql +"AND e.FPNUM = fp.FPNUM ";


			//console.log (sql);
			connexion.query(sql, callback);
			// la connexion retourne dans le pool
			connexion.release();
		}
	});
};

module.exports.getPiloteEcurie = function ( idEcurie, callback){
	db.getConnection(function(err, connexion){
		if(!err)
		{
			var sql = "SELECT DISTINCT PILNOM, photo.PHOADRESSE FROM pilote";
			sql = sql + " INNER JOIN photo ON photo.PILNUM = pilote.PILNUM "
			sql = sql + " WHERE ECUNUM = "+idEcurie+" ";
			sql = sql + " AND photo.PHONUM = 1"
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

module.exports.getVoitureEcurie = function ( idEcurie, callback){
	db.getConnection(function(err, connexion){
		if(!err)
		{
			var sql = "SELECT VOINOM, VOIADRESSEIMAGE FROM voiture WHERE ECUNUM = "+idEcurie+" ";
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};
