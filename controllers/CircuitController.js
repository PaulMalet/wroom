var model = require('../models/circuit.js');
var async = require('async');
// ////////////////////// L I S T E R     C I R C U I T S

module.exports.ListerCircuit = function(request, response){
   response.title = 'Liste des circuits';

   response.render('listerCircuit', response);
};

module.exports.ListerCircuit = function (request, response)
  {
    response.title = 'Liste des circuits';
    model.getListeCircuit( function(err,result)
    {
      if(err) {
        console.log(err);
        return;
      }
      response.listeCircuit = result;
      response.render('listerCircuit', response);
    });
  }



  module.exports.InfoCircuit = function (request, response)
  {
        var idCircuit = request.params.numCircuit;
        async.parallel([

        function(callback){
          model.getListeCircuit(function(err, result){
            callback(null, result)
          });
        },


      function(callback){
        model.getInfoCircuit(idCircuit, function(err, result){
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

        response.listeCircuit = result[0];
        response.InfoCircuit = result[1][0];
        response.render('detailCircuit', response);
       }
      );// fin de l'async
  }
