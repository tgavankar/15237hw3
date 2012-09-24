function init() {
    geocoder = new google.maps.Geocoder();
}

function submit() {
    if(verify()) {
        codeAddress();
    }
}

function verify() {
    if(!document.getElementById("place").value) {
        alert('Search term is required');
        return false;
    }
    if(!document.getElementById("address").value) {
       alert('Near is required');
        return false;
    }
    return true;
}

function codeAddress() {
 var address = document.getElementById("address").value;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var panoRequestOpts = {
          'tag': document.getElementById('place').value,
          'rect': {
            'sw': 
                {'lat': (results[0].geometry.location.Xa - getRadioValue('range')), 
                 'lng': (results[0].geometry.location.Ya - getRadioValue('range'))}, 
            'ne': 
                {'lat': (results[0].geometry.location.Xa + getRadioValue('range')), 
                 'lng': (results[0].geometry.location.Ya + getRadioValue('range'))}}
        };

        var panoRequest = new panoramio.PhotoRequest(panoRequestOpts);
      
        var panoOptions = {
            'width': 750,
            'height': 150,
            'columns': 5,
            'croppedPhotos': true
        };
      
        var widget = new panoramio.PhotoListWidget('wapiblock', panoRequest, panoOptions);
        document.getElementById("formatted_addr").innerHTML = results[0].formatted_address;
        widget.setPosition(0);
        
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }

function getRadioValue(name) {
    for (var i = 0; i < document.getElementsByName(name).length; i++) {
        if (document.getElementsByName(name)[i].checked) {
                return document.getElementsByName(name)[i].value;
        }
    }
}
