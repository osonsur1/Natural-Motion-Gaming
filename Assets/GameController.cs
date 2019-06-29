using UnityEngine;
using System.Collections;

public class GameController : MonoBehaviour {
	public bool p1;
	public bool p2;

	// Use this for initialization
	void Start () {
	    
	}
	
	// Update is called once per frame
	void Update () {
		if (p1) {
			Application.Quit();	
		}
	}
}
