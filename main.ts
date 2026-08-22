//% color=190 weight=100 icon="\uf1ec" block="MCarBotBasic"
//% groups=['General','RGB LED', 'Line Follower', 'Moves']
namespace MCarBotBasic {
    export enum Dir {
        Forward = 0,
        Backward = 1
    };
    export enum Led {
        Right = 0,
        Left = 1,
        All = 2
    };
    //% blockId=mcarbot_init
    //% block="McarBot Init"
    //% group="General"
    export function McarBotInit() {
        sendI2cWriteCommand(1, 1, 0, 0, 0, 0, 0, 0);
    }
    //% block='McarBot Reset'
    //% group='General'
    export function McarBotReset() {
        sendI2cWriteCommand(2, 1, 0, 0, 0, 0, 0, 0);
    }
    //% block='LED:$led R:$red G:$green B:$blue'
    //% inlineInputMode=inline
    //% red.defl=1
    //% red.min=0 red.max=1
    //% green.defl=1
    //% green.min=0 green.max=1
    //% blue.defl=1
    //% blue.min=0 blue.max=1
    //% group='RGB LED'
    export function setLed(led: Led, red: number, green: number, blue: number) {
        i2cWriteCommand(10, led, red, green, blue, 0);
        basic.pause(50);
        i2cReadCommand();
    }

    //% block = "Line Follower Sensors On"
    //% group='Line Follower'
    export function getSensors() {
        sendI2cWriteCommand(101, 0, 0, 0, 0, 0, 0, 0);
        // Read
    }
    //% block = "Start Motors"
    //% group='Moves'
    export function StartMotors() {
        sendI2cWriteCommand(21, 1, 0, 0, 0, 0, 0, 0);
    }
    //% block = "Stop Motors"
    //% group='Moves'
    export function StopMotors() {
        sendI2cWriteCommand(22, 1, 0, 0, 0, 0, 0, 0);
    }
    //% block = "Left Motor Dir:$dir Speed:$speed"
    //% speed.defl=100
    //% speed.min=0 speed.max=100
    //% group='Moves'
    export function LeftMotor(dir: Dir, speed: number): void {
        sendI2cWriteCommand(23, 1, speed, dir, 0, 0, 0, 0);
    }
    //% block = "Right Motor Dir:$dir Speed:$speed"
    //% speed.defl=100
    //% speed.min=0 speed.max=100
    //% group='Moves'
    export function RightMotor(dir: Dir, speed: number): void {
        sendI2cWriteCommand(24, 1, speed, dir, 0, 0, 0, 0);
    }

    // note that Caml casing yields lower case
    // block text with spaces
    export function getRpAddress() {
        let rp_address = 0x13;
        return rp_address;
    }
    function i2cWriteCommand(commandId: number, subCommandId: number, arg1: number, arg2: number, arg3: number, arg4: number) {
        let writeCommandBuffer = pins.createBuffer(6);
        writeCommandBuffer.setNumber(NumberFormat.UInt8LE, 0, commandId);
        writeCommandBuffer.setNumber(NumberFormat.UInt8LE, 1, subCommandId);
        writeCommandBuffer.setNumber(NumberFormat.UInt8LE, 2, arg1);
        writeCommandBuffer.setNumber(NumberFormat.UInt8LE, 3, arg2);
        writeCommandBuffer.setNumber(NumberFormat.UInt8LE, 4, arg3);
        writeCommandBuffer.setNumber(NumberFormat.UInt8LE, 5, arg4);
        pins.i2cWriteBuffer(getRpAddress(), writeCommandBuffer, false);
    }
    function i2cReadCommand() {
        return pins.i2cReadBuffer(getRpAddress(), 6, false);
    }
    function sendI2cWriteCommand(commandId: number, commandType: number, arg1: number, arg2: number, arg3: number, arg4: number, arg5: number, arg6: number) {
        let writeCommandBuffer = pins.createBuffer(8);
        writeCommandBuffer.setNumber(NumberFormat.UInt8LE, 0, commandId);
        writeCommandBuffer.setNumber(NumberFormat.UInt8LE, 1, commandType);
        writeCommandBuffer.setNumber(NumberFormat.UInt8LE, 2, arg1);
        writeCommandBuffer.setNumber(NumberFormat.UInt8LE, 3, arg2);
        writeCommandBuffer.setNumber(NumberFormat.UInt8LE, 4, arg3);
        writeCommandBuffer.setNumber(NumberFormat.UInt8LE, 5, arg4);
        writeCommandBuffer.setNumber(NumberFormat.UInt8LE, 6, arg5);
        writeCommandBuffer.setNumber(NumberFormat.UInt8LE, 7, arg6);
        pins.i2cWriteBuffer(getRpAddress(), writeCommandBuffer, false);
    }
}