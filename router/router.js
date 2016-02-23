var HomeController = require('./../controllers/HomeController');
var ResultatController = require('./../controllers/ResultatController');
var EcurieController = require('./../controllers/EcurieController');
var PiloteController = require('./../controllers/PiloteController');
var CircuitController = require('./../controllers/CircuitController');

// Routes
module.exports = function(app){

// Main Routes
    app.get('/', HomeController.Index);

// pilotes
    app.get('/repertoirePilote', PiloteController.ListeInitialPilotes);
      // Liste des pilotes
      app.get('/repertoirePilote/:initial', PiloteController.ListePilotes);
      // Informations sur un pilote
      app.get('/detailPilote/:numPilote', PiloteController.InfoPilotes);

 // circuits
   app.get('/circuits', CircuitController.ListerCircuit);
    //Informations sur un circuit
    app.get('/detailCircuit/:numCircuit',CircuitController.InfoCircuit);

// Ecuries
   app.get('/ecuries', EcurieController.ListerEcurie);
   //Details de l'ecurie
    app.get('/detailEcurie/:numEcurie', EcurieController.detailEcurie)

 //Résultat
   app.get('/resultats', ResultatController.ListerChampionnat);
  //Résultat d'un championnat en particulier
    app.get('/detailChampionnat/:numChamp', ResultatController.DetailChampionnat)


// tout le reste
  app.get('*', HomeController.Index);
  app.post('*', HomeController.Index);

};
