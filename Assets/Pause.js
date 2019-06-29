#pragma strict
var pause : KeyCode;
var restart : KeyCode;
var handLeft1 : GameObject;
var handLeft2 : GameObject;
var head1 : GameObject;
var head2 : GameObject;
var handRight1 : GameObject;
var handRight2 : GameObject;
var  kinectPlay : boolean;
function Start () {

}
/*
function Update () {
   if(!kinectPlay){
	if(Input.GetKey(KeyCode.Backspace)){
	print("Pause");
	Time.timeScale=0;
	}
	if(Input.GetKey(KeyCode.Return)){
	Time.timeScale=1;
	}
	}else {
	//if(handRight1.transform.position.x+0.3f<handLeft1.transform.position.x||handRight2.transform.position.x+0.3f<handLeft2.transform.position.x){
	//print("Pause");
	//Time.timeScale=0;
	//}
	if(handRight1.transform.position.y>head1.transform.position.y||handRight2.transform.position.y>head2.transform.position.y){
	Time.timeScale=1;
	}
	
	}
}*/