// waver.cs
//
// makes an object wave up and down on the y axis(!)
// nice little touch for UIs
//

using UnityEngine;
using System.Collections;

public class waver : MonoBehaviour {

	private float theZ;
	
	private float bobbingSpeed = 0.1f;
	private float bobbingAmount = 0.02f;

	private float timer = 0.0f; 
	private float midpoint = 0f;
	private float totalAxes;
	private float waveslice;
	private float translateChange;
	
	private GameObject player;
	
	void Start() {
			theZ=transform.position.y;
			midpoint=theZ;
			player=GameObject.FindWithTag("Player");
	}
	
	void FixedUpdate () {

		transform.position=new Vector3(transform.position.x,theZ,transform.position.z);
		
		waveslice = Mathf.Sin(timer); 
		timer = timer + bobbingSpeed; 
	
		if (timer > Mathf.PI * 2) { 
          timer = timer - (Mathf.PI * 2); 
		}
		
		if (waveslice != 0) { 
		   translateChange = waveslice * bobbingAmount; 
		   translateChange = 1f * translateChange; 
		   transform.localPosition=new Vector3(transform.localPosition.x, midpoint + translateChange, transform.localPosition.z); 
		} 
		else { 
		  transform.localPosition=new Vector3(transform.localPosition.x,midpoint,transform.localPosition.z); 
		} 
	
	}
		
}
