package com.che.classmanager.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.websocket.server.PathParam;

import org.apache.commons.lang3.StringUtils;
import org.bson.Document;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	 * The set of current class names
	 */
	private Set<String> classNameSet = new HashSet<>();

	/**
	 * The class hierarchy map
	 */
	private Map<String, Node> hierarchyMap = new HashMap<>();

	/**
	 * Removes the class node and all its sub-class nodes from the hierarchy
	 * 
	 * @param node The node
	 */
	private void removeNode(Node node) {

		if (node == null) {
			return;
		}

		// Removing the node from hierarchy map and class name set
		hierarchyMap.remove(node);
		classNameSet.remove(node.getData().getName());
		node.getChilds().forEach(child -> removeNode(child));
	}

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
		if (hierarchyMap.containsKey(cid)) {
			return ResponseGenerator.generateBadRequest("The cid '" + cid + "' already exists.");
		}
		if (classNameSet.contains(name)) {
			return ResponseGenerator.generateBadRequest("The class name '" + name + "' already exists.");
		}
		if (StringUtils.isNotBlank(pid) && !hierarchyMap.containsKey(pid)) {
			return ResponseGenerator.generateBadRequest("The pid '" + pid + "' not found.");
		}

		// Creating the new class instance
		Class obj = new Class();
		obj.setCid(cid);
		obj.setName(name);
		obj.setPid(pid);
		obj.setIsAbstract(StringUtils.isBlank(isAbstract) ? "false" : isAbstract); // Adding default values if not
																					// present

		// Adding the new class name in the set
		classNameSet.add(name);

		// Adding the class into the hierarchy map
		if (StringUtils.isNotBlank(pid)) {
			hierarchyMap.get(pid).getChilds().add(new Node(obj, null));
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

		// Validating the input
		for (Class classObj : classes) {
			if (StringUtils.isAnyBlank(classObj.getCid(), classObj.getName())) {
				return ResponseGenerator.generateBadRequest("The cid/ name cannot be null/empty.");
			}
			if (!classObj.getCid().matches(IClassConstants.CLASSIDREGEX)) {
				return ResponseGenerator.generateBadRequest("Invalid class ID: " + classObj.getCid());
			}
			if (!classObj.getName().matches(IClassConstants.CLASSNAMEREGEX)) {
				return ResponseGenerator.generateBadRequest("Invalid class name: " + classObj.getName());
			}
			if (hierarchyMap.containsKey(classObj.getCid())) {
				return ResponseGenerator.generateBadRequest("The cid '" + classObj.getCid() + "' already exists.");
			}
			if (classNameSet.contains(classObj.getName())) {
				return ResponseGenerator
						.generateBadRequest("The class name '" + classObj.getName() + "' already exists.");
			}
			if (StringUtils.isNotBlank(classObj.getPid()) && !hierarchyMap.containsKey(classObj.getPid())) {
				return ResponseGenerator.generateBadRequest("The pid '" + classObj.getPid() + "' not found.");
			}

			// Adding the default value if not present
			if (StringUtils.isBlank(classObj.getIsAbstract())) {
				classObj.setIsAbstract("false");
			}
		}

		// Adding all classes
		for (Class classObj : classes) {

			// Adding the new class name in the set
			classNameSet.add(classObj.getName());

			// Adding the class into the hierarchy map
			if (StringUtils.isNotBlank(classObj.getPid())) {
				hierarchyMap.get(classObj.getPid()).getChilds().add(new Node(classObj, null));
			}
			hierarchyMap.put(classObj.getCid(), new Node(classObj, new ArrayList<>()));
		}
		return ResponseGenerator.okResponse();

	}

	/**
	 * API to get information of a specific class
	 * 
	 * @param cid The class ID
	 * @return The class information
	 */
	@GetMapping(value = "/getclass/{cid}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getClassInfo(@PathVariable(value = "cid") String cid) {

		if (hierarchyMap.containsKey(cid)) {
			return ResponseGenerator.okResponse(hierarchyMap.get(cid).getData());
		} else {
			return ResponseGenerator.generateBadRequest("The cid " + cid + " does not exist");
		}
	}

	/**
	 * API to delete a specific class and all its sub-classes information
	 * 
	 * @param cid The class ID
	 * @return The deletion status
	 */
	@GetMapping(value = "/deleteclass/{cid}")
	public ResponseEntity<String> deleteClassInfo(@PathParam(value = "cid") String cid) {

		if (!hierarchyMap.containsKey(cid)) {
			return ResponseGenerator.generateBadRequest("The cid " + cid + " does not exist");
		} else {
			removeNode(hierarchyMap.get(cid));
			return ResponseGenerator.okResponse();
		}
	}

	/**
	 * API to get information of all super classes of specified class
	 * 
	 * @param cid The class ID
	 * @return The information
	 */
	@GetMapping(value = "/superclasses/{cid}")
	public ResponseEntity<?> getSuperClassesInfo(@PathParam(value = "cid") String cid) {

		if (!hierarchyMap.containsKey(cid)) {
			return ResponseGenerator.generateBadRequest("The cid " + cid + " does not exist");
		} else {
			Document output = new Document();
			List<Document> list = new ArrayList<>();
			Node currentNode = hierarchyMap.get(cid);

			while (StringUtils.isNotBlank(currentNode.getData().getPid())) { // Iterating over all the parent classes
				String pid = currentNode.getData().getPid();
				currentNode = hierarchyMap.get(pid);
				list.add(new Document("cid", currentNode.getData().getCid()).append("name",
						currentNode.getData().getName()));
			}

			output.put("list", list);
			return ResponseGenerator.okResponse(output.toJson());
		}
	}

	/**
	 * API to get information of a specified class and all its sub classes
	 * 
	 * @param cid The class ID
	 * @return The information
	 */
	@GetMapping(value = "/subclasses/{cid}")
	public ResponseEntity<String> getSubClassesInfo(@PathParam(value = "cid") String cid) {

		if (!hierarchyMap.containsKey(cid)) {
			return ResponseGenerator.generateBadRequest("The cid " + cid + " does not exist");
		} else {
			removeNode(hierarchyMap.get(cid));
			return ResponseGenerator.okResponse();
		}
	}
}
