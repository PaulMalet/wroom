var model = require('../models/ecurie.js');
var async = require('async');
   // //////////////////////// L I S T E R  C I R C U I T S

/*
<!--
* listeEcurie contient par exemple :
* [
* { ecunum: 5, payadrdrap: 'AAA',ecunom:'rrr' },
* { ecunum: 6, payadrdrap: 'BAA' ,ecunom:'ggg'},
* { ecunum: 7, payadrdrap: 'ACA' ,ecunom:'kkkk'}
*  ]
*
* response.title est passé à main.handlebars via la vue ListerEcurie
* il sera inclus dans cette balise : <title> {{title}}</title>
*/

module.exports.ListerEcurie = function(request, response){
   response.title = 'Liste des écuries';

   model.getListeEcurie( function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
   response.listeEcurie = result;
   response.render('listerEcurie', response);
        });
};

module.exports.detailEcurie = function(request, response){
  response.title = 'Liste des écuries';
  var idEcurie= request.params.numEcurie;
  async.parallel([
    function(callback){
      model.getListeEcurie( function(err,result){
        callback(null,result)
    });
  },
  function(callback){
    model.getDetailEcurie(idEcurie, function(err, result){
      callback(null, result)
    });
  },
  function(callback){
    model.getPiloteEcurie(idEcurie, function(err, result){
      callback(null, result)
    });
  },
  function(callback){
    model.getVoitureEcurie(idEcurie, function(err, result){
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
    response.listeEcurie = result[0];
    response.detailEcurie= result[1][0];
    response.piloteEcurie = result[2];
    response.voitureEcurie = result[3];
    response.render('detailEcurie', response);
    }
  );
}
