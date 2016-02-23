var model = require('../models/resultat.js');
var async = require('async');
  // //////////////////////////L I S T E R    R E S U L T A T S
module.exports.ListerChampionnat = function (resquest, response){
	response.title = 'Liste des résultats des grands prix';
	model.getListeChampionnat( function(err,result)
	{
		if(err) {
			console.log(err);
			return;
		}
		response.listeChamp = result;
		response.render('ListeChampionnat', response);
	});

}

module.exports.DetailChampionnat = function (request, response){
	var numChamp = request.params.numChamp;
	async.parallel([
		function(callback){
			model.getListeChampionnat( function(err,result){
				callback(null,result)
		});
	},
	function(callback){
		model.getDetailGP(numChamp, function(err, result){
			callback(null, result)
		});
	},
],
	function(err, result){
		if(err)
		{
			console.log(err);
			return;
		}
		response.title = 'Liste des résultats des grands prix';
		response.listeChamp = result;
		response.detailChamp = result[1];
		response.render('detailChampionnat', response);
	});

}
