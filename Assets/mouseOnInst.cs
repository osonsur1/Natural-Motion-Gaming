using UnityEngine;
using System.Collections;

public class mouseOnInst : MonoBehaviour {
	
	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		
	}
	
	void OnMouseEnter(){
		
		renderer.material.color=Color.yellow;
		GetComponent<TextMesh>().fontSize = 50;
		
	}
	void OnMouseDown(){
		Application.LoadLevel("instructions");
		
	}
	void OnMouseExit(){
		
		renderer.material.color=Color.white;
		GetComponent<TextMesh>().fontSize = 34;
	}
}
