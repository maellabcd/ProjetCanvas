
import Player from "./Player.js";


function afficheMessageFin(ctx, canvas) {
    //Affiche le message de fiin
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.font = "30px serif";
    ctx.textAlign = "center";
    ctx.fillText("Bravo, vous avez terminé !", canvas.width / 2, canvas.height/2);
	
    //Dzessin le player sur le msg de fin
	const player=new Player(canvas.width/2,canvas.height*2/3);
	player.draw(ctx);

		
}

export default afficheMessageFin;
