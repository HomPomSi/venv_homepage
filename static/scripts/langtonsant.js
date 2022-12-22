let running = false;
let grid = [];
let w = 400;
let h = 400;
let x = w/2;
let y = h/2;
let direction = 0;
let speed = 2**13;
let rules = [];
let colors = [];
let rules_map = {};
let steps = 0;

const color_button = document.getElementById("langtonsant-color-button");
const current_rules = document.getElementById("langtonsant-current-rules");
const current_steps = document.getElementById("langtonsant-current-steps");

let numberWithDots = function(number) {     
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
}

let start = function() {
    running = true;
}


let stop = function() {
    running = false;
}

let add_rule = function( direction_delta ) {
    if (rules.length < 20) {
        rules.push(direction_delta)
        colors.push(color_button.style.backgroundColor);
        add_rule_to_current_rules(rules_map[direction_delta]);
    }
}

let delete_rule = function() {
    if (rules.length > 0) {
        let rule = rules.pop();
        colors.pop();
        current_rules.removeChild(current_rules.lastChild);
    }
}

let add_rule_to_current_rules = function( rule_char ) {
    let span = document.createElement("span");
    span.className = "langtonsant-rule-char".concat((rules.length - 1).toString());
    span.textContent = rule_char;
    span.style.color = colors[rules.length - 1];
    current_rules.appendChild(span);
}

let make_color = function() {
    let color = new String("#").concat(Math.floor(Math.random() * 256).toString(16), Math.floor(Math.random() * 256).toString(16), Math.floor(Math.random() * 256).toString(16));
    while (color.length < 7) {
        color = color.concat("0");
    }
    color_button.style.backgroundColor = color;
} 

let s = function ( p ) {
    
    let resize = function () {
        if (document.documentElement.clientWidth <= w + 300) {
            document.getElementById("langtonsant-full-wrapper").style.flexDirection = "column";
        } else {
            document.getElementById("langtonsant-full-wrapper").style.flexDirection = "";
        }

    }

    let move = function() {
        let value = grid[x][y]%rules.length;
        direction = ((direction + rules[value])%4 + 4)%4;
        color = colors[value];

        p.fill(color);
        grid[x][y] += 1;
        p.rect(x, y, 1, 1);
        

        if (direction == 0) {
            x = (x + 1)%w;
        } else if (direction == 1) {
            y = ((y - 1)%h + h)%h;
        } else if (direction == 2) {
            x = ((x - 1)%w + w)%w;
        } else {
            y = (y + 1)%h;
        }
    }

    p.setup = function() {
        p.createCanvas(w, h);
        p.background(70);
        
        document.getElementById("langtonsant-color-button").style.backgroundColor = make_color();
        
        colors = ["#000000", "#ffffff"];
        rules = [1];
        add_rule_to_current_rules("R");
        rules = [1, -1];
        add_rule_to_current_rules("L");

        rules_map = {
            1: "R",
            "-1": "L",
            0: "F",
            2: "B"
        }

        for (let i = 0; i < h; i++) {
            grid[i] = [];
            for (let j = 0; j < w; j++) {
                grid[i][j] = 0;
            }
        }
        p.noStroke();
    }

    p.draw = function() {
        resize();
        if (running) {
            for (let loop = 0; loop < speed; loop++){
                move();
            }
            steps += speed;
            current_steps.textContent = numberWithDots(steps);
        }
    }
}

let myp5 = new p5(s, "canvas");

let reset = function () {
    x = w/2;
    y = h/2;
    direction = 0;
    running = false;
    steps = 0;
    current_steps.textContent = "0";
    for (let i = 0; i < h; i++) {
        grid[i] = [];
        for (let j = 0; j < w; j++) {
            grid[i][j] = 0;
        }
    }
    const canvas = document.getElementById("canvas").childNodes[1];
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#464646";
    ctx.fillRect(0, 0, w, h);
}


let reset_all = function() {
    while (current_rules.firstChild) {
        current_rules.removeChild(current_rules.lastChild);
    }
    colors = ["#000000", "#ffffff"];
    rules = [1];
    add_rule_to_current_rules("R");
    rules = [1, -1];
    add_rule_to_current_rules("L");
    reset();
}
