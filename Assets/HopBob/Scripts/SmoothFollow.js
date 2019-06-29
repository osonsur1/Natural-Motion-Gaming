// SmoothFollow.js
//
// A really simple camera script
//

// The target we are following
private var target : Transform;
private var targetPos : Vector3;

// change these values to change how the camera behaves

// first, how far we should move the camera back away from the player along the z axis
private var backDistance = 5;

// now how fast the camera should move
private var camSpeed = 5;

// and finally, any height offset you would like
private var extraHeight = 1;

function setTarget (aTarget : Transform) {
	// this function is called by GameController.js to set the target to our player
	target=aTarget;
}

function LateUpdate () {

	// if we don't have a target, we need to drop out here
	if (!target)
		return;
	
	// this is a simple interpolation, moving the camera lazily to our target position
	targetPos = target.position+(backDistance*Vector3.forward)+(extraHeight*Vector3.up);
	transform.position = Vector3.Slerp(transform.position,targetPos, camSpeed*Time.deltaTime);

}

function setBackDistance(aNum : float){
	backDistance=aNum;	
}

function setHeight(aNum : float){
	extraHeight=aNum;	
}

function setCamSpeed(aNum : float){
	camSpeed=aNum;
}
