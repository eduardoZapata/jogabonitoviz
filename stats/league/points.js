var pointsData = function(docs) {
    var table = {};
    for(var i = 0;i < docs.length;i++) {
        var game = docs[i];
        console.log(game);
        var home = game.HomeTeam;
        var away = game.AwayTeam;
        var result = game.FTR;

        //If the teams do not already exist, add them to the table
        if(!table[home]) {
            //var teamObj = {"Name":home, "Points":0};
            table[home] = 0;
        }
        if(!table[away]) {
            //var teamObj = {"Name":away, "Points":0};
            table[away] = 0;
        }

        if(result == 'H') {
            table[home] += 3;
        } else if(result = 'D') {
            table[home] += 1;
            table[away] += 1;
        } else {
            table[away] += 3;
        }


    }

    table.sort(function(a, b) {
        return compareStrings(a.key, b.key);
    })
    console.log(table);
    return table;
};

function compareStrings(a, b) {
    // Assuming you want case-insensitive comparison
    a = a.toLowerCase();
    b = b.toLowerCase();

    return (a < b) ? -1 : (a > b) ? 1 : 0;
}

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