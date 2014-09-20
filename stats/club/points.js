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
            var points = pointsData(docs, club);
            data.push({i:points});
        });
    }
    res.json(data);
    });
}

var pointsData = function(docs, club) {
/*    for(var i = 0;i < docs.length;i++) {
        var game = docs[i];
        var home = game.HomeTeam;
        var away = game.AwayTeam;
        var points = 0;

        if(result === 'H' && club === home) {
            points += 3;
        } else if(result === 'D' && (club === home || club === away)) {
            points += 1;
        } else if(result === 'A' && club === away){
            points += 3;
        }
    }
    return points;*/
    var table = [];
    for(var i = 0;i < docs.length;i++) {
        var game = docs[i];
        //console.log(game);
        var home = game.HomeTeam;
        var away = game.AwayTeam;
        var result = game.FTR;

        //If the teams do not already exist, add them to the table
        if(!table[home]) {
            table[home] = 0;
        }
        if(!table[away]) {
            table[away] = 0;
        }

        if(result === 'H') {
            table[home] += 3;
        } else if(result === 'D') {
            table[home] += 1;
            table[away] += 1;
        } else if(result === 'A'){
            table[away] += 3;
        }
    }
    table.sort(function(a,b){return a[1] - b[1]});
    return table.indexOf(club) + 1;
};