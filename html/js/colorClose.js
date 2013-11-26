var colorRef = new Firebase('https://softwarebyaj.firebaseio.com/color')

/*$("#target").keypress(function (event) {
  if (event.keyCode == 13) {
    //var color = $('#target').val();
    colorRef.push({color:color}, function (error) {
      if (error) {
        alert('data could not be saved.' + error);
      } else {
        alert('data saved successfully');
      }
    });
    readData()
  }
});*/

$(function() {
    $("form").submit(function(){return false;});
});

function readData(){
  var firstColor = new Firebase('https://softwarebyaj.firebaseio.com/color/');

  firstColor.on('value', function (snapshot) {
    if (snapshot.val() === null) {
      alert('Color does not exist');
    } else {
      var colors = snapshot.val();
      var minDifference = 255 * 3;
      var minIndex = -1;
      var maxIndex = Object.keys(colors).length - 1;
      
      var hexColor = parseInt($('#target').val(), 16);
      var decRed = (hexColor >> 16) & 255;
      var decGreen = (hexColor >> 8) & 255;
      var decBlue = hexColor & 255;

      for (var i = 0; i < maxIndex; i++) {
        var sumDiff = Math.abs(colors[i].red - decRed)
                    + Math.abs(colors[i].green - decGreen)
                    + Math.abs(colors[i].blue - decBlue);
        if (sumDiff < minDifference) {
          minIndex = i;
          minDifference = sumDiff;
        }
      }
      $('#ciName').html(colors[minIndex]['colour name']);
      $('#ciHexCode').html(colors[minIndex]['colour hex code']);
      $('#colorHue').css('background-color', 'rgb('+colors[minIndex].red +','+colors[minIndex].green +','+colors[minIndex].blue+')');
    }
  });

}