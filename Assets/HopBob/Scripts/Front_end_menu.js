@script ExecuteInEditMode()

public var gSkin:GUISkin;
public var iSkin:GUISkin;
public var kSkin:GUISkin;

private var isLoading = false;

private var showInstructions : boolean;

function Start () {
	showInstructions=false;
}

function OnGUI () { 

	GUI.matrix = Matrix4x4.TRS (Vector3.zero, Quaternion.identity, Vector3(Screen.width / 640.0, Screen.height / 480.0, 1));
	
	if (gSkin)
 		GUI.skin = gSkin; 
   		
	if(!showInstructions){
		
	
		if(!isLoading){
	 
	   		   if (UnityEngine.GUI.Button (Rect (220,260,220,60), "START GAME")) { 
	   		      Application.LoadLevel("main_game");
	   		      isLoading=true;
	   	   	   } 
	   	   
	   	   	   if (UnityEngine.GUI.Button (Rect (220,330,220,60), "INSTRUCTIONS")) { 
					showInstructions=true;
	   	   	   }
	   	   	    if (UnityEngine.GUI.Button (Rect (220,400,220,60), "QUIT")) { 
					Application.Quit();
	   	   	   }
	   	   	   
	   	} else {
	   		
	   		var loadingStatus = Application.GetStreamProgressForLevel("main_game");
	   		GUI.Label(Rect (250,350,200,60), "LOADING "+Mathf.Round(loadingStatus * 100)+"%");
	   		
	   	}

   	} else {
   	
   		if (iSkin)
 			GUI.skin = iSkin;
 		
   		// here we show our instructions text instead of the menu	
		GUI.Label(Rect (80,185,500,360), "Bob has found magic trampoline and he wants to visit the skies by jumping on them. \n\nHelp him by using the mouse to move left and right as you bounce from trampoline to trampoline.\n\nTry not to fall or it's back to the jungle !");
		
		if (UnityEngine.GUI.Button (Rect (220,380,220,60), "BACK")) { 
					showInstructions=false;
	   	}
		
   	}   	
}