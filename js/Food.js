class Food{
    constructor(){
    var foodStock;
    var lastFed;
    this.image=loadImage("images/Milk.png")
   }
   
    getFoodStock(x){
        foodStock=x ; 
        console.log("getFoodStock"+foodStock);
    }

    updateFoodStock(lfoodStock){
        console.log("updateFoodStock"+lfoodStock);
        foodStock=lfoodStock;
    }

   /* deductFood(){
        foodStock=foodStock-1;
    }*/
    
    display(){
        var x =80,y=100;

        imageMode(CENTER);
        //image(this.image,720,220,70,70)

        console.log("in Food foodStock"+foodStock);

        if(foodStock!=0){
            console.log("inside if"+foodStock);
            for(var i=0;i<foodStock;i++){
                console.log("inside if i "+i+ "   "+foodStock);
               if(i%10==0){
                    console.log("inside if i%10 "+i+ "   "+foodStock);
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
              }
        }
    }
}
 