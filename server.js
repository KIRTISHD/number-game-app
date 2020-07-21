const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');

//const SCORE_FILE_PATH = require(path.join(__dirname , 'src', 'assets') + '/scoreboard');

const app = express();

app.use(express.static(__dirname + '/dist/NumberMemory'));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname +
        '/dist/NumberMemory/index.html'));
});

const app2 = express();
app2.use(cors());
app2.use(bodyParser.json());

app2.get('/getScore', (req, res, next) => {
    const SCORE_FILE_PATH = fs.readFileSync(path.join(__dirname , 'src', 'assets') + '/scoreboard.json');
    res.status(200).json(JSON.parse(SCORE_FILE_PATH));
    next();
});

app2.post('/storeScore', (req, res, next) => {
    
        const tempScoreObj = { name: req.body.username, score: req.body.score, time: req.body.time}
        const SCORE_FILE_PATH = fs.readFileSync(path.join(__dirname , 'src', 'assets') + '/scoreboard.json');
        const scoreObj = JSON.parse(SCORE_FILE_PATH);
        //---------
        const index = scoreObj.scores.findIndex( i => i.name === tempScoreObj.name);
        if (index === -1) {
            scoreObj.scores.push(tempScoreObj);
        } else {
            if (scoreObj.scores[index].score < tempScoreObj.score) {
                scoreObj.scores[index] = tempScoreObj;
            }
        }
        //----------------
        console.log('same to scores-', scoreObj);
        console.log('same to tempScore-', tempScoreObj);
        scoreObj.scores.sort( (a, b) => {
            if (b.score == a.score){
              return b.time - a.time;
            }
            return b.score - a.score;
          });
        scoreObj.scores = scoreObj.scores.slice(0, (scoreObj.scores.length < 20) ? (scoreObj.scores.length) : 20);
        const finalData = JSON.stringify(scoreObj);
        console.log('finaldata-' + finalData);
        fs.writeFileSync(path.join(__dirname , 'src', 'assets') + '/scoreboard.json', finalData, (err) => {
            console.log('error in writefile-' + err);
            return res.status(401).json({message: 'error in writing file'});
        });
        return res.status(200).json({message: 'Saved'});
        // return res.sendStatus(200)
        
        
    next();
});

app.listen(process.env.PORT || 8080);

app2.listen(4300);