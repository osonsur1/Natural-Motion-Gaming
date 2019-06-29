// Player.js
//
// Takes care of everything to do with controlling the player (including animations) and checks for death
//
//
// -------------------------------------------------------------------------------

// if you want to change how high (or low) the player jumps, change this value
public var jumpPower : float = 35.0;
public var shoulderCenter : GameObject;
// this chunk o variables are just boring variables that the functions use to function
private var theZ : float;
private var jumpEnabled : boolean;
private var canMove : boolean;
private var hit : RaycastHit;
private var mousePos : float;
private var xVel : float=0.0;
private var xPos : float=0.0;
private var yVel : float=0.0;
private var gameEnding : boolean;
private var didGroundHitSound : boolean;

private var jumpSound : GameObject;
private var fallingSound : GameObject;
private var groundHitSound : GameObject;
public var shoulderVector : Vector3;

// we store a reference to the gameController so that we can send it important messages like when the
// player falls too fast (game over) or when the player hits the ground (game over)
private var gameControl : GameController;

// theTransformHit stores a reference to the last transform that the player jumped on so that we can
// destroy it if all the conditions are met to start a jump
private var theTransformHit : Transform;

// we need to make sure we're grounded before starting a new jump
public var grounded : boolean;

// to use an animated character, we parent it to the player object. so that we can still talk to it and
// play animations, the player object needs to know where the animated character is, so we store a reference
// to its gameobject here (accessible through the editor)
//public var animatedCharacter : GameObject;

// change this to change the players movement speed on the x
public var maxMoveSpeed : float = 0.4;

// the width of the play area (used to keep the player within the play area - if you make the game wider, change the value in gameController.js since that's where we get its value from)
private var gameWidth : float;

function Start() {
	// set gravity here
	Physics.gravity = new Vector3(0, -45, 0);
	
	// grab default position data for the z position (to fix it wherever the player starts) and to
	// get a starting point for our xPos variable, which holds the players x position
	xPos=transform.position.x;
	theZ=transform.position.z;

	// we use this to freeze the player at the beginning or end of the game
	jumpEnabled=false;
	
	// we use this to freeze player movement at the end of the game
	canMove=false;
	
	// grab a reference to our game controller script
	gameControl=GameObject.FindObjectOfType(GameController);
	
	// grab the game width from the gameController.js instance
	gameWidth=gameControl.gameWidth;
	
	// grab a reference to a gameObject that has audio attached to it. we use this to make a sound when
	// we bounce off a platform
	jumpSound=GameObject.Find("SOUNDFX_platform_hit");
	fallingSound=GameObject.Find("SOUNDFX_falling_down");
	groundHitSound=GameObject.Find("SOUNDFX_ground_hit");
		
	// set our game ending flag to false
	gameEnding=false;
	didGroundHitSound=false;
	
	// fix our player on the spot when the game first starts (until gameController calls our gameStart function)
	rigidbody.isKinematic=true;
	
}

