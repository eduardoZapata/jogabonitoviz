module.exports = function(app,db) {
  app.get('/points/:league@:club',function(req,res) {
    var league = db.get(req.params.league);
    var club = db.get(req.params.club);
    
    var data = {};
    for (var i = 2000; i < 2013; i++) {
        var start = new Date(i,8,1);
        var end = new Date(i+1,6,1);

        league.find({
        Date:{$gt:start,$lt:end},
        },function(err,docs){
            // extract metric
        });
    });
    }
}