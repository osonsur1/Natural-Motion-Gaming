using UnityEngine;
using System.Collections;


public class PauseUnPause : MonoBehaviour {
	public GameObject handRight;
	public GameObject handLeft;
	public GameObject head;
	public GameObject ShoulderCenter;
	public bool pause=false;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		if(handRight.transform.position.y>head.transform.position.y){
			Time.timeScale = 0;
		}else if(handLeft.transform.position.y>head.transform.position.y){
			Time.timeScale=1;
		} 
	
}
}