function FixedUpdate () {
	
	// always assume we're NOT grounded every step (and expect to be proved wrong by raycasting etc.)
	grounded=false;

	// check to see if we're on top of a platform - here we cast two rays, one on each side of the player
	// LEFT:
	if (Physics.Raycast (transform.position- Vector3.up * 0.5 + Vector3.right * 0.5, -Vector3.up, hit, 1, 1<<9)) {
		// we found ground, so set our grounded flag to true, so that the player will jump
		grounded=true;
		if(rigidbody.velocity.y<0){
			theTransformHit=hit.transform;
		}

	}
	// RIGHT:
	if (Physics.Raycast (transform.position- Vector3.up * 0.5 - Vector3.right * 0.5, -Vector3.up, hit, 1, 1<<9)) {
		// we found ground, so set our grounded flag to true, so that the player will jump
		grounded=true;
		if(rigidbody.velocity.y<0){
			theTransformHit=hit.transform;
		}
	}
		
	// do jumping, if we're on top of a platform
	if(jumpEnabled){
		if(grounded && rigidbody.velocity.y<0){
			doJump();
			// send a message to the platform to tell it to destroy itself
			theTransformHit.gameObject.SendMessage("hitPlatform");
		}
	}
	
	// grab the mouse position and take off the width of the screen /2 so that moving the
	// mouse to the left of the window will produce a negative number and moving it to the right of
	// the window will produce a positive number
	//..........................................................................................................................................
	//mousePos = (Screen.width/2)-Input.mousePosition.x;
	mousePos = (Screen.width/2)- ((GameObject.FindGameObjectWithTag ("Player").transform.position.x*10)+25)*146;
	xVel=0;
	//shoulderVector=shoulderCenter.transform.position;
	print( ((GameObject.FindGameObjectWithTag ("Player").transform.position.x*10)+25)*146);
	// now we check the mouse position and move our player accordingly
	if(mousePos>1 || mousePos<-1){
		xVel+=(mousePos*0.02);		
	}
		
	if(canMove){
		
		// add x velocity to our position
		xPos=transform.position.x;
		
		if(xVel>maxMoveSpeed)
			xVel=maxMoveSpeed;
	
		if(xVel<-maxMoveSpeed)
			xVel=-maxMoveSpeed;
			
		if(xPos>gameWidth){
			xPos=gameWidth;
			rigidbody.MovePosition(Vector3(gameWidth,transform.position.y,transform.position.z));
			if(xVel>0){
				xVel=0;
				rigidbody.velocity.x=0;
			}
		}
		
		if(xPos<-gameWidth){
			xPos=-gameWidth;
			rigidbody.MovePosition(Vector3(-gameWidth,transform.position.y,transform.position.z));
			if(xVel<0){
				xVel=0;
				rigidbody.velocity.x=0;
			}
		}
		
		// set our movement velocity
		rigidbody.velocity.x=xVel*5;	

		// lean our player some
		transform.eulerAngles.z=-(mousePos*0.2);
	
	}
	
	// if we're falling too fast, we're falling from high up and it must be game over, so we tell
	// gameController to endGame()
	if(rigidbody.velocity.y<-20 && !gameEnding){
		
		// comment this line out if you don't want the player to go upside down when he falls
		transform.eulerAngles.z=180;
		// play falling sound
		fallingSound.audio.Play();
		// tell gameController.js to end the game
		gameControl.endGame();
		gameEnding=true;
	}

	if(gameEnding){
		// as we fall from the sky, we move the player back toward the center of the play area. we do this
		// simply so that we know where he is going to land and theres no chance of him landing on an
		// awkward bit of scenery!
		if(transform.position.x>0)
			rigidbody.velocity.x=-5;
		if(transform.position.x<0)
			rigidbody.velocity.x=5;
	}
	
	// if we fall below the ground at the bottom (which may happen when the physics body is falling super
	// fast), we correct it and hold the player in place.
	if(transform.position.y<-4.5){
		transform.position.y=-4.5;
		rigidbody.velocity.y=0;
		rigidbody.velocity.x=0;
		
		if(!didGroundHitSound){
			groundHitSound.audio.Play();
			didGroundHitSound=true;
		}
			
		// comment this out if you don't want the player to end up upside down when it gets stuck in
		// the ground at the end of the game
		transform.eulerAngles.z=180;
		
	}
	
	transform.position.z=theZ;
		
}

function doJump(){
	// force velocity change to our 'jumpPower' value
	rigidbody.velocity.y=jumpPower;
	// play character animations
//	animatedCharacter.animation.Rewind("jump");
//	animatedCharacter.animation.Play("jump");
	// disable jumping temporarily (to allow the character to move away from the platform)
	jumpEnabled=false;
	// schedule jumping to be re-enabled in 0.2 seconds, once we're clear of the platform
	Invoke("enableJump",0.2);
	// play a sound
	jumpSound.audio.Play();
}

function enableJump(){
	jumpEnabled=true;
}

public function gameStart(){
	// until gameStart is called, the player is frozen in place. once this function is called, we release
	// any holds we have over it
	jumpEnabled=true;
	canMove=true;
	rigidbody.isKinematic=false;
	// start the game ... with a jump!
	doJump();
}

public function gameEnd(){
	// it's game over, so we stop any jumping from happening and lock out the movement controls with canMove=false
	jumpEnabled=false;
	canMove=false;
}
