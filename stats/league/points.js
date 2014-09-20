module.exports = function(app,db) {
    console.log('called');
    app.get('/points/:league@:year', function(req,res) {
    var league = db.get(req.params.league);

    var thisYear = parseInt(req.params.year);
    var nextYear = thisYear + 1;
    var start = new Date(thisYear,8,1);
    var end = new Date(nextYear,6,1);

    league.find({
    Date:{$gt:start,$lt:end},
    },function(err,docs){
        res.json(pointsData(docs));
    });

  });
}

var pointsData = function(docs) {
    var table = {};
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
    return table;
};
