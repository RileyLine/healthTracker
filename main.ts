function checkGoal () {
    if (steps == currentGoal) {
        music.setVolume(99);
        for (let i = 0; i < 4; i++) {
            music.playMelody("A B A C5 B A G A ", 240);
        }
        
    }
}
function checkMode () {
    if (stepMode) {
        displayText("STEP MODE");
        if (!(settingsMode)) {
            displayText(`Goal: ${goals[index]} Current: ${steps}`);
            loops.everyInterval(500, function () {
                displayText(`${steps}`);
            })
        } else {
            displayText(`Set Goal`);
        }
    } else {
        displayText("HEART MODE");
        loops.everyInterval(10000, function () {
            bpm = presses * 6;
            presses = 0;
            displayText(`${bpm}`);
        })
    }
}
input.onButtonPressed(Button.A, function () {
    stepMode = !(stepMode);
    checkMode();
})
input.onButtonPressed(Button.AB, function () {
    steps = 0;
})
input.onButtonPressed(Button.B, function () {
    if (stepMode) {
        settingsMode = true;
        checkMode();
        index += 1;
        if (index > goals.length - 1) {
            index = 0;
        }
        currentGoal = goals[index];
        displayText(`${currentGoal}`);
    } else {
        presses += 1;
    }
})
input.onGesture(Gesture.Shake, function () {
    steps += 1;
    checkGoal();
})
let settingsMode = false;
let stepMode = false;
let index = 0;
let steps = 0;
let bpm = 0;
let presses = 0;
let goals: number[] = [];
let currentGoal = 0;
stepMode = true;
goals = [10, 20, 30];
function displayText(output:any) {
    basic.showString(output, 75);
}
checkMode()
