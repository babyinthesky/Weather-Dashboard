//var canvas=document.getElementById("canvas1");
var ctx=document.getElementById("canvas1").getContext("2d");
//var canvas2=document.getElementById("canvas2");
var ctx2=document.getElementById("canvas2").getContext("2d");
//var canvas3=document.getElementById("canvas3");
var ctx3=document.getElementById("canvas3").getContext("2d");
//var canvas4=document.getElementById("canvas4");
var ctx4=document.getElementById("canvas4").getContext("2d");

var loc={
  name:"Espoo,FI",
  lat:60.2,
  lon:24.7
};

var weatherData={};
Chart.defaults.global.defaultFontSize=14;

var forecaData = {
    labels: [],
    datasets: [
        {
            label: "Temperature"+" ("+String.fromCharCode(186)+"C)",
            type:'line',
            yAxisID:'y-axis-0',
            fill: false,
            lineTension: 0.4,
            backgroundColor: "rgba(255,102,102,0.5)",//"rgba(75,192,192,0.4)",
            borderColor: "rgba(255,102,102,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'round',
            pointBorderColor: "rgba(255,51,51,1)",
            pointBackgroundColor: "rgba(255,51,51,0.5)",
            pointBorderWidth: 1.5,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(255,51,51,1)",
            pointHoverBorderColor: "rgba(255,51,51,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 6,
            data: []
        },
        {
            label: "Precipitation(mm)",
            type:'bar',
            yAxisID:'y-axis-1',
            backgroundColor: "rgba(77, 219, 255,0.6)",
            borderColor: "rgba(0, 204, 255,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(0, 153, 255,0.6)",
            hoverBorderColor: "rgba(0, 204, 255,1)",
            data: []
        }
    ]
};

var forecaChart = new Chart(ctx, {
    type: 'bar',
    data: forecaData,
    options: {
        title:{
          display:true,
          text:"Weather Forecast in 5 Days",
          fontSize:18
        },
        tooltips:{
          titleFontSize:16,
          bodyFontSize:16
        },
        scales:{
          yAxes:[
            {
              id:'y-axis-0',
              position:'left'
            },
            {
              id:'y-axis-1',
              position:'right'
            }
          ]
        }
    }
});

var windData={
  labels:[],
  datasets:[
    {
      data:[],
      backgroundColor: [
            "rgba(255,99,132,0.7)",
            "#4BC0C0",
            "#FFCE56",
            "#E7E9ED",
            "#36A2EB",
            "#ff9933",
            "#9999ff",
            "rgba(153, 255, 102,0.7)"
        ],
    }
  ]
}
var windChart=new Chart(ctx2, {
    data: windData,
    type: 'polarArea',
    options:{
      title:{
        display:true,
        text:"Wind Speed in next 24H(m/s)",
        fontSize:18
      }
    }
});

var humidityData={
  labels:[],
  datasets:[
    {
      data:[],
      label:"Humidity(%)",
      backgroundColor: [
            "rgba(255,99,132,0.7)",
            "#4BC0C0",
            "#FFCE56",
            "#E7E9ED",
            "#36A2EB",
            "#ff9933",
            "#9999ff",
            "rgba(153, 255, 102,0.7)"
        ]
    }
  ]
}

var humidityChart=new Chart(ctx3, {
    data: humidityData,
    type: 'bar',
    options:{
      title:{
        display:true,
        text:"Humidity in next 24H(%)",
        fontSize:18
      }
    }
});

var UVIData = {
    labels: [],
    datasets: [
        {
            label: "UV Index",
            type:'line',
            yAxisID:'y-axis-0',
            fill: true,
            lineTension: 0.4,
            backgroundColor: "rgba(255,102,102,0.5)",//"rgba(75,192,192,0.4)",
            borderColor: "rgba(255,102,102,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'round',
            pointBorderColor: "rgba(255,51,51,1)",
            pointBackgroundColor: "rgba(255,51,51,0.5)",
            pointBorderWidth: 1.5,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(255,51,51,1)",
            pointHoverBorderColor: "rgba(255,51,51,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 6,
            data: []
        }
      ]
}
var UVIChart = new Chart(ctx4, {
    type: 'line',
    data: UVIData,
    options: {
        title:{
          display:true,
          text:"UV Index-One Week",
          fontSize:18
        },
        tooltips:{
          titleFontSize:16,
          bodyFontSize:16
        },
        scales:{
          yAxes:[
            {
              id:'y-axis-0',
              position:'left',
              ticks:{
                beginAtZero:true,
                stepSize:2
              }
            }
          ]
        }
    }
});

var drawForecast=function(){

}

