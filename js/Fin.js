
import Player from "./Player.js";


function afficheMessageFin(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.font = "30px serif";
    ctx.textAlign = "center";
    ctx.fillText("Bravo, vous avez terminé !", canvas.width / 2, canvas.height/2);
	
	const player=new Player(canvas.width/2,canvas.height*2/3);
	player.draw(ctx);

		
}

export default afficheMessageFin;
