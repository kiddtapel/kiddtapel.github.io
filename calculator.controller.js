angular.module('calcApp', ['ngClipboard'])
    .constant("moment", moment)
    .controller('CalculatorController', function (moment,ngClipboard) {
        var calculator = this;
        calculator.areas = [{
            clearTime: 0,
            kills: 3,
            score: 3600
        }, {
            clearTime: 0,
            kills: 3,
            score: 3600
        }, {
            clearTime: 0,
            kills: 3,
            score: 3600
        }];
        calculator.tier = "1";
        let maxAreaScore = 3600, scorePerSecond = 10.5, killScore = 780;
        calculator.recompute = function (index, field) {
            console.log('recompute', 'index =', index, 'field =', field);
            let kills = calculator.areas[index].kills, clearTime = calculator.areas[index].clearTime;
            score = 0;
            if (kills === 0 && index === 0) {
                score = 50;
            } else if (kills === 0)
                score = 0;
            else if (kills === 1) {
                score = killScore;
            } else if (kills === 2) {
                score = killScore * 2;
            } else score = Math.round(maxAreaScore - (clearTime * scorePerSecond));

            calculator.areas[index].score = score;
            ga('send', 'event', 'Recompute Area ' + (index + 1), 'compute', field);
        };

        calculator.adjustRelatively = function (index, field, oldValue) {
            console.log('adjustRelatively', 'index =', index, 'field =', field, 'oldValue =', oldValue);
            oldValue = parseInt(oldValue);
            let change = calculator.areas[index].clearTime - oldValue;
            let relativeChanges = [];
            if (calculator.areas[index].kills !== 3) return;
            for (var i = index; i < 3; i++) {
                if (index !== i) {
                    if (calculator.areas[i].kills === 3) {
                        relativeChanges.push(i);
                    } else break;
                }
            }
            relativeChanges.forEach(function(c, i) {
                let halfChange = relativeChanges.length > 1 && i === 0 ? Math[oldValue % 2 === 0? 'ceil' : 'floor'](change/2) : change;
                if (calculator.areas[c].clearTime - halfChange >= 0 && calculator.areas[c].clearTime - halfChange <= 120) {
                    console.log('setting', c, -halfChange);
                    calculator.areas[c].clearTime -= halfChange;
                    change -= halfChange;
                } else {
                    console.log('skipped', c, 'calculator.areas[c].clearTime - halfChange =', calculator.areas[c].clearTime - halfChange);
                }
            });
            calculator.recompute(0, 'Range');
            calculator.recompute(1, 'Range');
            calculator.recompute(2, 'Range');
            ga('send', 'event', 'Adjust Time Relative ' + (index + 1), 'compute', 'Range');
        };

        calculator.remainingTime = function (clearTime) {
            return moment().startOf('day').add(2, 'minutes').subtract(clearTime, 'seconds').format('mm:ss')
        };

        calculator.changeTier = function () {
            console.log('changeTier', calculator.tier);
            if (calculator.tier === "1") {
                scorePerSecond = 10.5;
                killScore = 780;
                maxAreaScore = 3600;
            } else if (calculator.tier === "2") {
                scorePerSecond = 2.625;
                killScore = 195;
                maxAreaScore = 900;
            } else if (calculator.tier === "3") {
                scorePerSecond = 0.875;
                killScore = 65;
                maxAreaScore = 300;
            }
            calculator.recompute(0, 'tier');
            calculator.recompute(1, 'tier');
            calculator.recompute(2, 'tier');
        };

        calculator.recomputeByScore = function (index, onBlur) {
            console.log('recomputeByScore', 'index =', index, 'onBlur =', onBlur);
            let score = calculator.areas[index].score;
            if (score < killScore && onBlur) {
                calculator.areas[index].clearTime = 0;
                calculator.areas[index].kills = 0;
                calculator.areas[index].score = index > 0 ? 0 : 50;
            } else if (score < killScore * 2 && onBlur) {
                calculator.areas[index].clearTime = 0;
                calculator.areas[index].kills = 1;
                calculator.areas[index].score = killScore;
            } else if (score < killScore * 3 && onBlur) {
                calculator.areas[index].clearTime = 0;
                calculator.areas[index].kills = 2;
                calculator.areas[index].score = killScore * 2;
            } else if (score >= killScore * 3 && score <= maxAreaScore) {
                calculator.areas[index].clearTime = Math.ceil((maxAreaScore - score) / scorePerSecond);
                calculator.areas[index].kills = 3;
                calculator.areas[index].score = score;
            }
            ga('send', 'event', 'Recompute Area ' + (index + 1), 'compute', 'Score');
        };

        calculator.total = function () {
            let total = 0, end = false;
            calculator.areas.forEach(function (a) {
                if (!end)
                    total += parseInt(a.score);
                if (a.kills < 3) end = true;
            });
            return total;
        };

        calculator.copyInstructions = function() {
            var str = "";

            let ended = false;
            calculator.areas.forEach(function(area, i) {
                if (ended) return;
                if (area.kills === 3) {
                    str += `[A${i+1}] ${calculator.remainingTime(area.clearTime)} time left. `;
                } else if (area.kills > 0) {
                    ended = true;
                    str += `[A${i+1}] ${area.kills} kill${area.kills === 1? '':'s'}. `;
                } else {
                    ended = true;
                    str += `[A${i+1}] Quit Battle. `;
                }
            });

            str += `Score: ${calculator.total()}`;

            console.log(str);
            ngClipboard.toClipboard(str);
        };
    });
