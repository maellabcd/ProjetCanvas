const levels = [
	{
	//Niveau 1
       playerStart: { x: 0, y: 0 },
        obstacles: [
            { x: 300, y: 0, w: 20, h: 350, color: "black" }
        ],
        sortie: { x: 550, y: 0, w: 50, h: 70}
    },
	
    {
		//Niveau 2
        playerStart: { x: 0, y: 0 },
        obstacles: [
            { x: 200, y: 100, w: 20, h: 350, color: "black" },
            { x: 400, y: 0, w: 20, h: 350, color: "black" }
        ],
        sortie: { x: 550, y: 380, w: 50, h: 70}
    },

	{
		//Niveau 3 //Remet au debut 
        playerStart: { x: 100, y: 100 },
        obstacles: [
			{ x: 150, y: 100, w: 20, h: 350, color: "black" },
            { x: 275, y: 0, w: 20, h: 350, color: "black" },
			{ x: 400, y: 100, w: 20, h: 350, color: "black" }
        ],
        sortie: { x: 550, y: 0, w: 50, h: 70}
    },

	{
        //Niveau 4 Remet au debut
        playerStart: { x: 0, y: 0 },
        obstacles: [
            { x: 150, y: 100, w: 350, h: 20, color: "black" },
            { x: 400, y: 200, w: 20, h: 350, color: "black" },
			{ x: 150, y: 0, w: 20, h: 350, color: "black" }
        ],
        sortie: { x: 200, y: 15, w: 50, h: 70}
    },
	{
        //Niveau 5 Remet au debut
        playerStart: { x: 0, y: 0 },
        obstacles: [
            { x: 130, y: 100, w: 20, h: 350, color: "black" },
            { x: 400, y: 0, w: 20, h: 350, color: "black" },
			{ x: 275, y: 0, w: 20, h: 200, color: "black" },
            { x: 275, y: 300, w: 20, h: 200, color: "black" },
            { x: 525, y: 350, w: 20, h: 200, color: "black" }
        ],
        sortie: { x: 550, y: 0, w: 50, h: 70}
    }
 
];
export default levels;
