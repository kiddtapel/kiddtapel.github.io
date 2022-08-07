angular.module('testApp', ['rzSlider'])
    .controller('TestController', function () {
        this.results = [];
        this.length = 10;
        this.duplicateChars = [{value: 0}, {value: 9}];
        this.addDuplicate = function () {
            this.duplicateChars.push({value: 0});
        };
        this.synthesizeString = function (length, duplicateChars) {
            let s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".substring(0, length);
            duplicateChars.forEach(function (e) {
                let char = s.charAt(e.value);
                s = s.replace(char, '*');
            });
            return s;
        };
        this.testSynthesizedString = function (length, duplicateChars) {
            let s = this.synthesizeString(length, duplicateChars);
            this.test(s);
        };
        this.test = function (s) {
            this.results.push(_uniqueLetterString(s));
        };
        this.runTemp = function (length, duplicateChars) {
            let s = this.synthesizeString(length, duplicateChars);
            this.temporaryResult = _uniqueLetterString(s);
        };

        function _uniqueLetterString(s) {
            let stats = [];
            let result = 0;
            for (let i = 0; i < s.length; i++) {
                for (let j = 1; j <= s.length - i; j++) {
                    result += countUnique(s.substr(i, j), stats, i);
                }
            }
            let approximateValues = approx(s);
            let differencesOfStats = stats.map(function (e, index, arr) {
                return approximateValues[index] - e;
            });
            let approx1 = joinPadded(approximateValues);
            let diff = joinPadded(differencesOfStats);
            let stats1 = joinPadded(stats);
            return {
                s: s,
                length: s.length,
                countSet: countSet(s),
                result: result,
                sum: sum(stats),
                approxSum: sum(approximateValues),
                approx: approx1,
                diff: diff,
                stats: stats1
            };
        }

        function joinPadded(arr) {
            return arr.join(',');
            // let max = -1;
            // console.log(JSON.stringify(arr));
            // arr.forEach(e => {
            //     if (Math.log10(e) > max) {
            //         max = Math.floor(Math.log10(e || 1));
            //     }
            //     console.log(e, max);
            // });
            // console.log(max);
            // return arr.map(e => {
            //     let padding = max - Math.log10(e);
            //     let padded = e + ''
            //     for (let i = 0; i<padding; i++) {
            //         padded = ' ' + padded;
            //     }
            //     return padded;
            // }).join(',');
        }

        function uniqueLetterString(s) {
            return _uniqueLetterString(s).result;
        }

        function approx(s) {
            let approximateValues = [];
            let adder = s.length;
            for (let i = 0; i < s.length; i++) {
                let previous = approximateValues[i - 1] || 0;
                approximateValues[i] = previous + adder;
                adder -= 2;
            }
            return approximateValues;
        }

        function sum(arr) {
            let sum = 0; // initialize sum

            // Iterate through all elements
            // and add them to sum
            for (let i = 0; i < arr.length; i++)
                sum += arr[i];

            return sum;
        }

        function countUnique(s, stats, start) {
            let dictionary = {};
            let duplicate = {};
            for (let i = 0; i < s.length; i++) {
                let l = s.substr(i, 1);
                if (dictionary[l]) duplicate[l] = true;
                dictionary[l] = true;
            }
            for (let i = 0; i < s.length; i++) {
                let l = s.substr(i, 1);
                if (!duplicate[l]) {
                    if (stats[start + i] === undefined) stats[start + i] = 0;
                    stats[start + i]++;
                }
            }
            return (Object.keys(dictionary).length || 0) - (Object.keys(duplicate).length || 0);
        }

        function countSet(s) {
            let dictionary = {};
            for (let i = 0; i < s.length; i++) {
                let l = s.substr(i, 1);
                dictionary[l] = true;
            }
            return Object.keys(dictionary).length || 0;
        }
        this.runTemp(this.length, this.duplicateChars);
    });
