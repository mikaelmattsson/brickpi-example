var brickpi = require('brickpi-raspberry');

export default class App {

    start() {

        var robot = new brickpi.BrickPi();
        var motorA = new brickpi.Motor({port: brickpi.PORTS.MA, name: 'motorA'});
        // var motorB = new brickpi.Motor({port: brickpi.PORTS.MB, name: 'motorB'});
        // var infraA = new brickpi.Sensor({
        //     port: brickpi.PORTS.S2,
        //     type: brickpi.SENSOR_TYPE.EV3.INFRARED.M6,
        //     name: 'Head'
        // });

        // var touchB = new brickpi.Sensor({
        //     port: brickpi.PORTS.S2,
        //     type: brickpi.SENSOR_TYPE.NXT.TOUCH,
        //     name: 'Touch Sensor on upper right arm'
        // });
        //

        var touch = new brickpi.Sensor({port: brickpi.PORTS.S2, type: brickpi.SENSOR_TYPE.EV3.TOUCH.RAW});
        // var irLink = new brickpi.Sensor({port: brickpi.PORTS.S3, type: brickpi.SENSOR_TYPE.I2C, name: 'irlink'});

        robot
            .addMotor(motorA)
            // .addMotor(motorB)
            .addSensor(touch)
            .setup();

        robot.on('ready', function() {
            motorA.resetPosition();
            // motorB.resetPosition();
            robot.run();

            motorA.start(100).moveTo(1000, function(err) {
                motorA.start(50).moveTo(500);
                // called when motorA has reached 5000 ticks (2500 degrees in rotation)
                // robot.stop();
            });
        });

        // setTimeout(function() {
        //     motorB.start(50);
        // }, 3000);
        //
        // setTimeout(function() {
        //     motorB.stop();
        // }, 5000);

        robot.on('tick', function() {
            // called at every polling cycle.
            // var value = infraA.getValue();
            var value = touch.getValue();
            if(value === 1023) {
                console.log(value);
                motorA.stop();
                motorA.resetPosition();
                motorA.start(150).moveTo(2000, function(err) {
                    motorA.start(50).moveTo(1500);
                    // called when motorA has reached 5000 ticks (2500 degrees in rotation)
                    // robot.stop();
                });
            }
        });

        setTimeout(function() {
            robot.stop();
        }, 20000);

        // setInterval(function() {
        //     // var value = infraA.getValue();
        //     // var value = touchB.getValue();
        //     // console.log(touchB);
        // }, 1000)
    }

}
