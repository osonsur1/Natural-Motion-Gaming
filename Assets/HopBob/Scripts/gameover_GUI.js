// gameover_GUI.js
//
// displays final scores at the end of the game and provides a simple button to
// restart the game. also deals with updating the high score.
//

public var gSkin:GUISkin;
private var aScore : int;
private var highScore : int;
private var gotHighScore : boolean;

// we store a reference to the gameController so that we can send it important messages
private var gameControl : GameController;

function OnEnable () {
	// this function is called by the engine whenever the script is 'enabled'. this script is disabled throughout
	// gameplay, then we use .enabled to bring it to life when the game ends. setting .enabled to true will
	// caused the script to start running and call this 'OnEnable' function which will take care of initialising
	
	// grab the final game score from playerPrefs
	aScore=PlayerPrefs.GetInt("finalScore"); 
	// grab the highest score (local) from playerPrefs
	highScore=PlayerPrefs.GetInt("highScore"); 
	
	// compare this final score to our stored highest score
	if(aScore>highScore){
		// this is a high score, so we need to set our highScore variable to display during OnGUI below
		// and we need to set the playerPrefs "highScore" value to hold the new highscore.
		highScore=aScore;
		PlayerPrefs.SetInt("highScore",aScore); 
	}
}

function OnGUI () { 
	
	if(null==gameControl){
		// grab a reference to our game controller script
		gameControl=GameObject.FindObjectOfType(GameController);
	}
	
	if (gSkin) 
 		GUI.skin = gSkin; 
 	
	GUI.matrix = Matrix4x4.TRS (Vector3.zero, Quaternion.identity, Vector3(Screen.width / 640.0, Screen.height / 480.0, 1));
	
	if (UnityEngine.GUI.Button (Rect (400,290,200,40), "PLAY AGAIN")) { 
		//Application.LoadLevel("main_game");
		gameControl.restartGame();
	}    	   	 
 	
	GUI.Label(Rect (50,170,200,40), "GAME OVER");
	GUI.Label(Rect (50,250,220,550), "TOTAL SCORE: "+aScore);
	GUI.Label(Rect (50,290,220,550), "BEST SCORE : "+highScore);
   	
}