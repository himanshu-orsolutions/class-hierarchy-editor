package com.che.classmanager.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.websocket.server.PathParam;

import org.apache.commons.lang3.StringUtils;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.che.classmanager.constants.IClassConstants;
import com.che.classmanager.models.Class;
import com.che.classmanager.models.Node;
import com.che.classmanager.utils.ResponseGenerator;

/**
 * The ClassController. It holds APIs which operates on the class information.
 */
@CrossOrigin
@RestController(value = "/")
public class ClassController {

	/**
	 * The set of current class IDs
	 */
	private Set<String> classIDSet = new HashSet<>();

	/**
	 * The set of current class names
	 */
	private Set<String> classNameSet = new HashSet<>();

	/**
	 * The class hierarchy map
	 */
	private Map<String, Node> hierarchyMap = new HashMap<>();

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

		// Validating the input
		if (!cid.matches(IClassConstants.CLASSIDREGEX)) {
			return ResponseGenerator.generateBadRequest("Invalid class ID.");
		}
		if (!name.matches(IClassConstants.CLASSNAMEREGEX)) {
			return ResponseGenerator.generateBadRequest("Invalid class name.");
		}
		if (classIDSet.contains(cid) || classNameSet.contains(name)) {
			return ResponseGenerator.generateBadRequest("The class name/ID already present.");
		}
		if (StringUtils.isNotBlank(pid) && !classIDSet.contains(pid)) {
			return ResponseGenerator.generateBadRequest("The class not found with the PID.");
		}

		// Creating the new class instance
		Class obj = new Class();
		obj.setCid(cid);
		obj.setName(name);
		obj.setPid(pid);
		obj.setIsAbstract(StringUtils.isBlank(isAbstract) ? "false" : isAbstract); // Adding default values if not
																					// present

		// Adding the new CID in the set
		classIDSet.add(cid);

		// Adding the new class name in the set
		classNameSet.add(name);

		// Adding the class into the hierarchy map
		if (StringUtils.isNotBlank(pid)) {
			hierarchyMap.get(pid).getChilds().add(obj);
		}
		hierarchyMap.put(cid, new Node(obj, new ArrayList<>()));

		return ResponseGenerator.okResponse();
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
