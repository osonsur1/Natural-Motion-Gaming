using UnityEngine;
using System.Collections;

public class RotateGlobe : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		transform.Rotate (-20*Time.deltaTime,0,0);
	}
}
