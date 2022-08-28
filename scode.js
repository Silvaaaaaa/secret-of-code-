const canvas = document.querySelector("#canvas1")
const ctx  = canvas.getContext('2d');
canvas.width= window.innerWidth ;
canvas.height = window.innerHeight ;
let gradient = ctx.createLinearGradient(0 , 0, canvas.width ,canvas.height);
// let gradient = ctx.createRadialGradient(canvas.width/2  , canvas.height/2, 100 , canvas.width/2 ,canvas.height/2 , 100 );
gradient.addColorStop(0 , 'red') // start of linear griadnat that hava all widow 
gradient.addColorStop(0.2 , 'yellow') // then   
gradient.addColorStop(0.4 , 'green') 
gradient.addColorStop(0.6 , 'cyan')
gradient.addColorStop(0.8 , 'blue')
gradient.addColorStop(1 , 'magenta')


class Symbol{
    constructor(x, y ,fontSize , canvasheight){
       this.character = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

       this.x =x ; 
       this.y =y ;  // convert index random to this value charAt 
       this.fontSize = fontSize;
       this.canvasheight = canvasheight ;
       this.text = '' ;
    }
    draw(context ){
      this.text = this.character.charAt(Math.floor(Math.random() * this.character.length));
      context.fillText(this.text , this.x  * this.fontSize , this.y * this.fontSize);
      if(this.y * this.fontSize > canvas.height && Math.random() >0.98){
          this.y = 0 ;
      }else {
          this.y += 1; 
      }
    }
}
class Effect{
    constructor(canvaswidth , canvasheight){
       this.canvaswidth = canvaswidth; 
       this.canvasheight = canvasheight ; 
       this.fontSize =  25 ; 
       this.columns = this.canvaswidth/ this.fontSize; 
       this.symbols = [];
       this.#initialize();
    }
    #initialize(){
      for(let i = 0; i <this.columns ; i++){
          this.symbols[i] = new Symbol(i , 0 , this.fontSize , this.canvasheight);
      }
    }
    resize(width, height){
      this.canvaswidth = width; 
      this.canvasheight = height;
      this.columns = this.canvaswidth/ this.fontSize; 
      this.symbols = [];
      this.#initialize();
    }
}
const effect  = new Effect(canvas.width , canvas.height );
let lasttime = 0 ;
const fps = 15 ; 
const nextframe = 1000/fps;
let timer = 0 ;

function animate(timestamp ){
    const deltatime = timestamp - lasttime ; 
    lasttime = timestamp;
    if(timer > nextframe){
    ctx.fillStyle = 'rgba(0 , 0 ,0 , 0.05)';
    ctx.fillRect(0 , 0, canvas.width , canvas.height)
    ctx.fillStyle = gradient ; 
     ctx.font = effect.fontSize + 'px monospace' ;
     effect.symbols.forEach(symbol => {
         symbol.draw(ctx);
     })
    }else {
        timer += deltatime ;
    }
     requestAnimationFrame(animate)
}
animate(0)
window.addEventListener("resize" , function(){
    canvas.width= window.innerWidth ;
canvas.height = window.innerHeight ;
effect.resize(canvas.width , canvas.height);
})