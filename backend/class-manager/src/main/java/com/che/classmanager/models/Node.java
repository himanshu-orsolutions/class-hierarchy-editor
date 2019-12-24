package com.che.classmanager.models;

import java.util.List;

/**
 * The Node. It holds information of a class and its child classes.
 */
public class Node {

	private Class data;
	private List<Class> childs;

	/**
	 * Instantiating the node
	 * 
	 * @param data   The data
	 * @param childs The childs
	 */
	public Node(Class data, List<Class> childs) {
		this.data = data;
		this.childs = childs;
	}

	public Class getData() {
		return data;
	}

	public void setData(Class data) {
		this.data = data;
	}

	public List<Class> getChilds() {
		return childs;
	}

	public void setChilds(List<Class> childs) {
		this.childs = childs;
	}
}
