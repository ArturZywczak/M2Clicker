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

    return [x + adj, y + opp];

}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    
    x = (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    y = (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
    //x = Math.round(x); y = Math.round(y);

    return new Position(x,y);
}