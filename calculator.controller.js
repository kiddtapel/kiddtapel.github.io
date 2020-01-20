angular.module('calcApp', [])
    .controller('CalculatorController', function () {
        var calculator = this;
        calculator.areas = [{
            clearTime: 60,
            kills: 3,
            score: 2970
        }, {
            clearTime: 0,
            kills: 0,
            score: 0
        }, {
            clearTime: 0,
            kills: 0,
            score: 0
        }];
        calculator.recompute = function (index) {
            let kills = calculator.areas[index].kills, clearTime = calculator.areas[index].clearTime;
            score = 0;
            if (kills === 0 && index === 0) {
                score = 50;
            } else if (kills === 0)
                score = 0;
            else if (kills === 1) {
                score = 780;
            } else if (kills === 2) {
                score = 1560;
            } else score = Math.round(3600 - ((120 - clearTime) * 10.5));

            calculator.areas[index].score = score;
        };

        calculator.recomputeByScore = function (index) {
            let score = calculator.areas[index].score;
            let area = {
                clearTime: 0,
                kills: 0,
                score: index > 0 ? 0 : 50
            };
            if (score < 780) {

            } else if (score < 1560) {
                area = {
                    clearTime: 0,
                    kills: 1,
                    score: 780
                };
            } else if (score < 2340) {
                area = {
                    clearTime: 0,
                    kills: 2,
                    score: 1560
                }
            } else {
                let timeNeeded = Math.ceil((3600 - score) / 10.5);
                area = {
                    clearTime: timeNeeded,
                    kills: 3,
                    score: score
                }
            }
            calculator.areas[index] = area;
        };

        calculator.total = function () {
            let total = 0, end = false;
            calculator.areas.forEach(function (a) {
                if (!end)
                    total += parseInt(a.score);
                if (a.kills < 3) end = true;
            });
            return total;
        }
    });
