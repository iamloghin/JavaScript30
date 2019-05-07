/*jslint esversion: 6 */

    let isPressed = false;
    let lastX = 0, lastY = 0;
    const hue = (function() {
        const base = 0;
        const max = 360;
        const min = 0;
        const ratio = 2;

        let value = base;

        return {
            currentValue: function() { return value; },
            reset: function() { value = min; },
            setValue: function() { return value >= max ? value = min : value += ratio; }
        };
    })();

    const lineWidth = (function() {
        const base = 40;
        const max = 360;
        const min = 0;
        const ratio = 2;
        const sizeChange = 10;

        let value = base;
        let direction = true;

        return {
            currentValue: function() { return value; },
            reset: function() { value = 40; },
            getUp: function() { value += sizeChange; },
            getDown: function() { value -= sizeChange; },
            setValue: function() {
                if(value >= max || value < min) value = base;
                if(direction) {
                    if(value >= max) {
                        direction = false;
                        return value -= ratio;
                    }
                    return value += ratio;
                } else {
                    if(value <= min) {
                        direction = true;
                        return value += ratio;
                    }
                    return value -= ratio;
                }
            }
        };
    })();

    const canvas = document.querySelector('#draw');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.onresize = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#BADA55';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = lineWidth.currentValue();
    // ctx.globalCompositeOperation = 'multiply';

    function draw(e) {
        if(!isPressed) return;

        ctx.strokeStyle = `hsl(${hue.setValue()}, 100%, 50%)`;
        ctx.lineWidth = lineWidth.setValue();
        ctx.beginPath();
        ctx.moveTo(lastX,lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();

        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    canvas.addEventListener('mousedown', e => {
        isPressed = true;
        hue.reset();
        [lastX, lastY] = [e.offsetX, e.offsetY];
        draw(e);
    });

    canvas.addEventListener('mouseup', () => isPressed = false);
    canvas.addEventListener('mouseout', () => isPressed = false);
    canvas.addEventListener('mousemove', draw);
    window.addEventListener('keydown', keyPress);

    function keyPress(e) {
        var evtobj = window.event? event : e;
        if (evtobj.keyCode == 107 && evtobj.shiftKey) ctx.lineWidth = lineWidth.getUp();
        if (evtobj.keyCode == 109 && evtobj.shiftKey) ctx.lineWidth = lineWidth.getDown();
    }
