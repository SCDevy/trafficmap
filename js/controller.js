trafficApp.controller('dataCtrl', function($scope, $firebase) {
    $scope.title = 'Interesting Data';

    // data reference
//    var dataRef = new Firebase('https://trafficmap.firebaseio.com/');
    var dataRef = new Firebase('https://shining-fire-3401.firebaseio.com/');

    // render data
    dataRef.on('value', function(snapshot) {
        var cars = snapshot.val().cars;
        var ramps = snapshot.val().ramps;
        var directions = snapshot.val().directions;

        var rampCounter = 0;
        for (var x = 0; x < ramps.length; x++) {
            rampCounter++;
        }

        var carCounter = 0;
        for (var x = 0; x < cars.length; x++) {
            carCounter++;
        }

        var directionCounter = 0, directionAvg = 0;
        for (var x = 0; x < directions.time24.length; x++) {
            directionCounter++; directionAvg = directionAvg + directions.time24[x];
        }
        directionAvg = directionAvg/directionCounter;

        // Data to Scope Variable
        function dataSet() {
            $scope.ramps = rampCounter;
            $scope.cars = carCounter;
            $scope.start = directions.start.ramp + ', I-' + directions.start.freeway;
            $scope.end = directions.end.ramp + ', I-' + directions.end.freeway;
            $scope.directions = directionAvg;
        }
        $scope.$apply(dataSet());
    });

    // generate all data to console
    $scope.generate = function () {
        dataRef.on('value', function(snapshot) {
            var title = snapshot.val().title;
            var cars = snapshot.val().cars;
            var ramps = snapshot.val().ramps;
            var directions = snapshot.val().directions;

            console.log(title);
            for (var x = 0; x < cars.length; x++) {
                console.log(cars[x]);
            }
            for (var x = 0; x < ramps.length; x++) {
                console.log(ramps[x]);
            }
            for (var x = 0; x < directions.length; x++) {
                console.log(directions[x]);
            }
        });
    }

    // draw ramps and cars
    dataRef.on('value', function(snapshot) {
        var ramps = snapshot.val().ramps;
        var cars = snapshot.val().cars;
        var c = document.getElementById("renderer");
        var xRamp, yRamp, xCar, yCar;
        var colorRamp = "#555555", color = "#000000";
        var sizeRamp = 12, size = 10;

        for (var x = 0; x < ramps.length; x++) {
            xRamp = ramps[x].x;
            yRamp = ramps[x].y;
            drawCar(c, xRamp, yRamp, colorRamp, sizeRamp);
        }

        for (var x = 0; x < cars.length; x++) {
            xCar = cars[x].x;
            yCar = cars[x].y;
            if (cars[x].color == 'red') { color = "#FF0000"; }
            else if (cars[x].color == 'green') { color = "#00CC00"; }
            else if (cars[x].color == 'yellow') { color = "#FFFF00"; }
            drawCar(c, xCar, yCar, color, size);
        }

        function drawCar(c, x, y, color, size) {
            var point = c.getContext("2d");
            point.fillStyle = color;
            point.fillRect(x,y,size,size);
        }
    });
});


trafficApp.controller('aboutCtrl', function($scope) {
    $scope.title = 'About';

    // data reference
    var dataRef = new Firebase('https://trafficmap.firebaseio.com/');
//    var dataRef = new Firebase('https://shining-fire-3401.firebaseio.com/');

    // draw ramps and cars
    dataRef.on('value', function(snapshot) {
        var ramps = snapshot.val().ramps;
        var cars = snapshot.val().cars;
        var c = document.getElementById("renderer");
        var xRamp, yRamp, xCar, yCar;
        var colorRamp = "#555555", color = "#000000";
        var sizeRamp = 12, size = 10;

        for (var x = 0; x < ramps.length; x++) {
            xRamp = ramps[x].x;
            yRamp = ramps[x].y;
            drawCar(c, xRamp, yRamp, colorRamp, sizeRamp);
        }

        for (var x = 0; x < cars.length; x++) {
            xCar = cars[x].x;
            yCar = cars[x].y;
            if (cars[x].color == 'red') { color = "#FF0000"; }
            else if (cars[x].color == 'green') { color = "#00CC00"; }
            else if (cars[x].color == 'yellow') { color = "#FFFF00"; }
            drawCar(c, xCar, yCar, color, size);
        }

        function drawCar(c, x, y, color, size) {
            var point = c.getContext("2d");
            point.fillStyle = color;
            point.fillRect(x,y,size,size);
        }
    });
});


