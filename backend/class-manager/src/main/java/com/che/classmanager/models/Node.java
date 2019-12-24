package com.che.classmanager.models;

import java.util.HashSet;

/**
 * The Node. It holds information of a class and its child classes.
 */
public class Node {

	private Class data;
	private HashSet<Node> childs;

	/**
	 * Instantiating the node
	 * 
	 * @param data   The data
	 * @param childs The childs
	 */
	public Node(Class data, HashSet<Node> childs) {
		this.data = data;
		this.childs = childs;
	}

	public Class getData() {
		return data;
	}

	public void setData(Class data) {
		this.data = data;
	}

	public HashSet<Node> getChilds() {
		return childs;
	}

	public void setChilds(HashSet<Node> childs) {
		this.childs = childs;
	}

	@Override
	public int hashCode() {
		return data.getCid().hashCode();
	}

	@Override
	public boolean equals(Object obj) {

		if (obj != null) {
			return data.getCid().equals(((Node) obj).getData().getCid());
		}
		return false;
	}
}
