$(document).ready(function(){

  window.addEventListener('load', function(){
    var mapView=new initializeMap();
    mapView.run();

    $("#submit").on('click',function(e){
      if($("#search1").val()!="")loc.name=$("#search1").val();
      else loc.name="Espoo,FI"
      $("#api_query").attr("href","http://api.openweathermap.org/data/2.5/forecast?q="+loc.name
      +"&appid=d94d33d922a61c31e19c03ef67d9f9f9&mode=JSON&units=metric");
      mapView.pinPoster([loc.name]);
      mapView.updateInfo(loc.name);
    })

    $(".city_link").on('click',function(e){
      loc.name=$(this).attr("value");
      $("#api_query").attr("href","http://api.openweathermap.org/data/2.5/forecast?q="+loc.name
      +"&appid=d94d33d922a61c31e19c03ef67d9f9f9&mode=JSON&units=metric");
      mapView.updateInfo(loc.name);
    })
  });

  //$(document).bind("projectLoadComplete", initializeMap);

  $("#api_query").attr("href","http://api.openweathermap.org/data/2.5/forecast?q="+loc.name
  +"&appid=d94d33d922a61c31e19c03ef67d9f9f9&mode=JSON&units=metric");

  var draw=new drawForecast();
  draw.updateForecaChart(loc);

   $(".jumper").on("click",function(e){
     e.preventDefault();
       var offset = $($(this).attr('href')).offset().top+
       $("#chart_container").scrollTop()-220;
       console.log(offset);
       $("#chart_container").animate(
         {scrollTop:offset},600);
     })

  var content;
  $(window).resize(function() {

    if( $(this).width()<540 && $("#img_weather_box").children().length===1) {
        content=$("#img_weather_box").html();
        $("#img_weather").detach();
    }
    if( $(this).width() >=540&& $("#img_weather_box").children().length<1) {
      $("#img_weather_box").prepend(content);
    }
  });

  $("#canvas1").on('click',function(e){
    var activeElements=forecaChart.getElementsAtEvent(e);
    var index=activeElements[0]._index;
    $("#info_img").attr("src","images/"+weatherData.list[index].weather[0].main+".png");
    $("#info_time").html(forecaData.labels[index]);
    $("#info_temperature").html(weatherData.list[index].main.temp+"&ordmC");
    $("#info_wind").html(weatherData.list[index].wind.speed+"m/s");
    $("#info_humidity").html(weatherData.list[index].main.humidity+"%");

  })
});
