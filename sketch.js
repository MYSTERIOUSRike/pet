//In this project, we apply to connect to real time database and create a virtual pet app to feed the dog.

//Creatng the variables 
var dog, happyDog, database, foodS, foodStock;
var dogsprite,dogsprite1;
var database;
var feeddog,addfood;
var fedTime,lastFed;
var foodobj;
var timeHour;

function preload()
{
  //load images here 
  dog= loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {

  createCanvas(950, 720);
  
  //geting the firebase database
  database = firebase.database();

  //Get food value from database
  foodStock=database.ref('Food')
  foodStock.on("value", readStock);

  dogsprite=createSprite(600,360,5,5);
  dogsprite.addImage(dog);

  //Initialzing the food stock
  writeStock(21);
 
  feeddog=createButton("Feed the dog");
  feeddog.position(450,65)
  feeddog.mousePressed(feedDog);

  addfood=createButton("Add Food");
  addfood.position(550,65)
  addfood.mousePressed(addFoods);         
  
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  timeHour = today.getHours();

  foodobj=new Food();
  foodobj.updateFoodStock(foodS);
 
 }

function draw() {  

  background(46, 139, 87);

  fedTime=database.ref('FeedTime')
  fedTime.on("value",function(data){
  lastFed=data.val(); 
  });

  fill(255,255,254);
  textSize(20);
  fill("blue");

  if(lastFed>12){
    text("Last Feed: "+lastFed%12+" PM",150,80)
  }else if(lastFed==12){
    text("Last Feed: 12 PM",150,80)
  }else if(lastFed==0){
    text("Last Feed: 12 AM",150,80)
  }else{
    text("Last Feed: "+lastFed+" AM",150,80)
  }
  
  textSize(20);
  fill("blue");
  text("Food Stock="+foodS,150, 110);  

  foodobj.updateFoodStock(foodS);
  foodobj.display();

  drawSprites();

}


//funtion to read  the food stock from databaae
function readStock(data){
   foodS=data.val();
   
}

//funtion to write  the food stock to database
function writeStock(x){
 
  if (x<=0)
  {
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref('/').update({  
    Food:x
  })
}

function addFoods(){
 
  foodS++;
  database.ref('/').update({
    Food:foodS
  });
  
}


function feedDog(){

  console.log("feedDog "+foodS);

  dogsprite.addImage(happyDog);

  if(foodS>=1){
    foodS=foodS-1
  }
    database.ref('/').update({
    Food:foodS
  });

  database.ref('/').update({  
    FeedTime:timeHour
    });

}
