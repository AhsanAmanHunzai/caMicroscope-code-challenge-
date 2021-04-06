var canvas  = $("#canvas"),
    context = canvas.get(0).getContext("2d"),
    $result = $('#result');
    $seg = $('#segmented');
    $center = $('#center_detection');
let croppedImageDataURL_g


$('#fileInput').on( 'change', function(){
    if (this.files && this.files[0]) {
      if ( this.files[0].type.match(/^image\//) ) {
        var reader = new FileReader();
        reader.onload = function(evt) {
           var img = new Image();
           img.onload = function() {
             context.canvas.height = img.height;
             context.canvas.width  = img.width;
             context.drawImage(img, 0, 0);
             var cropper = canvas.cropper({
               aspectRatio: 16 / 9
             });
             $('#btnCrop').click(function() {
                // Get a string base 64 data url
                croppedImageDataURL_g = canvas.cropper('getCroppedCanvas').toDataURL("image/png"); 
                // /////////////////////////////
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.open("POST", "process.php", true);
                xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState === 4 || this.status === 200){ 
                        console.log("Outer  "+this.responseText); // echo from php

                        if(this.responseText == 1){
                          console.log("clicking~~~ == "+this.responseText);
                          loading();
                          
                        }
                    }       
                };
                xmlhttp.send("id=" + croppedImageDataURL_g);
                // ///////////////////////////
                // croppedImageDataURL_g=croppedImageDataURL;
                
                // if(croppedImageDataURL == croppedImageDataURL_g){
                //   console.log(" URL Data is same")
                // }
              
             });

      

             
    function loading(){
      console.log("Modal Loaded")
      // $( "btnCrops" ).click();

      setTimeout(function(){ 
        
        $result.empty();
        $seg.empty(); 
        $center.empty(); 
        

        
        $result.append( $('<img>').attr('src', croppedImageDataURL_g));
          

        var img = document.createElement("img");
        img.src = "Edge.png";
        var src = document.getElementById("segmented");
       src.appendChild(img);
      //  ////

      var img_c = document.createElement("img");
      img_c.src = "circle.png";
      var src_c = document.getElementById("center_detection");
     src_c.appendChild(img_c);

     var img_e = document.createElement("img");
     img_e.src = "circle_2.png";
     var src_e = document.getElementById("edge_layer");
    src_e.appendChild(img_e);
       

        

       }, 3000);
      

    }

             $('#closing').click(function(){

                location.reload();
             });
             $('#btnRestore').click(function() {
               canvas.cropper('reset');
               $result.empty();
             });
           };
           img.src = evt.target.result;
				};
        reader.readAsDataURL(this.files[0]);
      }
      else {
        alert("Invalid file type! Please select an image file.");
      }
    }
    else {
      alert('No file(s) selected.');
    }
});