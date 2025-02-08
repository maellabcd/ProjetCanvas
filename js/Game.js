import Player from "./Player.js";
import Obstacle from "./Obstacle.js";
import { rectsOverlap } from "./collisions.js";
import { circRectsOverlap } from "./collisions.js";
import { initListeners } from "./ecouteurs.js";
import Sortie from "./Sortie.js";
import levels from "./Levels.js";
import afficheMessageFin from "./Fin.js";

export default class Game {
    objetsGraphiques = [];

    constructor(canvas) {
        this.canvas = canvas;
        // etat du clavier
        this.inputStates = {
            mouseX: 0,
            mouseY: 0,
        };
    }

    async init(canvas) {
        this.ctx = this.canvas.getContext("2d");
        this.currentLevel = 0;
        this.initLevel(this.currentLevel);

        // On initialise les écouteurs de touches, souris, etc.
        initListeners(this.inputStates, this.canvas);

        console.log("Game initialisé");
    }


    start() {
        console.log("Game démarré");

        // On démarre une animation à 60 images par seconde
        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    initLevel(levelIndex) {
        const level = levels[levelIndex];
        this.objetsGraphiques = [];
    
        // Initialiser le joueur
        this.player = new Player(level.playerStart.x, level.playerStart.y);
        this.objetsGraphiques.push(this.player);
    
        // Ajouter les obstacles
        level.obstacles.forEach(obstacle => {
            this.objetsGraphiques.push(new Obstacle(obstacle.x, obstacle.y, obstacle.w, obstacle.h, obstacle.color));
        });
    
        // Ajouter la sortie
        const sortie = level.sortie;
        this.objetsGraphiques.push(new Sortie(sortie.x, sortie.y, sortie.w, sortie.h, sortie.color));

        //Changer le numero du niveau 
        this.updateLevelTitle(); 
    }

    updateLevelTitle() {
        const levelTitle = document.getElementById('levelTitle');
        levelTitle.textContent = `Niveau ${this.currentLevel+1}`;
    }

    mainAnimationLoop() {
        // 1 - on efface le canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 2 - on dessine les objets à animer dans le jeu
        // ici on dessine le monstre
        this.drawAllObjects();

        // 3 - On regarde l'état du clavier, manette, souris et on met à jour
        // l'état des objets du jeu en conséquence
        this.update();

        // 4 - on demande au navigateur d'appeler la fonction mainAnimationLoop
        // à nouveau dans 1/60 de seconde
        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }


    drawAllObjects() {
        // Dessine tous les objets du jeu
        this.objetsGraphiques.forEach(obj => {
            obj.draw(this.ctx);
        });
    }

    update() {
        // Appelée par mainAnimationLoop
        // donc tous les 1/60 de seconde
        
        // Déplacement du joueur. 
        this.movePlayer();

        // on met à jouer la position de objetSouris avec la position de la souris
        // Pour un objet qui "suit" la souris mais avec un temps de retard, voir l'exemple
        // du projet "charQuiTire" dans le dossier COURS

        // On regarde si le joueur a atteint la sortie
        this.testSortie();

    }

    movePlayer() {
        this.player.vitesseX = 0;
        this.player.vitesseY = 0;
        
        if(this.inputStates.ArrowRight) {
            this.player.vitesseX = 6;
        } 
        if(this.inputStates.ArrowLeft) {
            this.player.vitesseX = -6;
        } 

        if(this.inputStates.ArrowUp) {
            this.player.vitesseY = -6;
        } 

        if(this.inputStates.ArrowDown) {
            this.player.vitesseY = 6;
        } 

        this.player.move();

        this.testCollisionsPlayer();
    }

    testCollisionsPlayer() {
        // Teste collision avec les bords du canvas
        this.testCollisionPlayerBordsEcran();

        // Teste collision avec les obstacles
        if(this.currentLevel>=2){
            this.testCollisionPlayerObstacles(false);
        }
        
        this.testCollisionPlayerObstacles(true);
        

        //Test si le joueur a atteint la sortie
        this.testSortie();
       
    }

    testCollisionPlayerBordsEcran() {
        // Raoppel : le x, y du joueur est en son centre, pas dans le coin en haut à gauche!
        if(this.player.x - this.player.w/2 < 0) {
            // On stoppe le joueur
            this.player.vitesseX = 0;
            // on le remet au point de contact
            this.player.x = this.player.w/2;
        }

        //Changer ça  
        if(this.player.x + this.player.w/2 > this.canvas.width) {
            this.player.vitesseX = 0;
            // on le remet au point de contact
            this.player.x = this.canvas.width - this.player.w/2;
        }

        if(this.player.y - this.player.h/2 < 0) {
            this.player.y = this.player.h/2;
            this.player.vitesseY = 0;

        }
       
        if(this.player.y+this.player.h/2+this.player.w/8> this.canvas.height) {
            this.player.vitesseY = 0;
            this.player.y = this.canvas.height-this.player.h+this.player.w/8;
        }
    }

    testCollisionPlayerObstacles(bool) {
        this.objetsGraphiques.forEach(obj => {
            if(obj instanceof Obstacle) {
                if(rectsOverlap(this.player.x-this.player.w/2, this.player.y - this.player.h/2, this.player.w, this.player.h, obj.x, obj.y, obj.w, obj.h)) {
                    // Déterminer la direction de la collision
                    const playerLeft = this.player.x - this.player.w / 2;
                    const playerRight = this.player.x + this.player.w / 2;
                    const playerTop = this.player.y - this.player.h / 2;
                    const playerBottom = this.player.y + this.player.h / 2+this.player.w/8;


                    const objLeft = obj.x;
                    const objRight = obj.x + obj.w;
                    const objTop = obj.y;
                    const objBottom = obj.y + obj.h;

                    const overlapLeft = playerRight - objLeft;
                    const overlapRight = objRight - playerLeft;
                    const overlapTop = playerBottom - objTop;
                    const overlapBottom = objBottom - playerTop;

                    const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

                if(bool==true){
                    if (minOverlap === overlapLeft) {
                        this.player.x = objLeft - this.player.w / 2;
                        
                    } else if (minOverlap === overlapRight) {
                        this.player.x = objRight + this.player.w / 2;
                    } else if (minOverlap === overlapTop) {
                        console.log("colission avec le bas");
                        this.player.y = objTop - this.player.h / 2-this.player.w/8;
                    } else if (minOverlap === overlapBottom) {
                        this.player.y = objBottom + this.player.h / 2;
                    }
                }
                    else{
                        if (minOverlap === overlapLeft) {
                            this.player.x = 0;
                            this.player.y = 0;
                            
                        } else if (minOverlap === overlapRight) {
                            this.player.x=0;
                            this.player.y=0;
                        } else if (minOverlap === overlapTop) {
                            this.player.x=0;
                            this.player.y=0;
                        } else if (minOverlap === overlapBottom) {
                            this.player.x=0;
                            this.player.y=0;
                        }
                    }

                    // Arrêter le joueur
                    this.player.vitesseX = 0;
                    this.player.vitesseY = 0;
                    

                    }
                }
        });
    }

    testSortie() {
        this.objetsGraphiques.forEach(obj => {
            if(obj instanceof Sortie) {
                if(rectsOverlap(this.player.x-this.player.w/2, this.player.y - this.player.h/2, this.player.w, this.player.h, obj.x+30, obj.y-50, obj.w, obj.h)) {
                        console.log("Sortie atteinte");
                        this.currentLevel++;
                    if (this.currentLevel < levels.length) {
                        console.log("Niveau suivant");
                        this.initLevel(this.currentLevel);
                    } else {
                        console.log("Fin du jeu");
                        afficheMessageFin(this.ctx, this.canvas);
                    }
                }
            }

        });
    }

}
