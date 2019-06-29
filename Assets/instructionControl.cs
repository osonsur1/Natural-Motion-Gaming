using UnityEngine;
using System.Collections;

public class instructionControl : MonoBehaviour {
	public GameObject handBone;
	Vector3 handStartPosition;
	public GameObject elbowBone;
	public GameObject shoulderBone;
	public GameObject txt_play;
	//public GameObject txt_options;
	public GameObject txt_help;
	public GameObject txt_quit;
	int loadValue;
	bool init=true;
	Vector3 handBoneStartPosition;
	float currentX;
	float currentY;
	float currentZ;
	GameObject currentObject;
	
	
	// Use this for initialization
	void Start () {
		loadValue = 99;
		//transform.position = new Vector3(-0.1063848f,487309f,0);
		
		handStartPosition = new Vector3(this.transform.position.x,this.transform.position.y,this.transform.position.z);
		handBoneStartPosition = handBone.transform.position;
		
	}
	
	// Update is called once per frame
	
	IEnumerator delayforMenu(GameObject name){
		name.renderer.material.color = Color.yellow;
		name.GetComponent<TextMesh> ().fontSize = 50;
		currentObject = name;
		yield return new WaitForSeconds(1);
	}
	void Update(){
		
		RaycastHit hit;
		if (Physics.Raycast (transform.position, Vector3.forward, out hit)) {
			print ("IS raycasting "+Physics.Raycast (transform.position, Vector3.forward, out hit));
			print (hit.collider.tag);
			if (hit.collider.tag == "menuItemPlay") {
				loadValue=0;
				
				StartCoroutine(delayforMenu(txt_play)); 
				
			} else 	if (hit.collider.tag == "menuItemQuit") {
				loadValue=1;
				StartCoroutine(delayforMenu(txt_quit)); 
				//StartCoroutine(delayforMenu(txt_options));  
			} else 	if (hit.collider.tag == "menuItemOptions") {
				loadValue=2;
				StartCoroutine(delayforMenu(txt_quit));  
			} else if (hit.collider.tag == "menuItemAbout") {
				loadValue=3;
				//	StartCoroutine(delayforMenu(txt_about));  
			}else if(hit.collider.tag == "menuwall"){
				loadValue = 99;
				txt_play.renderer.material.color = Color.white;
				txt_play.GetComponent<TextMesh> ().fontSize = 34;
				
				txt_quit.renderer.material.color = Color.white;
				txt_quit.GetComponent<TextMesh> ().fontSize = 34;
				
				//txt_help.renderer.material.color = Color.white;
				//txt_help.GetComponent<TextMesh> ().fontSize = 34;
				
				//txt_options.renderer.material.color = Color.white;
				//txt_options.GetComponent<TextMesh> ().fontSize = 63;
				
				
			}
		}
		if (elbowBone.transform.position.y < handBone.transform.position.y) {
			if (init) {
				currentX = handBone.transform.position.x;
				currentY = handBone.transform.position.y;
				currentZ = handBone.transform.position.z;
				//print (currentX+" "+transform.position.x);
				init=false;
			}
			print ("CurrentZ "+currentZ);
			
			if (handBone.transform.position.x > elbowBone.transform.position.x+0.1f)
				transform.position = new Vector3 (transform.position.x +0.05f, transform.position.y, transform.position.z);
			//currentX = transform.position.x;
			if (handBone.transform.position.x < elbowBone.transform.position.x-0.1f)
				transform.position = new Vector3 (transform.position.x - 0.05f, transform.position.y, transform.position.z);
			//currentX = transform.position.x;
			if (handBone.transform.position.y > shoulderBone.transform.position.y-0.1f)
				transform.position = new Vector3 (transform.position.x , transform.position.y+0.05f, transform.position.z);
			//currentX = transform.position.x;
			if (handBone.transform.position.y < shoulderBone.transform.position.y+0.1f)
				transform.position = new Vector3 (transform.position.x , transform.position.y- 0.05f, transform.position.z);
			
			if (handBone.transform.position.z > currentZ+0.1f){
				if(loadValue==1){print ("Menu<<<<<<<<<<<<<<<<<<");Application.LoadLevel("main_menu");}
				else if(loadValue==0){print ("Quittung");Application.Quit();}
			}
			
			
			
			//currentX = transform.position.x;
			
			
			
		} else {
			init=true;
		}
		
	}
}
