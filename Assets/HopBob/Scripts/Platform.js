// Platform.js
//
// Each platform has this script attached to it so that it will respawn when it should, disappear when it should
// and generally do the things that we expect a platform to do in this type of game!
//
// -------------------------------------------------------------------------------

// we need to keep a reference to the player object so that we can keep tabs on the distance
// between this platform and the player (so we can respawn when the platform is far away from it)
private var playerGO : GameObject;

// we keep a reference to the game controller so that we can send it the occasional message, like telling it
// to add score when a platform is destroyed and telling it to spawn an effect when the platform disappears
private var gameControl : GameController;

// the width of the play area (used to keep the platforms within the play area - if you make the game wider, change the game width in gameController.js, as that's where we get its value from)
private var gameWidth : float;

function Start () {

	// set our platform to be on the correct layer
	gameObject.layer=9;
	
	// grab a reference to our game controller script
	gameControl=GameObject.FindObjectOfType(GameController);
	
	// grab the game width from the gameController.js instance
	gameWidth=gameControl.gameWidth;

	
}

function SetPlayer(playerObj : GameObject){
	// store a reference to our player's gameObject
	playerGO=playerObj;
}

function Update () {
	
	// here we check the distance between this platform and the player on the y axis. if it's too much, we
	// move this platform above the player giving the illusion that there are platforms that go on forever
	// above it
	if(playerGO!=null)
		theY=playerGO.transform.position.y;
	
 	if((transform.position.y-theY)<-9){
 		// this platform is out of range, so lets respawn it
 		respawnPlatform();
 	}
 	
}

function respawnPlatform(){
			
	theY=transform.position.y;//playerGO.transform.position.y;
	
	// decide where to move it up above the player now
 	platPos=new Vector3(Random.Range(-gameWidth,gameWidth),Random.Range(theY+12,theY+12.5),0);

 	// move this platform to the new position
 	transform.position=platPos;
 
}

function hitPlatform() {

	gameControl.addScore(1);
	gameControl.doParticles(1,transform.position);
	
	// when the player hits the platform, we move it off screen
	transform.position.x=50;
		
}