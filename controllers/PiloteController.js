var model = require('../models/pilote.js');
var async = require('async');
// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S

module.exports.Repertoire = 	function(request, response){
   response.title = 'Répertoire des pilotes';
   response.render('repertoirePilote', response);

  } ;

module.exports.ListeInitialPilotes = function (request, response)
  {
    model.getListeInitial( function(err,result)
    {
      if(err) {
        console.log(err);
        return;
      }
      response.listeInitial = result;
      response.render('repertoirePilotes', response);
    });
  }

module.exports.ListePilotes = function (request, response)
{
      var lettre = request.params.initial;
      async.parallel([
        function(callback){
          model.getListeInitial( function(err,result){
            callback(null,result)
        });
      },
      function(callback){
        model.getListePilote(lettre, function(err, result){
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
      response.listeInitial = result[0];
      response.listePilotes = result[1];
      response.render('repertoirePilotes', response);
     }
    );// fin de l'async
}

module.exports.InfoPilotes = function (request, response)
{
    var numPilote = request.params.numPilote;
    async.parallel([
      function(callback){
        model.getListeInitial(function(err,result){
          callback(null,result)
      });
    },
    function(callback){
      model.getInfoPilote(numPilote, function(err,result){
        callback(null,result)
    });
  },
  function(callback){
    model.getEcurie(numPilote, function(err,result){
      callback(null,result)
  });
},
  function(callback){
    model.getSponsor(numPilote, function(err,result){
      callback(null,result)
    });
},
function(callback){
  model.getPhoto(numPilote, function(err,result){
    callback(null,result)
  });
},
],
  function(err, result)
  {
    if(err)
    {
      console.log(err);
      return;
    }

    response.listeInitial = result[0];
    response.infoPilote = result[1][0];
    response.ecurie = result[2][0];
    response.sponsor = result[3];
    response.photo = result[4];
    response.render('detailPilote', response);
  }
); //fin de l'async
}
