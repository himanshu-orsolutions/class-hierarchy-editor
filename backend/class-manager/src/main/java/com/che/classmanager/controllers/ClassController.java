package com.che.classmanager.controllers;

import java.util.List;

import javax.websocket.server.PathParam;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * The ClassController. It holds APIs which operates on the class information.
 */
@CrossOrigin
@RestController(value = "/")
public class ClassController {

	/**
	 * API to add new class
	 * 
	 * @param cid        The class ID
	 * @param name       The class name
	 * @param isAbstract If the class is abstract or not
	 * @param pid        The parent class ID
	 * @return The insertion status
	 */
	@GetMapping(value = "/addclass", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> addNewClass(@RequestParam(value = "cid", required = true) String cid,
			@RequestParam(value = "name", required = true) String name,
			@RequestParam(value = "abstract") String isAbstract, @RequestParam(value = "pid") String pid) {

		return null;
	}

	/**
	 * API to one or more classes
	 * 
	 * @param classes The list of classes
	 * @return The insertion status
	 */
	@PostMapping(value = "/addClassJSON", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> addNewClass(@RequestBody List<com.che.classmanager.models.Class> classes) {

		return null;
	}

	/**
	 * API to get information of a specific class
	 * 
	 * @param cid The class ID
	 * @return The class information
	 */
	@GetMapping(value = "/getclass/{cid}")
	public ResponseEntity<String> getClassInfo(@PathParam(value = "cid") String cid) {

		return null;
	}

	/**
	 * API to delete a specific class and all its sub-classes information
	 * 
	 * @param cid The class ID
	 * @return The deletion status
	 */
	@GetMapping(value = "/deleteclass/{cid}")
	public ResponseEntity<String> deleteClassInfo(@PathParam(value = "cid") String cid) {

		return null;
	}

	/**
	 * API to get information of current class and all its super classes
	 * 
	 * @param cid The class ID
	 * @return The information
	 */
	@GetMapping(value = "/superclasses/{cid}")
	public ResponseEntity<String> getSuperClassesInfo(@PathParam(value = "cid") String cid) {

		return null;
	}

	/**
	 * API to get information of current class and all its sub classes
	 * 
	 * @param cid The class ID
	 * @return The information
	 */
	@GetMapping(value = "/subclasses/{cid}")
	public ResponseEntity<String> getSubClassesInfo(@PathParam(value = "cid") String cid) {

		return null;
	}
}
