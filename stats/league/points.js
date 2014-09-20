var pointsData = function(docs) {
            var table = {};
            for(var i = 0;i < docs.length;i++) {
                console.log(table);
                var game = docs[i];
                var home = game.HomeTeam;
                var away = game.AwayTeam;
                var homeGoals = game.FTHG;
                var awayGoals = game.FTAG;
                //Home won: 1, Tied: 0, Away won: -1
                var whoWon = home > away ? 1 : -1 * (away > home);

                //If the teams do not already exist, add them to the table
                if(!table[home]) {
                    //var teamObj = {"Name":home, "Points":0};
                    table[home] = 0;
                } else if(!table[away]) {
                    //var teamObj = {"Name":away, "Points":0};
                    table[away] = 0;
                }

                if(whoWon == 1) {
                    table.home += 3;
                } else if(whoWon == 0) {
                    table.home += 1;
                    table.away += 1;
                } else {
                    table.away += 3;
                }


            }
            console.log(table);
            return table;
        };
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
        //Assign pointsData to your function
        
        res.json(pointsData(docs));
    });

  });
}