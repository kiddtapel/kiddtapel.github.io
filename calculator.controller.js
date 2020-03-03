angular.module('calcApp', ['ngClipboard'])
    .constant("moment", moment)
    .controller('CalculatorController', function (moment,ngClipboard) {
        function getUrlVars() {
            var vars = {};
            var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
                vars[key] = value;
            });
            return vars;
        }

        var calculator = this;

        calculator.targetScore = 9999;
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

        var esdeathTime = 95;
        var minTimeLeft = 0;
        var maxTimeLeft = 120;
        var powerOverwhelming = 85;
        var fastTime = 70;
        var averageTime = 50;
        var foreverTime = 15;

        var cases = [{
            title: "Esdeath Level",
            type: 'Class S Monster',
            min: esdeathTime,
            max: maxTimeLeft,
            clearedAreas: 3,
            killsInUncleared: 0
        },{
            title: "Power Overwhelming",
            type: 'Class A Monster',
            min: powerOverwhelming,
            max: esdeathTime,
            clearedAreas: 3,
            killsInUncleared: 0
        },{
            title: "Full Clear",
            type: "Fast",
            min: fastTime,
            max: powerOverwhelming,
            clearedAreas: 3,
            killsInUncleared: 0
        },{
            title: "Full Clear",
            type: "Average",
            min: averageTime,
            max: fastTime,
            clearedAreas: 3,
            killsInUncleared: 0
        },{
            title: "Full Clear",
            type: "Dragged",
            min: foreverTime,
            max: averageTime,
            clearedAreas: 3,
            killsInUncleared: 0
        },{
            title: "Full Clear",
            type: "Forever",
            min: minTimeLeft,
            max: foreverTime,
            clearedAreas: 3,
            killsInUncleared: 0
        },{
            title: "2 Clears and 2 Kills",
            type: "Fast",
            min: powerOverwhelming,
            max: maxTimeLeft,
            clearedAreas: 2,
            killsInUncleared: 2
        },{
            title: "2 Clears and 2 Kills",
            type: "Average",
            min: averageTime,
            max: powerOverwhelming,
            clearedAreas: 2,
            killsInUncleared: 2
        },{
            title: "2 Clears and 2 Kills",
            type: "Dragged",
            min: foreverTime,
            max: averageTime,
            clearedAreas: 2,
            killsInUncleared: 2
        },{
            title: "2 Clears and 2 Kills",
            type: "Forever",
            min: minTimeLeft,
            max: foreverTime,
            clearedAreas: 2,
            killsInUncleared: 2
        },{
            title: "2 Clears and 1 Kill",
            type: "Fast",
            min: powerOverwhelming,
            max: maxTimeLeft,
            clearedAreas: 2,
            killsInUncleared: 1
        },{
            title: "2 Clears and 1 Kills",
            type: "Average",
            min: averageTime,
            max: powerOverwhelming,
            clearedAreas: 2,
            killsInUncleared: 1
        },{
            title: "2 Clears and 1 Kill",
            type: "Dragged",
            min: foreverTime,
            max: averageTime,
            clearedAreas: 2,
            killsInUncleared: 1
        },{
            title: "2 Clears and 1 Kill",
            type: "Forever",
            min: minTimeLeft,
            max: foreverTime,
            clearedAreas: 2,
            killsInUncleared: 1
        },{
            title: "2 Clears",
            type: "Fast",
            min: powerOverwhelming,
            max: maxTimeLeft,
            clearedAreas: 2,
            killsInUncleared: 0
        },{
            title: "2 Clears",
            type: "Average",
            min: averageTime,
            max: powerOverwhelming,
            clearedAreas: 2,
            killsInUncleared: 0
        },{
            title: "2 Clears",
            type: "Dragged",
            min: foreverTime,
            max: averageTime,
            clearedAreas: 2,
            killsInUncleared: 0
        },{
            title: "2 Clears",
            type: "Forever",
            min: minTimeLeft,
            max: foreverTime,
            clearedAreas: 2,
            killsInUncleared: 0
        },{
            title: "1 Clear and 2 Kills",
            type: "Fast",
            min: powerOverwhelming,
            max: maxTimeLeft,
            clearedAreas: 1,
            killsInUncleared: 2
        },{
            title: "1 Clear and 2 Kills",
            type: "Average",
            min: averageTime,
            max: powerOverwhelming,
            clearedAreas: 1,
            killsInUncleared: 2
        },{
            title: "1 Clear and 2 Kills",
            type: "Dragged",
            min: foreverTime,
            max: averageTime,
            clearedAreas: 1,
            killsInUncleared: 2
        },{
            title: "1 Clear and 2 Kills",
            type: "Forever",
            min: minTimeLeft,
            max: foreverTime,
            clearedAreas: 1,
            killsInUncleared: 2
        },{
            title: "1 Clear and 1 Kill",
            type: "Fast",
            min: powerOverwhelming,
            max: maxTimeLeft,
            clearedAreas: 1,
            killsInUncleared: 1
        },{
            title: "1 Clear and 1 Kills",
            type: "Average",
            min: averageTime,
            max: powerOverwhelming,
            clearedAreas: 1,
            killsInUncleared: 1
        },{
            title: "1 Clear and 1 Kill",
            type: "Dragged",
            min: foreverTime,
            max: averageTime,
            clearedAreas: 1,
            killsInUncleared: 1
        },{
            title: "1 Clear and 1 Kill",
            type: "Forever",
            min: minTimeLeft,
            max: foreverTime,
            clearedAreas: 1,
            killsInUncleared: 1
        },{
            title: "1 Clear",
            type: "Fast",
            min: powerOverwhelming,
            max: maxTimeLeft,
            clearedAreas: 1,
            killsInUncleared: 0
        },{
            title: "1 Clear",
            type: "Average",
            min: averageTime,
            max: powerOverwhelming,
            clearedAreas: 1,
            killsInUncleared: 0
        },{
            title: "1 Clear",
            type: "Dragged",
            min: foreverTime,
            max: averageTime,
            clearedAreas: 1,
            killsInUncleared: 0
        },{
            title: "1 Clear",
            type: "Forever",
            min: minTimeLeft,
            max: foreverTime,
            clearedAreas: 1,
            killsInUncleared: 0
        }, {
            title: "2 Kills",
            min: 0,
            max: 0,
            clearedAreas: 0,
            killsInUncleared: 2
        }, {
            title: "1 Kill",
            min: 0,
            max: 0,
            clearedAreas: 0,
            killsInUncleared: 1
        }];

        calculator.tier = "1";
        var maxAreaScore = 3600, scorePerSecond = 10.5, killScore = 780;
        calculator.recompute = function (index, field) {
            console.log('recompute', 'index =', index, 'field =', field);
            var kills = calculator.areas[index].kills, clearTime = calculator.areas[index].clearTime;
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
        };

        calculator.adjustRelatively = function (index, field, oldValue) {
            console.log('adjustRelatively', 'index =', index, 'field =', field, 'oldValue =', oldValue);
            oldValue = parseInt(oldValue);
            var change = calculator.areas[index].clearTime - oldValue;
            var relativeChanges = [];
            if (calculator.areas[index].kills !== 3) return;
            for (var i = index; i < 3; i++) {
                if (index !== i) {
                    if (calculator.areas[i].kills === 3) {
                        relativeChanges.push(i);
                    } else break;
                }
            }
            relativeChanges.forEach(function(c, i) {
                var halfChange = relativeChanges.length > 1 && i === 0 ? Math[oldValue % 2 === 0? 'ceil' : 'floor'](change/2) : change;
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
            var score = calculator.areas[index].score;
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

        calculator.computeByScore = function (score) {
            var area = {
                clearTime: 0,
                kills: 3,
                score: 3600
            };
            if (score < killScore) {
                area.clearTime = 0;
                area.kills = 0;
                area.score = 0;
            } else if (score < killScore * 2) {
                area.clearTime = 0;
                area.kills = 1;
                area.score = killScore;
            } else if (score < killScore * 3) {
                area.clearTime = 0;
                area.kills = 2;
                area.score = killScore * 2;
            } else if (score >= killScore * 3 && score <= maxAreaScore) {
                area.clearTime = Math.ceil((maxAreaScore - score) / scorePerSecond);
                area.kills = 3;
                area.score = score;
            }
            return area;
        };

        calculator.getCalculatorHref = function(instructions) {
            var string = "calculator.html?";
            for(var i = 0; i < 3; i++) {
                if (instructions[i]) {
                    string += "clearTime." + i + "=" + (instructions[i].clearTime || "0") + "&";
                    string += "kills." + i + "=" + (instructions[i].kills || "0") + "&";
                    string += "score." + i + "=" + (instructions[i].score || "0") + "&";
                }
            }
            return string;
        };

        calculator.getAdviceByScore = function(targetScore){
            calculator.recommendations = [];
            calculator.foundAdvice = false;

            cases.forEach(function(e){
                var minScore = calculator.getBoundary(e.clearedAreas, e.min, e.killsInUncleared);
                var maxScore = calculator.getBoundary(e.clearedAreas, e.max, e.killsInUncleared);
                console.log(targetScore, minScore, maxScore, targetScore > minScore && targetScore <= maxScore);
                e.show = targetScore > minScore && targetScore <= maxScore;
                if (e.show) calculator.foundAdvice = true;
            });
            return cases;
        };

        calculator.getBoundary = function(numberOfAreasCleared, timeLeft, killsInAreaUncleared) {
            return (killScore * 3 + (scorePerSecond * (timeLeft))) * numberOfAreasCleared + ((killsInAreaUncleared || 0) * killScore);
        };

        calculator.getInstructionsFromStrategy = function(strategy, targetScore) {
            let score = targetScore;
            if (strategy.killsInUncleared) {
                score -= strategy.killsInUncleared * killScore;
            }
            if (strategy.clearedAreas) {
                score /= strategy.clearedAreas;
            }
            var areas = [];
            var area = calculator.computeByScore(score);
            for(var i = 0; i < strategy.clearedAreas; i++) {
                areas.push({
                    clearTime: area.clearTime,
                    kills: area.kills,
                    score: area.score
                });
            }
            if (strategy.killsInUncleared) {
                areas.push({
                    clearTime: 0,
                    kills: strategy.killsInUncleared,
                    score: strategy.killsInUncleared*killScore
                })
            }
            var length = areas.length;
            for(var j = 0; j < 3-length; j++) {
                console.log('push empty instruction', JSON.stringify(strategy), j, 3-areas.length);
                areas.push({
                    clearTime: 0,
                    kills: 0,
                    score: 0
                });
            }
            return areas;
        };

        calculator.total = function () {
            var total = 0, end = false;
            calculator.areas.forEach(function (a) {
                if (!end)
                    total += parseInt(a.score);
                if (a.kills < 3) end = true;
            });
            return total;
        };

        calculator.getInstructionsToString = function(areas) {
            var str = "";
            var ended = false;
            areas.forEach(function (area, i) {
                if (ended) return;
                if (area.kills === 3) {
                    str += `[A${i + 1}] ${calculator.remainingTime(area.clearTime)} time left. `;
                } else if (area.kills > 0) {
                    ended = true;
                    str += `[A${i + 1}] ${area.kills} kill${area.kills === 1 ? '' : 's'}. `;
                } else {
                    ended = true;
                    str += `[A${i + 1}] Quit Battle. `;
                }
            });

            str += `Score: ${ areas.reduce(function(total, e){ return total + e.score; }, 0) }`;
            return str;
        };

        calculator.copyInstructions = function(strategy) {

            var areas = calculator.areas;
            if (strategy) {
                areas = strategy;
            }
            str = calculator.getInstructionsToString(areas);

            console.log(str);
            ngClipboard.toClipboard(str);
        };


        var params = getUrlVars();

        Object.keys(params).forEach(function(key) {
            let keys = key.split('.');
            if (['clearTime', 'kills', 'score'].indexOf(keys[0]) > -1 && isFinite(keys[1]) && calculator.areas[keys[1]]) {
                calculator.areas[parseInt(keys[1])][keys[0]] = parseInt(params[key]);
                calculator.recompute(parseInt(keys[1]), keys[0]);
            }
        });

    });
