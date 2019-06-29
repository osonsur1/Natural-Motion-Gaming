#pragma strict

function OnMouseEnter(){

renderer.material.color=Color.yellow;
GetComponent(TextMesh).fontSize = 50;

}

function OnMouseDown(){
Application.LoadLevel("main_game");

}

function OnMouseExit(){

renderer.material.color=Color.white;
GetComponent(TextMesh).fontSize = 34;
}
