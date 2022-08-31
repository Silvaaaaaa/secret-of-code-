const canvas = document.querySelector("#canvas1");
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth ;
    canvas.height = window.innerHeight ;

    const buttomElements = document.querySelectorAll('.button');
    let buttommeasurment = []; // array all button in it 
    function measurebuttom(){
        buttommeasurment = [] ;
        buttomElements.forEach(buttom =>{
            buttommeasurment.push(buttom.getBoundingClientRect());
        })
    }
    measurebuttom();
    // create particle
   let particleArray = [];
   class Particle{
       constructor(x , y ,size){
           this.x = x; 
           this.y =y ;
           this.size= size; 
           this.weight = Math.random() * 1.5 + 1.5 ;
           this.directionx = Math.random() * 2; 
    }
       update(){
           this.y += this.weight ;
           this.x += this.directionx;
           if(this.size >= 0.3) this.size -= 0.1 ;
        }
        draw(){
            ctx.fillStyle = 'white' ;
            ctx.fillRect(this.x , this.y , this.size , this.size );
        
        }
   }
   let activebutton = 100 ; 
   buttomElements.forEach(button => button.addEventListener("mouseenter" , function(){
       activebutton = button.dataset.number ; // 0, 1, 2 
   }))
   buttomElements.forEach(button => button.addEventListener("mouseleave" , function(){
    activebutton = 100 ;
}))
function handleparticle(){
    for(let i =0 ; i <particleArray.length ; i++){
    for(let y =0 ; y <particleArray.length ; y++){
        let dx = particleArray[i].x - particleArray[y].x ; 
        let dy = particleArray[i].y - particleArray[y].y ;
        let distance = Math.sqrt(dx * dx + dy * dy );
        ctx.strokeStyle = 'grey';
        if(distance < 80 ){
             ctx.beginPath();
             ctx.moveTo(particleArray[i].x , particleArray[i].y);   
             ctx.lineTo(particleArray[y].x , particleArray[y].y);  
             ctx.stroke(); 
        }
    }
        particleArray[i].update();
        particleArray[i].draw();    
        if(particleArray[i].size <= 1 ){
            particleArray.splice(i, 1);
            i--; 
        }
    }
}   
function createparticle(){
    if(activebutton < 100){
        let size = Math.random() * 40 +10  ; 
      let x = Math.random() * (buttommeasurment[activebutton].width - size *2 ) + buttommeasurment[activebutton].x + size ;
     let y = buttommeasurment[activebutton].y + 40   ; 
        particleArray.push(new Particle(x, y ,size));
    }
}
function animate(){
    ctx.clearRect(0, 0, canvas.width,canvas.height);
    createparticle();
    handleparticle();
    requestAnimationFrame(animate)
}
animate();