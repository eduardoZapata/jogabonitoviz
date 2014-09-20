module.exports = function(app,db) {
  app.get('/points/:league@:year',function(req,res) {
    var league = db.get(req.params.league);

    var thisYear = parseInt(req.params.year);
    var nextYear = thisYear + 1;
    var start = new Date(thisYear,8,1);
    var end = new Date(nextYear,6,1);

    league.find({
    Date:{$gt:start,$lt:end},
    },function(err,docs){
        //Assign pointsData to your function
        //var pointsData =;
        res.json();
    });

  });
}