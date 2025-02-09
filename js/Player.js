import ObjectGraphique from "./ObjectGraphique.js";
import { drawCircleImmediat } from "./utils.js";   

export default class Player extends ObjectGraphique {
    constructor(x, y) {
        super(x, y, 70, 50);
        this.x= x;
        this.y = y - this.h * 0.15;
        this.w = 70;
        this.h = 50;
        this.vitesseX = 0;
        this.vitesseY = 0;
        this.couleur = "pink";
        this.angle = 0;
    }

    draw(ctx) {
        // Ici on dessine un monstre
        ctx.save();

        // on déplace le systeme de coordonnées pour placer
        // le monstre en x, y.Tous les ordres de dessin
        // dans cette fonction seront par rapport à ce repère
        // translaté
        ctx.translate(this.x, this.y);
        //ctx.rotate(this.angle);
        // on recentre le monstre. Par défaut le centre de rotation est dans le coin en haut à gauche
        // du rectangle, on décale de la demi largeur et de la demi hauteur pour 
        // que le centre de rotation soit au centre du rectangle.
        // Les coordonnées x, y du monstre sont donc au centre du rectangle....
        ctx.translate(-this.w / 2, -this.h / 2 +this.w/8);
        // Je sais que c'est pas très propre mais jai fais a taton parce que quadratic curve ca fait une longueur en plus et jarrive pas a la calculer excactement 

        // Dessiner le corps du fantôme
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.w / 2, this.h / 2, this.w / 2, Math.PI, 0, false); // Arc de cercle pour le haut du fantôme
        ctx.lineTo(this.w, this.h);
        ctx.quadraticCurveTo(this.w * 0.75, this.h * 0.60, this.w * 0.5, this.h);
        ctx.quadraticCurveTo(this.w * 0.25, this.h * 0.60, 0, this.h);
        ctx.closePath();
        ctx.fill();

        // Dessiner les yeux du fantôme
        drawCircleImmediat(ctx, this.w * 0.33, this.h * 0.3, 5, "black");
        drawCircleImmediat(ctx, this.w * 0.68, this.h * 0.3, 5, "black");

        // Dessiner la bouche du fantôme
        ctx.beginPath();
        ctx.arc(this.w * 0.5, this.h * 0.65, 6, 0, Math.PI, false);
        ctx.strokeStyle = "black";
        ctx.stroke()

        // restore
        ctx.restore();

        //super.draw(); //dessine une croix à la position x, y
        // pour debug
        super.draw(ctx);
    }

    move() {
        this.x += this.vitesseX;
        this.y += this.vitesseY;
    }
}
