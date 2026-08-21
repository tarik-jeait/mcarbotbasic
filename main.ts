//% color=190 weight=100 icon="\uf1ec" block="MCarBotBasic"
//% groups=['General','RGB LED', 'Line Follower', 'Moves']
namespace MCarBotBasic {

    export enum Dir {
        Forward = 0,
        Backward = 1
    }
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
    //% block='Left Led R:$red G:$green B:$blue'
    //% red.defl=255
    //% red.min=0 red.max=255
    //% green.defl=255
    //% green.min=0 green.max=255
    //% blue.defl=255
    //% blue.min=0 blue.max=255
    //% group='RGB LED'
    export function LeftLed(red: number, green: number, blue: number) {
        sendI2cWriteCommand(11, 1, red, green, blue, 0, 0, 0);
    }

    //% block='RLed R:$rred G:$rgreen B:$rblue|LLed R:$lred G:$lgreen B:$lblue'
    //% inlineInputMode=inline
    //% rred.defl=255
    //% rred.min=0 rred.max=255
    //% rgreen.defl=255
    //% rgreen.min=0 rgreen.max=255
    //% rblue.defl=255
    //% rblue.min=0 rblue.max=255
    //% lred.defl=255
    //% lred.min=0 lred.max=255
    //% lgreen.defl=255
    //% lgreen.min=0 lgreen.max=255
    //% lblue.defl=255
    //% lblue.min=0 lblue.max=255    
    //% group='RGB LED'
    export function BothLeds(rred: number, rgreen: number, rblue: number, lred: number, lgreen: number, lblue: number) {
        sendI2cWriteCommand(13, 1, rred, rgreen, rblue, lred, lgreen, lblue);
    }
    //% block='Right Led R:$red G:$green B:$blue'
    //% red.defl=255
    //% red.min=0 red.max=255
    //% green.defl=255
    //% green.min=0 green.max=255
    //% blue.defl=255
    //% blue.min=0 blue.max=255
    //% group='RGB LED'
    export function Rightled(red: number, green: number, blue: number) {
        sendI2cWriteCommand(12, 1, red, green, blue, 0, 0, 0);
    }

    //% block='Get LF Sensors'
    //% group='Line Follower'
    export function getSensors() {
        sendI2cWriteCommand(101, 0, 0, 0, 0, 0, 0, 0);
        // Read
        let buffer = receiveI2cData();
    }
    //% block='Calibrate LF Sensors'
    //% group='Line Follower'
    export function calibrateSensors() {
        sendI2cWriteCommand(102, 0, 0, 0, 0, 0, 0, 0);
        // Read
        let buffer = receiveI2cData();
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

    function receiveI2cData() {
        let receivedBuffer = pins.i2cReadBuffer(getRpAddress(), 32, false);
        return receivedBuffer;
    }
}