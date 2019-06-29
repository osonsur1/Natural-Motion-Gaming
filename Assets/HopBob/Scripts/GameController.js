// gameController.js
//
// the gameController is the center of the game - it's where all the other scripts meet and chat
// as well as the main script where scores are made and stored and all of the games main objects
// get created

public var playerPrefab : GameObject;
public var platformPrefab : GameObject;
public var backgroundGFX : GameObject;
public var getReadyMessage : GameObject;
public var goMessage : GameObject;
public var platformParticles : GameObject;
public var gameOverMenu : gameover_GUI;
public var scoreUIobj : GUIText;
public var numberOfPlatforms : int = 4;
public var enableBackgroundScrolling : boolean = true;

// ********************************************************************* IMPORTANT!

// MAKE SURE TO SET THE GAME WIDTH IF YOU CHANGE THE WINDOW SIZE!!!!!
// all other scripts get their cue from this number. if you don't change it here, the platforms won't reach
// the edges and the player won't either!

public var gameWidth : float = 3.12;

// *********************************************************************

private var startPosition : Vector3 = Vector3(0,-3.211473,0);

private var gameScore : int;
private var playerGO : GameObject;
private var theCam : SmoothFollow;

private var platParent : Transform;
private var platPos : Vector3;

private var GOsToClear : ArrayList;

function Start () {
	
	initGame();
	
}

function LateUpdate () {
	
	if(enableBackgroundScrolling){
		// we scroll the texture on the background based on the height of the camera, so that it looks as
		// though we're moving up through the stars
		backgroundGFX.renderer.material.SetTextureOffset ("_MainTex", Vector2 (0.0, theCam.transform.position.y*0.005) );
	}
	
}

function showGoMessage() {
	
	// displays the 'GO!' message at the start of the game
	getReadyMessage.SetActiveRecursively(false);
	goMessage.SetActiveRecursively(true);
	
	// move our camera out from the player
	theCam.setBackDistance(10);
	
}

function startGame() {
	
	// tell our player it can now move
	playerGO.SendMessage("gameStart");
	
	// hide the 'go!' message
	goMessage.SetActiveRecursively(false);
	
}

function initGame() {

	// prepare an arrayList to store references to our platforms in. we do this so that when the
	// game ends we have a list of objects to destroy so that we can restart the game without
	// having to reload the scene
	GOsToClear=new ArrayList();
	
	// Start is called automatically by the engine. Here, we do our init for the game
	createPlayer(startPosition);
	createPlatforms();

	// find our camera script (SmoothFollow.js)
	theCam = GameObject.FindObjectOfType(SmoothFollow);
	
	// tell our camera script to follow our player
	theCam.setTarget(playerGO.transform);
	
	// set our camera distance from the player to be close up at the start of the game
	theCam.setBackDistance(6);
	
	// hide any messages and our game over menu
	getReadyMessage.SetActiveRecursively(true);
	goMessage.SetActiveRecursively(false);
	
	// hide our game over menu
	gameOverMenu.enabled=false;
	
	// schedule calls to swap the GET READY message for a GO message and to start the game in 2.5 secs
	Invoke("showGoMessage",1.5);		
	Invoke("startGame",2.5);
	
	// and zero our score at the start of the game, of course
	gameScore=0;
	
	scoreUIobj.text="SCORE 0";
	
}

function restartGame() {
	
	// clear out the models we no longer need
	for(var i = 0; i<GOsToClear.Count; i++){
		Destroy(GOsToClear[i]);
	}
	// everything to start a game happens in initGame()
	initGame();
	
}


function createPlayer (aStartPos : Vector3) {
	
	// we use instantiate to 'create' an instance of our player prefab at the start position passed in
	// to this function, then we name it 'player'
	playerGO=Instantiate(playerPrefab,aStartPos,Quaternion.identity);
	playerGO.name="Player";
	// add our player gameObject to the arraylist containing objects to be cleared when resetting the game
	GOsToClear.Add(playerGO);
}

function createPlatforms () {
	
	platParent = GameObject.Find("Platforms").transform;
	
	// here we will instantiate a bunch of platforms and place them at random x positions
	for(var i = -1; i<numberOfPlatforms; i++){
		// choose some random positioning for the platform
		platPos=new Vector3(Random.Range(-3,3),Random.Range(i*4,(i*4)+2),0);
		// instantiate the platform
		aPlat = Instantiate(platformPrefab,platPos,Quaternion.identity);
		// name our platform 'Platform' and its ID number
		aPlat.name="Platform"+i;
		// make the platform a child of our 'Platforms' empty GameObject, just to be neat really
		aPlat.transform.parent=platParent;
		// now tell the platform who our player is, so that it can track the distance from itself and the
		// player and respawn above the player once it gets out of range. That way, we create an infinate
		// player field going forever up and up...
		aPlat.SendMessage("SetPlayer",playerGO);
		// add a reference to our arraylist to be cleared out when resetting the game
		GOsToClear.Add(aPlat);
	}
}

function addScore(amount : int) {
	
	// our platform objects call here when the player jumps on them for the first time. the platforms
	// can pass any score amount in and it will be added to the players score
	gameScore+=amount;
	scoreUIobj.text="SCORE "+gameScore.ToString();
	
}

function endGame() {
	
	// store the games final score in a prefs file, so that we can switch scenes and pick it up to
	// display on the 'game over' screen.
	PlayerPrefs.SetInt("finalScore",gameScore);

	// set a variable so that we can easily tell when the game is over
	gameOver=true;

	// tell the player to lock down movement etc., as the game is ending
	playerGO.SendMessage("gameEnd");

	// schedule the game over menu to appear 3 seconds from now	
	Invoke("gotoGameOver",3);
	
}

function gotoGameOver(){
	gameOverMenu.enabled=true;
}

function doParticles(pType : int, aPos : Vector3){
	
	switch(pType){
		case 1:
		Instantiate(platformParticles,aPos,Quaternion.identity);
		break;
	}
	
}