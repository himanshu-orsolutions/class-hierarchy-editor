package com.che.classmanager.models;

/**
 * The model Class. It holds information of a class.
 */
public class Class {

	private String cid;
	private String name;
	private String isAbstract;
	private String pid;

	public String getCid() {
		return cid;
	}

	public void setCid(String cid) {
		this.cid = cid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getIsAbstract() {
		return isAbstract;
	}

	public void setIsAbstract(String isAbstract) {
		this.isAbstract = isAbstract;
	}

	public String getPid() {
		return pid;
	}

	public void setPid(String pid) {
		this.pid = pid;
	}

	/**
	 * GEts the string representation of the Class
	 */
	public String toString() {
		return cid;
	}
}