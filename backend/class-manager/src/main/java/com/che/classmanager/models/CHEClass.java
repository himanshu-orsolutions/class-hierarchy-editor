package com.che.classmanager.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * The model Class. It holds information of a class.
 */
@Entity(name = "classes")
public class CHEClass {

	@Id
	@Column(name = "cid")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer cid;

	@Column(name = "pid")
	Integer pid;

	@Column(name = "name")
	String name;

	@Column(name = "abstract")
	Boolean isAbstract;

	public Integer getCid() {
		return cid;
	}

	public void setCid(Integer cid) {
		this.cid = cid;
	}

	public Integer getPid() {
		return pid;
	}

	public void setPid(Integer pid) {
		this.pid = pid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Boolean getIsAbstract() {
		return isAbstract;
	}

	public void setIsAbstract(Boolean isAbstract) {
		this.isAbstract = isAbstract;
	}

	public CHEClass(Integer cid, Integer pid, String name, Boolean isAbstract) {
		super();
		this.cid = cid;
		this.pid = pid;
		this.name = name;
		this.isAbstract = isAbstract;
	}

	public CHEClass() {

	}
}