drawForecast.prototype.getUVI=function(today,numOfDay,lat,lon,max_uv){
  var year=today.getFullYear();;
  var month="";
  var date=today.getDate();
  if(today.getMonth()<9)month="0"+(today.getMonth()+1);
  else month=today.getMonth()+1;
  //today.getMonth()<9? month="0"+(today.getMonth()+1):month=today.getMonth()+1;

  var levelColor=["rgba(170, 128, 255,0.5)","rgba(255, 51, 133,0.5)",
  "rgba(255, 153, 51,0.5)","rgba(255, 255, 51,0.5)","rgba(128, 255, 128,0.5)"];

  $.get("http://api.openweathermap.org/v3/uvi/"+lat+","+lon+"/"+
  year+"-"+month+"-"+date+"Z.json?appid=d94d33d922a61c31e19c03ef67d9f9f9")
  .then(function(data){
    UVIData.labels.push(data.time.slice(0,10));
    UVIData.datasets[0].data.push(data.data);
    if (data.data>max_uv) max_uv=data.data;
    if(max_uv>=0&&max_uv<3)UVIData.datasets[0].backgroundColor=levelColor[4];
    if(max_uv>=3&&max_uv<6)UVIData.datasets[0].backgroundColor=levelColor[3];
    if(max_uv>=6&&max_uv<8)UVIData.datasets[0].backgroundColor=levelColor[2];
    if(max_uv>=8&&max_uv<11)UVIData.datasets[0].backgroundColor=levelColor[1];
    if(max_uv>=11)UVIData.datasets[0].backgroundColor=levelColor[0];
    UVIChart.data=UVIData;
    UVIChart.update();
    numOfDay--;
    if(numOfDay>0)
      {
        date++;
        today.setDate(date);
        var draw=new drawForecast();
        draw.getUVI(today,numOfDay,lat,lon,max_uv);
      };
    if(numOfDay===0){
      ctx4.fillStyle="rgba(255, 204, 204,0.1)";
      ctx4.fillRect(0,72,400,279);
    }
  })
}


drawForecast.prototype.updateForecaChart=function(loc){
  var today=new Date();
  $.get("http://api.openweathermap.org/data/2.5/forecast?q="+loc.name
  +"&appid=d94d33d922a61c31e19c03ef67d9f9f9&mode=JSON&units=metric")
  .then(function(data){
    var weekday={
      0:"Sun",
      1:"Mon",
      2:"Tue",
      3:"Wed",
      4:"Thu",
      5:"Fri",
      6:"Sat"
    }
    var day=0;
    var hour=0;
    var tempData=[];
    var rainData=[];
    var labels=[];
    var windLabels=[];
    var wind_data=[];
    var humidity_data=[];
    var xAxisLabel="";
    var mainWeather=data.list[0].weather[0].main;
    var tempMin=data.list[0].main.temp_min;
    var tempMax=data.list[0].main.temp_max;
    for(var i in data.list){
      hour=today.getHours();
      day=today.getDay();
      xAxisLabel=Math.ceil((hour+1)/3)*3+":00 "+weekday[day];
      labels.push(xAxisLabel);
      tempData.push(data.list[i].main.temp);
      if(data.list[i].hasOwnProperty('rain')){
          if(data.list[i].rain.hasOwnProperty('3h'))
            rainData.push(data.list[i].rain['3h'])
          else rainData.push(0);
      }
      else rainData.push(0);
      if(i<8){
        windLabels.push(xAxisLabel);
        (data.list[i].wind!==null)?wind_data.push(Math.round(data.list[i].wind.speed*10)/10):wind_data.push(0);
        humidity_data.push(data.list[i].main.humidity);
        if(data.list[i].main.temp_min<tempMin) tempMin=data.list[i].main.temp_min;
        if(data.list[i].main.temp_max>tempMax) tempMax=data.list[i].main.temp_max;
      }
      today.setHours(hour+3);
    }
    weatherData=data;
    forecaData.labels=labels;
    forecaData.datasets[0].data=tempData;
    forecaData.datasets[1].data=rainData;
    forecaChart.data=forecaData;
    forecaChart.update();
    windData.labels=windLabels;
    windData.datasets[0].data=wind_data;
    windChart.data=windData;
    windChart.update();
    humidityData.labels=windLabels;
    humidityData.datasets[0].data=humidity_data;
    humidityChart.data=humidityData;
    humidityChart.update();
    $("#img_weather").attr("src","images/"+mainWeather+".png");
    $("#show_loc").html(loc.name);
    $("#temperature").html(tempMin+"&ordmC~"+tempMax+"&ordmC");

  });

  UVIData.labels=[];
  UVIData.datasets[0].data=[];
  var today=new Date();
  this.getUVI(today,7,loc.lat,loc.lon,0);
}
