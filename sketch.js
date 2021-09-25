const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var backgroundImg, backgroundImg1;
var hour;
var min;
var date;
var bg;
var day = "sunday";
var temprature, wind, humidity, feels;
var Atmosphere = "good";


function preload() {

    backgroundImg = loadImage("sunrise.png");
    backgroundImg1 = loadImage("sunset.png");

}

function setup() {
    
    var canvas = createCanvas(1200, 700);
    engine = Engine.create();
    world = engine.world;

}

function draw() {

    if (bg)
        background(bg);

    Engine.update(engine);
    getBackgroundImg();
    fill("black");
    textSize(40);
    text("Date : " + date, 50, 200);
    text("Day : " + day, 50, 300);


    if (hour >= 12) {
        text("Time : " + hour % 12 + " : " + min + " PM", 50, 100);
    } else if (hour == 0) {
        text("Time : 12 AM", 100, 100);
    } else {
        text("Time : " + hour % 12 + " : " + min + " AM", 50, 100);
    }
    getweather();
    fill("blue");
    textSize(40);
    text("Tempreature : " + temprature + " C", 700, 100);
    text("Feels Like : " + feels + " C", 700, 150);
    text("Humidity : " + humidity + " %", 700, 200);
    text("Wind Speed : " + wind + " Km/h", 700, 250);
    text("Atmosphere: " + Atmosphere, 700, 300);


}

async function getBackgroundImg() {

    var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");

    var responseJSON = await response.json();

    var Datetime = responseJSON.datetime;

    var dayNo = responseJSON.day_of_week;
    hour = Datetime.slice(11, 13);
    min = Datetime.slice(14, 16);
    date = Datetime.slice(0, 10);

    if (hour >= 0 && hour < 18) {
        bg = backgroundImg;
    }
    else {
        bg = backgroundImg1;
    }


    if (dayNo === 1) {
        day = "MONDAY";
    } else if (dayNo === 2) {
        day = "TUESDAY";
    } else if (dayNo === 3) {
        day = "WEDNESSDAY";
    } else if (dayNo === 4) {
        day = "THRUSDAY";
    } else if (dayNo === 5) {
        day = "FRIDAY";
    } else if (dayNo === 6) {
        day = "SATURDAY";
    } else if (dayNo === 7) {
        day = "SUNDAY";
    }
}
async function getweather() {

    var response = await fetch("http://api.weatherapi.com/v1/current.json?key= fb4dd9f4bb274d3db07145704210307&q=kolkata");

    var responseJSON = await response.json();


    temprature = responseJSON.current.temp_c;
    wind = responseJSON.current.wind_kph;
    humidity = responseJSON.current.humidity;
    feels = responseJSON.current.feelslike_c;
    Atmosphere = responseJSON.current.condition.text;






}



