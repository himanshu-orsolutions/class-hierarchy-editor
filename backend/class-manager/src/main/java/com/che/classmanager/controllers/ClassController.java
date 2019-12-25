package com.che.classmanager.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.che.classmanager.constants.IClassConstants;
import com.che.classmanager.models.CHEClass;
import com.che.classmanager.models.Container;
import com.che.classmanager.models.Node;
import com.che.classmanager.repositories.CHERepository;
import com.che.classmanager.utils.ResponseGenerator;

/**
 * The ClassController. It holds APIs which operates on the class information.
 */
@CrossOrigin
@RestController(value = "/")
public class ClassController {

	/**
	 * The class hierarchy repository
	 */
	@Autowired
	CHERepository cheRepository;

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
		hierarchyMap.remove(node.getData().getCid());
		classNameSet.remove(node.getData().getName());

		// Removing the node from its parent's list
		String pid = node.getData().getPid();
		if (StringUtils.isNotBlank(pid) && hierarchyMap.containsKey(pid) && hierarchyMap.get(pid).getChilds() != null) {
			hierarchyMap.get(pid).getChilds().remove(node);
		}

		if (node.getChilds() != null) {
			node.getChilds().forEach(child -> removeNode(child));
		}
	}

	/**
	 * Recursively iterates over the nodes and gets the sub-classes information
	 * 
	 * @param node   The current node
	 * @param output The output
	 */
	private void recursiveRetrieval(Node node, Document output) {

		output.put("cid", node.getData().getCid());
		output.put("name", node.getData().getName());
		List<Document> childClassesInfo = new ArrayList<>();
		HashSet<Node> childNodes = node.getChilds();

		if (childNodes == null) {
			return;
		}
		for (Node childNode : childNodes) {
			Document childClassInfo = new Document();
			recursiveRetrieval(hierarchyMap.get(childNode.getData().getCid()), childClassInfo);
			childClassesInfo.add(childClassInfo);
		}

		if (!childClassesInfo.isEmpty()) {
			output.put("superclassOf", childClassesInfo);
		}
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
			@RequestParam(value = "abstract", required = false) String isAbstract,
			@RequestParam(value = "pid", required = false) String pid) {

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
		CHEClass cheClass = new CHEClass();
		cheClass.setCid(cid);
		cheClass.setName(name);
		cheClass.setPid(pid);
		cheClass.setIsAbstract(StringUtils.isBlank(isAbstract) ? "false" : isAbstract); // Adding default values if not
		// present

		// Adding the new class name in the set
		classNameSet.add(name);

		// Adding the class into the hierarchy map
		if (StringUtils.isNotBlank(pid)) {
			hierarchyMap.get(pid).getChilds().add(new Node(cheClass, null));
		}
		hierarchyMap.put(cid, new Node(cheClass, new HashSet<>()));

		return ResponseGenerator.okResponse();
	}

	/**
	 * API to one or more classes
	 * 
	 * @param classes The list of classes
	 * @return The insertion status
	 */
	@PostMapping(value = "/addClassJSON", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> addNewClass(@RequestBody Container container) {

		// Validating the input
		for (CHEClass cheClass : container.getClasses()) {
			if (StringUtils.isAnyBlank(cheClass.getCid(), cheClass.getName())) {
				return ResponseGenerator.generateBadRequest("The cid/ name cannot be null/empty.");
			}
			if (!cheClass.getCid().matches(IClassConstants.CLASSIDREGEX)) {
				return ResponseGenerator.generateBadRequest("Invalid class ID: " + cheClass.getCid());
			}
			if (!cheClass.getName().matches(IClassConstants.CLASSNAMEREGEX)) {
				return ResponseGenerator.generateBadRequest("Invalid class name: " + cheClass.getName());
			}
			if (hierarchyMap.containsKey(cheClass.getCid())) {
				return ResponseGenerator.generateBadRequest("The cid '" + cheClass.getCid() + "' already exists.");
			}
			if (classNameSet.contains(cheClass.getName())) {
				return ResponseGenerator
						.generateBadRequest("The class name '" + cheClass.getName() + "' already exists.");
			}
			if (StringUtils.isNotBlank(cheClass.getPid()) && !hierarchyMap.containsKey(cheClass.getPid())) {
				return ResponseGenerator.generateBadRequest("The pid '" + cheClass.getPid() + "' not found.");
			}

			// Adding the default value if not present
			if (StringUtils.isBlank(cheClass.getIsAbstract())) {
				cheClass.setIsAbstract("false");
			}
		}

		// Adding all classes
		for (CHEClass cheClass : container.getClasses()) {

			// Adding the new class name in the set
			classNameSet.add(cheClass.getName());

			// Adding the class into the hierarchy map
			if (StringUtils.isNotBlank(cheClass.getPid())) {
				hierarchyMap.get(cheClass.getPid()).getChilds().add(new Node(cheClass, null));
			}
			hierarchyMap.put(cheClass.getCid(), new Node(cheClass, new HashSet<>()));
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
	@GetMapping(value = "/deleteclass/{cid}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> deleteClassInfo(@PathVariable(value = "cid") String cid) {

		if (!hierarchyMap.containsKey(cid)) {
			return ResponseGenerator.generateBadRequest("The cid " + cid + " does not exist");
		} else {
			removeNode(hierarchyMap.get(cid));
			return ResponseGenerator.okResponse();
		}
	}

	/**
	 * API to edit a specific class
	 * 
	 * @param cid The class ID
	 * @return The updation status
	 */
	@PutMapping(value = "/editclass/{cid}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> editClasInfo(@PathVariable(value = "cid") String cid,
			@RequestBody CHEClass cheClass) {

		// Validating the input
		if (!hierarchyMap.containsKey(cid)) {
			return ResponseGenerator.generateBadRequest("The cid " + cid + " does not exist");
		}
		if (StringUtils.isBlank(cheClass.getName())) {
			return ResponseGenerator.generateBadRequest("The class name cannot be null/empty.");
		}
		if (!cheClass.getName().matches(IClassConstants.CLASSNAMEREGEX)) {
			return ResponseGenerator.generateBadRequest("Invalid class name.");
		}
		if (classNameSet.contains(cheClass.getName())) {
			return ResponseGenerator.generateBadRequest("The class name '" + cheClass.getName() + "' already exists.");
		}

		// Updating the class name at all places
		CHEClass data = hierarchyMap.get(cid).getData();
		classNameSet.remove(data.getName());
		classNameSet.add(cheClass.getName());

		if (StringUtils.isNotBlank(data.getPid())) {
			hierarchyMap.get(data.getPid()).getChilds().remove(new Node(data, null));
		}
		data.setName(cheClass.getName());
		if (StringUtils.isNotBlank(data.getPid())) {
			hierarchyMap.get(data.getPid()).getChilds().add(new Node(data, null));
		}

		return ResponseGenerator.okResponse();
	}

	/**
	 * API to get information of all super classes of specified class
	 * 
	 * @param cid The class ID
	 * @return The information
	 */
	@GetMapping(value = "/superclasses/{cid}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getSuperClassesInfo(@PathVariable(value = "cid") String cid) {

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
	@GetMapping(value = "/subclasses/{cid}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getSubClassesInfo(@PathVariable(value = "cid") String cid) {

		if (!hierarchyMap.containsKey(cid)) {
			return ResponseGenerator.generateBadRequest("The cid " + cid + " does not exist");
		} else {
			Document output = new Document();
			recursiveRetrieval(hierarchyMap.get(cid), output);
			return ResponseGenerator.okResponse(output.toJson());
		}
	}
}
