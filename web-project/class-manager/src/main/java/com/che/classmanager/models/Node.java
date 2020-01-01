package com.che.classmanager.models;

import java.util.Set;

/**
 * The Node. It holds information of a class and its child classes.
 */
public class Node {

	private CHEClass data;
	private Set<Node> childs;

	/**
	 * Instantiating the node
	 * 
	 * @param data   The data
	 * @param childs The childs
	 */
	public Node(CHEClass data, Set<Node> childs) {
		this.data = data;
		this.childs = childs;
	}

	public CHEClass getData() {
		return data;
	}

	public void setData(CHEClass data) {
		this.data = data;
	}

	public Set<Node> getChilds() {
		return childs;
	}

	public void setChilds(Set<Node> childs) {
		this.childs = childs;
	}

	@Override
	public int hashCode() {
		return data.getCid();
	}

	@Override
	public boolean equals(Object obj) {

		if (obj != null) {
			return data.getCid().equals(((Node) obj).getData().getCid());
		}
		return false;
	}
}
