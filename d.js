$(document).ready(function(){

    var imageDpi = 300;

    var can = document.getElementById('canvas');
    var ctx = can.getContext('2d');
    var startX, startY;

    $("canvas").mousedown(function(event){
        startX = event.pageX;
        startY= event.pageY;

        $(this).bind('mousemove', function(e){
            drawLine(startX, startY, e.pageX, e.pageY);
        });
    }).mouseup(function(){
        $(this).unbind('mousemove');
    });

    function drawLine(x, y, stopX, stopY){
        ctx.clearRect (0, 0, can.width, can.height);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(stopX, stopY);
        ctx.closePath();
        ctx.stroke();

        // calculate length   
        var pixelLength = Math.sqrt(Math.pow((stopX - x),2) + Math.pow((stopY-y),2));
        var physicalLength = pixelLength / imageDpi;
        // console.log("line length = " + physicalLength + 
        //             " inches (image at " + imageDpi + " dpi)");
        
        var div = document.getElementById('distance');

    div.innerHTML = physicalLength;
    }
});