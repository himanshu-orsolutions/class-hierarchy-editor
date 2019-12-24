package com.che.classmanager.models;

import java.util.List;

/**
 * The Node. It holds information of a class and its child classes.
 */
public class Node {

	private Class data;
	private List<Node> childs;

	/**
	 * Instantiating the node
	 * 
	 * @param data   The data
	 * @param childs The childs
	 */
	public Node(Class data, List<Node> childs) {
		this.data = data;
		this.childs = childs;
	}

	public Class getData() {
		return data;
	}

	public void setData(Class data) {
		this.data = data;
	}

	public List<Node> getChilds() {
		return childs;
	}

	public void setChilds(List<Node> childs) {
		this.childs = childs;
	}
}
