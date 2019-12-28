package com.che.classmanager.controllers;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Pattern;

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
	 * The map of current class names
	 */
	public static Map<String, Integer> classNameMap = new HashMap<>();

	/**
	 * The class hierarchy map
	 */
	public static Map<Integer, Node> hierarchyMap = new HashMap<>();

	/**
	 * Removes the class node and all its sub-class nodes from the hierarchy
	 * 
	 * @param node The node
	 */
	private void removeNode(Node node) {

		if (node == null) {
			return;
		}

		// Removing the node from hierarchy map, class name set, and the parent's list
		hierarchyMap.remove(node.getData().getCid());
		classNameMap.remove(node.getData().getName());

		if (hierarchyMap.containsKey(node.getData().getPid())) { // Only the first case
			hierarchyMap.get(node.getData().getPid()).getChilds().remove(node);
		}

		// Removing the class in DB
		cheRepository.delete(node.getData());

		if (!node.getChilds().isEmpty()) { // Iterating over the child classes
			for (Node child : node.getChilds()) {
				removeNode(hierarchyMap.get(child.getData().getCid()));
			}
		}
	}

	/**
	 * Recursively iterates over the nodes and gets the sub-classes information
	 * 
	 * @param node   The current node
	 * @param output The output
	 */
	private void recursiveRetrieval(Node node, Document output) {

		// Setting the class information
		output.put("cid", node.getData().getCid());
		output.put("pid", node.getData().getPid());
		output.put("name", node.getData().getName());
		output.put("isAbstract", node.getData().getIsAbstract());

		List<Document> childClassesInfo = new ArrayList<>();
		Set<Node> childNodes = node.getChilds();

		if (childNodes.isEmpty()) {
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
	public ResponseEntity<String> addNewClass(@RequestParam(value = "cid", required = true) Integer cid,
			@RequestParam(value = "name", required = true) String name,
			@RequestParam(value = "abstract", defaultValue = "false") Boolean isAbstract,
			@RequestParam(value = "pid", defaultValue = "0") Integer pid) {

		// Validating the input
		if (!name.matches(IClassConstants.CLASSNAMEREGEX)) {
			return ResponseGenerator.generateBadRequest("Invalid class name.");
		}
		if (hierarchyMap.containsKey(cid)) {
			return ResponseGenerator.generateBadRequest("The cid '" + cid + "' already exists.");
		}
		if (classNameMap.containsKey(name)) {
			return ResponseGenerator.generateBadRequest("The class name '" + name + "' already exists.");
		}
		if (!hierarchyMap.containsKey(pid)) {
			return ResponseGenerator.generateBadRequest("The pid '" + pid + "' not found.");
		}

		// Creating the new class instance
		CHEClass cheClass = new CHEClass(cid, pid, name, isAbstract);

		// Adding the new class name in the map
		classNameMap.put(name, cid);

		// Adding the class into the hierarchy map
		hierarchyMap.get(pid).getChilds().add(new Node(cheClass, new HashSet<>()));
		hierarchyMap.put(cid, new Node(cheClass, new HashSet<>()));

		// Adding the class in DB
		cheRepository.save(cheClass);

		return ResponseGenerator.okResponse();
	}

	/**
	 * API to search for classes
	 * 
	 * @param tag The search tag
	 * @return The list of classes
	 */
	@GetMapping(value = "/searchclasses", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> searchClasses(@RequestParam(value = "tag", required = true) String tag) {

		tag = tag.trim(); // Trimming the tag

		// Validating the input
		if (!tag.matches(IClassConstants.SEARCHTAGREGEX)) {
			return ResponseGenerator.generateBadRequest("Invalid tag.");
		} else {
			Document output = new Document();
			List<Document> classes = new ArrayList<>();
			Set<String> namesSet = classNameMap.keySet();
			Pattern tagPattern = Pattern.compile(tag, Pattern.CASE_INSENSITIVE);

			namesSet.forEach(name -> {
				if (tagPattern.matcher(name).find()) {
					Document classInfo = new Document();
					Node node = hierarchyMap.get(classNameMap.get(name));
					classInfo.append("cid", node.getData().getCid()).append("name", node.getData().getName())
							.append("pid", node.getData().getPid()).append("abstract", node.getData().getIsAbstract());
					classes.add(classInfo);
				}
			});

			output.put("classes", classes);
			return ResponseGenerator.okResponse(output.toJson());
		}
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
			if (cheClass.getCid() == null || StringUtils.isBlank(cheClass.getName())) {
				return ResponseGenerator.generateBadRequest("The cid/name cannot be null/empty.");
			}
			if (!cheClass.getName().matches(IClassConstants.CLASSNAMEREGEX)) {
				return ResponseGenerator.generateBadRequest("Invalid class name: " + cheClass.getName());
			}
			if (hierarchyMap.containsKey(cheClass.getCid())) {
				return ResponseGenerator.generateBadRequest("The cid '" + cheClass.getCid() + "' already exists.");
			}
			if (classNameMap.containsKey(cheClass.getName())) {
				return ResponseGenerator
						.generateBadRequest("The class name '" + cheClass.getName() + "' already exists.");
			}
			if (cheClass.getPid() != null && !hierarchyMap.containsKey(cheClass.getPid())) {
				return ResponseGenerator.generateBadRequest("The pid '" + cheClass.getPid() + "' not found.");
			}

			// Adding the default value if not present
			if (cheClass.getIsAbstract() == null) {
				cheClass.setIsAbstract(false);
			}
			if (cheClass.getPid() == null) {
				cheClass.setPid(0);
			}

			// Setting the creation time
			cheClass.setCreationTime(new Date(System.currentTimeMillis()));
		}

		// Adding all classes
		for (CHEClass cheClass : container.getClasses()) {

			// Adding the new class name in the map
			classNameMap.put(cheClass.getName(), cheClass.getCid());

			// Adding the class into the hierarchy map
			hierarchyMap.get(cheClass.getPid()).getChilds().add(new Node(cheClass, new HashSet<>()));
			hierarchyMap.put(cheClass.getCid(), new Node(cheClass, new HashSet<>()));

			// Adding the class in DB
			cheRepository.save(cheClass);
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
	public ResponseEntity<?> getClassInfo(@PathVariable(value = "cid") Integer cid) {

		if (hierarchyMap.containsKey(cid) && cid != 0) {
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
	public ResponseEntity<String> deleteClassInfo(@PathVariable(value = "cid") Integer cid) {

		if (!hierarchyMap.containsKey(cid) || cid == 0) {
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
	public ResponseEntity<String> editClasInfo(@PathVariable(value = "cid") Integer cid,
			@RequestBody CHEClass cheClass) {

		// Validating the input
		if (!hierarchyMap.containsKey(cid) || cid == 0) {
			return ResponseGenerator.generateBadRequest("The cid " + cid + " does not exist");
		}
		if (StringUtils.isBlank(cheClass.getName())) {
			return ResponseGenerator.generateBadRequest("The class name cannot be null/empty.");
		}
		if (!cheClass.getName().matches(IClassConstants.CLASSNAMEREGEX)) {
			return ResponseGenerator.generateBadRequest("Invalid class name.");
		}
		if (classNameMap.containsKey(cheClass.getName()) && classNameMap.get(cheClass.getName()) != cid) {
			return ResponseGenerator.generateBadRequest("The class name '" + cheClass.getName() + "' already exists.");
		}

		// Updating the class name at all places
		CHEClass data = hierarchyMap.get(cid).getData();
		classNameMap.remove(data.getName());
		hierarchyMap.get(data.getPid()).getChilds().remove(new Node(data, new HashSet<>()));
		cheRepository.delete(data);

		data.setName(cheClass.getName());
		data.setPid(cheClass.getPid() == null ? 0 : cheClass.getPid());
		data.setIsAbstract(cheClass.getIsAbstract() == null ? false : cheClass.getIsAbstract());

		// Adding the updated class information
		classNameMap.put(data.getName(), data.getCid());
		hierarchyMap.get(data.getPid()).getChilds().add(new Node(data, new HashSet<>()));
		cheRepository.save(data);

		return ResponseGenerator.okResponse();
	}

	/**
	 * API to get information of all super classes of specified class
	 * 
	 * @param cid The class ID
	 * @return The information
	 */
	@GetMapping(value = "/superclasses/{cid}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getSuperClassesInfo(@PathVariable(value = "cid") Integer cid) {

		if (!hierarchyMap.containsKey(cid) || cid == 0) {
			return ResponseGenerator.generateBadRequest("The cid " + cid + " does not exist");
		} else {
			Document output = new Document();
			List<Document> list = new ArrayList<>();
			Node currentNode = hierarchyMap.get(cid);

			while (currentNode.getData().getPid() != 0) { // Iterating over all the parent classes
				Integer pid = currentNode.getData().getPid();
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
	public ResponseEntity<?> getSubClassesInfo(@PathVariable(value = "cid") Integer cid) {

		if (!hierarchyMap.containsKey(cid)) {
			return ResponseGenerator.generateBadRequest("The cid " + cid + " does not exist");
		} else {
			Document output = new Document();
			recursiveRetrieval(hierarchyMap.get(cid), output);
			return ResponseGenerator.okResponse(output.toJson());
		}
	}
}
