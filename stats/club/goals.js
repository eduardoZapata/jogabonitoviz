module.exports = function(app,db) {
  app.get('/:league@:club',function(req,res) {
        var league = db.get(req.params.league);
        var club = req.params.club;
        console.log(club);
        var data = [];
        for (var i = 2000; i < 2013; i++) {
            var start = new Date(i,8,1);
            var end = new Date(i+1,6,1);
            console.log(data);
            league.find({
            Date:{$gt:start,$lt:end},
            },function(err, docs) {
                var goals = goalsData(docs, club);
                var d = {};
                d.goals = goals;
                d.year = i;
                data.push(d);
                if(data.length >= 13) {
                    res.json(data);
                }
            });
        }
    });
}

var goalsData = function(docs, club) {
    var goals = 0;
    for(var i = 0;i < docs.length;i++) {
        var game = docs[i];
        var home = docs[i].HomeTeam;
        var away = docs[i].AwayTeam;
        //console.log(away, home);
        if(club === home) {
            goals += game.FTHG;
        } else if(club === away){
            goals += game.FTAG;
        }
    }
    return goals;
};