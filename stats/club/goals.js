module.exports = function(app,db) {
  app.get('/:league@:club',function(req,res) {
        var league = db.get(req.params.league);
        var club = db.get(req.params.club);
        
        var data = [];
        for (var i = 2000; i < 2013; i++) {
            var start = new Date(2000,8,1);
            var end = new Date(2001,6,1);

            league.find({
            Date:{$gt:start,$lt:end},
            },function(err, docs) {
                console.log(docs);
                var goals = goalsData(docs, club);
                data.push({"a":"b"});
            });
        } 
        res.json(data);
    });
}

var goalsData = function(docs, club) {
    for(var i = 0;i < docs.length;i++) {
        var game = docs[i];
        var home = game.HomeTeam;
        var away = game.AwayTeam;
        var goals = 0;

        if(club === home) {
            goals += game.FTHG;
        } else if(club === away){
            goals += game.FTAG;
        }
    }
    return goals;
};