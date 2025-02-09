import ObjectGraphique from "./ObjectGraphique.js";

export default class Sortie extends ObjectGraphique {
	constructor(x, y, w, h, couleur) {
		super(x, y, w, h, couleur);
	}


    //draw(ctx) {
    //    ctx.save();
        
    //    // Dessiner la porte (rectangle marron)
    //    ctx.fillStyle = "brown";
    //    ctx.fillRect(this.x, this.y, this.w, this.h);
        
    //    // Dessiner la poignée (cercle noir)
    //    const handleRadius = this.w / 11;
    //    const handleX = this.x + this.w - handleRadius * 2;
    //    const handleY = this.y + this.h / 2;
        
    //    ctx.beginPath();
    //    ctx.arc(handleX, handleY, handleRadius, 0, Math.PI * 2, true);
    //    ctx.fillStyle = "black";
    //    ctx.fill();
        
    //    ctx.fillStyle = "darkorange";
        
    //    // Carré en haut de la poignée
    //    ctx.fillRect(555, 5, 40, 20);
        
    //    // Carré en bas de la poignée
	//	ctx.fillRect(555, 45, 40, 20);
	//}

    draw(ctx) {
        ctx.save();
        
        // Dessiner la porte (rectangle marron)
        ctx.fillStyle = "brown";
        ctx.fillRect(this.x, this.y, this.w, this.h);
        
        // Dessiner la poignée (cercle noir)
        const handleRadius = this.w / 11;
        const handleX = this.x + this.w - handleRadius * 2;
        const handleY = this.y + this.h / 2;
        
        ctx.beginPath();
        ctx.arc(handleX, handleY, handleRadius, 0, Math.PI * 2, true);
        ctx.fillStyle = "black";
        ctx.fill();
        
        ctx.fillStyle = "darkorange";
        
        // Rectangke du haut
        ctx.fillRect(this.x + this.w - 45, this.y + 5, 40, 20);
        
        // Rectangle du bas
        ctx.fillRect(this.x + this.w - 45, this.y + this.h - 25, 40, 20);
        
        ctx.restore();
    }
}
