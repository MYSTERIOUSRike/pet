//In this project, we apply to connect to real time database and create a virtual pet app to feed the dog.

//Creatng the variables 
var dog, happyDog, database, foodS, foodStock;
var dogsprite,dogsprite1;
var database;
var feeddog,addfood;
var fedTime,lastFed;
var foodobj;

function preload()
{
  //load images here 
  dog= loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(1500, 1200);
  
  //geting the firebase database
  database = firebase.database();

  //refering food
  foodStock=database.ref('Food')
  foodStock.on("value", readStock);

  dogsprite=createSprite(350,600,10,10);
  dogsprite.addImage(dog);
  //writing the food stock
  writeStock(21);
  console.log("foodS in setup "+foodS);
 
  foodobj=new Food();

  feeddog=createButton("Feed the dog");
  feeddog.position(700,95)
  feeddog.mousePressed(feedDog);

  addfood=createButton("Add Food");
  addfood.position(800,95)
  addfood.mousePressed(addFoods);                                         
  
 }

function draw() {  

  background(46, 139, 87);

  fedTime=database.ref('FeedTime')
  fedTime.on("value",function(data){
  lastFed=data.val(); 
  });

  console.log("lastFed DB"+lastFed);

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed: "+lastFed%12+" PM",350,30)
  }else if(lastFed==0){
    text("Last Feed: ",350,30)
  }else{
    text("Last Feed: "+lastFed+" AM",350,30)
  }
  
  drawSprites();

  textSize(50);
  fill("blue");
  stroke("red");
  text("FoodStock="+foodS, 150, 200);  

  foodobj.display();

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

  /*foodobj.updateFoodStock(foodobj.getFoodStock()-1);

  database.ref('/').update({  
    Food:foodobj.getFoodStock(), 
    FeedTime:Hour()
    });*/

  foodobj.updateFoodStock(foodS-1);

  database.ref('/').update({  
    Food:foodobj.getFoodStock(), 
    FeedTime:Hour()
    });

}
