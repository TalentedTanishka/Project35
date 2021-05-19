
var dog , dogImage , happyDog , database , foodS ,foodStock;
var feedTime , lastFed , foodObj;
var feed , addFood;

function preload()
{
  dogImage = loadImage("images/dogImg1.png");
  happyDog = loadImage("images/dogImg.png");
}

function setup() {
	createCanvas(1000, 700);
  
  database = firebase.database();

 
  dog = createSprite(550 , 250,200,200);
  console.log(dog)
 dog.addImage(dogImage);
  dog.scale = 0.2

  foodObj= new Food();
  foodStock = database.ref('foodStock')
  foodStock.on("value" , readStock);

  feed = createButton("FEED THE DOG");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("ADD FOOD");
  addFood.position(820,95);
  addFood.mousePressed(addFoods)
}


function draw() 
{ 
  background("green")
  fill(255,255,255) 
  textSize(15)
  if(lastFed>=12)
  {
    text("LAST FEED : " + lastFed%12 + "  PM" , 350, 30);
  }else if(lastFed == 0)
  {
    text("LAST FEED : 12AM",350 , 30);
  }else
  {
    text("LAST FEED : " + lastFed + "AM" , 350 , 30);
  }

  feedTime = database.ref('FeedTime')
  feedTime.on("value" , function(data){
    lastFed = data.val();
  });

  //writeStock(foodStock);
  
  foodObj.display();

  
drawSprites()
}
function readStock(data)
{
foodS = data.val();
foodObj.updateFoodStock(foodS)
}

function feedDog()
{
dog.addImage(happyDog);
	
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    foodStock:foodObj.getFoodStock(),
    feedTime: hour()
  })
    
 
}
function addFoods()
{
  foodS++;
  dog.addImage(dogImage);
  database.ref('/').update({
    foodStock:foodS
  })
}



