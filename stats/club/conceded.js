module.exports = function(app,db) {
  app.get('/conceded/:league@:club',function(req,res) {
    var league = db.get(req.params.league);
    var club = db.get(req.params.club);
    
    var data = {};
    for (var i = 2000; i < 2013; i++) {
        var start = new Date(i,8,1);
        var end = new Date(i+1,6,1);

        league.find({
        Date:{$gt:start,$lt:end},
        },function(err,docs){
            var conceded = concededData(docs, club);
            data.push({i:conceded});
        });
    }
    res.json(data);
    });
    
}

var concededData = function(docs, club) {
    for(var i = 0;i < docs.length;i++) {
        var game = docs[i];
        var home = game.HomeTeam;
        var away = game.AwayTeam;
        var goals = 0;

        if(club === home) {
            goals += game.FTAG;
        } else if(club === away){
            goals += game.FTHG;
        }
    }
    return goals;
};