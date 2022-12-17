function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomCordsInRadius(x, y, r) {
    let ang = Math.random() * 2 * Math.PI,
        hyp = Math.sqrt(Math.random()) * r,
        adj = Math.cos(ang) * hyp,
        opp = Math.sin(ang) * hyp;

    return new Position(x + adj, y + opp);

}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();

    x = (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    y = (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;

    return new Position(x, y);
}

function isInRange(obj1, obj2, range) {

    //Check 'obj1' and 'obj2' type, num or pos
    var a = typeof obj1.x == "number" ? obj1 : obj1.pos;
    var b = typeof obj2.x == "number" ? obj2 : obj2.pos;

    if (((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y)) < Math.pow(range, 2)) return true;
    else return false;
}