trafficApp.controller('searchCtrl', function($scope, $firebase) {
    $scope.title = 'Get Directions';

    // dropdowns
    generateList('start');
    generateList('end');
    function generateList(position) {
        var pos = document.getElementById(position);
        var select = document.createElement('select');
        select.id = position + 'Select';
        for (var i = 0; i < rampsData.length; i++) {
            ramp = document.createElement('option');
            ramp.value = rampsData[i].id;
            ramp.innerHTML =
                rampsData[i].exitName + ', I-' + rampsData[i].freeway;
            select.appendChild(ramp);
        }
        pos.appendChild(select);
    }

//    var dataRef = new Firebase('https://trafficmap.firebaseio.com/');
    var dataRef = new Firebase('https://shining-fire-3401.firebaseio.com/');

    dataRef.on('value', function(snapshot) {
        // data to scope variable
        $scope.startLocation = snapshot.val().directions.start.ramp + ', I-' + snapshot.val().directions.start.freeway;
        $scope.endLocation = snapshot.val().directions.end.ramp + ', I-' + snapshot.val().directions.end.freeway;
        $scope.currentTime = snapshot.val().directions.timeWithoutTraffic;
        $scope.currentTimeTraffic = snapshot.val().directions.timeWithTraffic;
        $scope.$apply(function () {
            $scope.startLocation = snapshot.val().directions.start.ramp + ', I-' + snapshot.val().directions.start.freeway;
            $scope.endLocation = snapshot.val().directions.end.ramp + ', I-' + snapshot.val().directions.end.freeway;
            $scope.currentTime = snapshot.val().directions.timeWithoutTraffic;
            $scope.currentTimeTraffic = snapshot.val().directions.timeWithTraffic;
        });

        var time = snapshot.val().directions.time24;

        var avgTraffic = [100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100]; // default data

        // Firebase to array
        for (var x = 0; x < time.length; x++) {
            avgTraffic[x] = time[x];
        }

        // chart data
        var data = {
            labels : ["12:00am", "1:00am", "2:00am", "3:00am", "4:00am", "5:00am", "6:00am", "7:00am", "8:00am", "9:00am", "10:00am", "11:00am", "12:00pm", "1:00pm", "2:00pm", "3:00pm", "4:00pm", "5:00pm", "6:00pm", "7:00pm", "8:00pm", "9:00pm", "10:00pm", "11:00pm"],
            datasets : [
                {
                    fillColor : "rgba(151,187,205,0.5)",
                    strokeColor : "rgba(151,187,205,1)",
                    pointColor : "rgba(151,187,205,1)",
                    pointStrokeColor : "#fff",
                    data : avgTraffic
                }
            ]
        }

        // Create Chart
        var ctx = document.getElementById("myChart").getContext("2d");
        document.getElementById("myChart").setAttribute("width","380px");
        document.getElementById("myChart").setAttribute("height","280px");
        var myNewChart = new Chart(ctx).Line(data);
    });

    // draw directions
    dataRef.on('value', function(snapshot) {
        var directions = snapshot.val().directions.list;
        var c = document.getElementById("renderer");
        var xCoor, yCoor;
        var color = "#000099";
        var size = 10;

        for (var x = 0; x < directions.length; x++) {
            xCoor = directions[x].x;
            yCoor = directions[x].y;
            drawCar(c, xCoor, yCoor, color, size);
        }

        function drawCar(c, x, y, color, size) {
            var point = c.getContext("2d");
            point.fillStyle = color;
            point.fillRect(x,y,size,size);
        }
    });

    $('#getdirections').click(function() {
        var startID = parseInt(document.getElementById('startSelect').value);
//        var startID = document.getElementById('startSelect').value;
        console.log(startID);
        var endID = parseInt(document.getElementById('endSelect').value);
//        var endID = document.getElementById('endSelect').value;
        console.log(endID);
        dataRef.child('directions').child('start').child('id').set(startID);
        dataRef.child('directions').child('end').child('id').set(endID);
    });
});