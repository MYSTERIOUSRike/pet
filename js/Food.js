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

        foodStock=lfoodStock-1;
    }

   /* deductFood(){
        foodStock=foodStock-1;
    }*/
    
    display(){
        var x =80,y=100;

        imageMode(CENTER);
        image(this.image,720,220,70,70)

        console.log("in Food foodStock"+foodStock);

        foodStock=20;

        if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
                if(1%10==0){
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
              }
        }
    }
}
