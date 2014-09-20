module.exports = function(app,db) {
  app.get('/:league@:club',function(req,res) {
        var league = db.get(req.params.league);
        var club = req.params.club;
        
        var data = [];
        var loc = 0
        for (var i = 2000; i < 2013; i++) {
            var start = new Date(2000,8,1);
            var end = new Date(2001,6,1);
            console.log(data);
            league.find({
            Date:{$gt:start,$lt:end},
            },function(err, docs) {
                var goals = goalsData(docs, club);
                console.log(data);
                data.push(goals);
            });
        } 
        //console.log(data);
        res.json(data);
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