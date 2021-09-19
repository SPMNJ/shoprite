var url = "https://script.google.com/macros/s/AKfycbzZ-JZc4_HUXi4xZ9dFyFWVa7mXgPhkgeIsK6-IyTapsrbFHMcQ1g690Y3mZJuOYC-y/exec";
(function ($) {
  "use strict";
  $.ajaxSetup({
    crossDomain: true,
    type: "GET",
    dataType: "jsonp",
  });
  /*==================================================================
  [ Focus input ]*/


  /*==================================================================
  [ Validate ]*/
  // Bind to the submit event of our form
  $(document).on('submit', "#searchForm", function (event) {
    event.preventDefault();
    $('#info').hide();
    $('#info').html("");
    $("#load.btn-loading").show();
    $("#load.search-form-btn").hide();
    var input = $("#searchbox").val();
    $.ajax({
      url: url + "?type=coupons&id=" + input,
    });



    return false;
  });
  $(document).on('click', '#reload', function (event) {
    event.preventDefault();
    $('#info').hide();
    $('#info').html("");
    $("#reload.btn-loading").show();
    $("#reload.search-form-btn").hide();
    var input = $("#searchbox").val();
    $.ajax({
      url: url + "?type=addppc&id=" + input,
    });
  });

})(jQuery);

function addppc(response) {
  if (response.status == 200) {
    $("#info").append("<div class='success'>" + response.message + "</div>");
  }
  else {
    $("#info").append("<div class='warning'>" + response.message + "</div>");
  }
  $("#info").show();
  $("#reload.btn-loading").hide();
  $("#reload.search-form-btn").show();
}

function coupons(response) {
  if (response.status == 200) {
    $("#info").append("<div class='success'>" + response.message + "</div>");
  }
  else {
    $("#info").append("<div class='warning'>" + response.message + "</div>");
  }
  $("#info").show();
  $("#load.btn-loading").hide();
  $("#load.search-form-btn").show();
}
function getAllUrlParams(url) {
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  var obj = {};
  if (queryString) {
    queryString = queryString.split('#')[0];
    var arr = queryString.split('&');
    for (var i = 0; i < arr.length; i++) {
      var a = arr[i].split('=');
      var paramName = a[0];
      var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
      paramName = paramName.toLowerCase();
      if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
      if (paramName.match(/\[(\d+)?\]$/)) {
        var key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) obj[key] = [];
        if (paramName.match(/\[\d+\]$/)) {
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          obj[key].push(paramValue);
        }
      } else {
        if (!obj[paramName]) {
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          obj[paramName].push(paramValue);
        }
      }
    }
  }
  return obj;
}

