package com.che.classmanager;

import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import com.che.classmanager.controllers.ClassController;
import com.che.classmanager.models.CHEClass;
import com.che.classmanager.models.Node;
import com.che.classmanager.repositories.CHERepository;

/**
 * The StartupListener. It listens to events at application startup.
 */
@Component
public class StartupListener implements ApplicationListener<ApplicationStartedEvent> {

	/**
	 * The CHE repository
	 */
	@Autowired
	CHERepository cheRepository;

	/**
	 * Triggers at when the application is started
	 * 
	 * @param event The event
	 */
	@Override
	public void onApplicationEvent(ApplicationStartedEvent event) {

		// Initializing the hierarchy map and class name map
		List<CHEClass> cheClasses = cheRepository.findAll();

		// Adding the top class with cid 0
		CHEClass rootClass = new CHEClass(0, -1, "Root", true);
		ClassController.classNameMap.put("Root", 0);
		ClassController.hierarchyMap.put(0, new Node(rootClass, new HashSet<>()));

		cheClasses.forEach(cheClass -> { // Iterating over the existing classes and initializing the hierarchy map
			ClassController.classNameMap.put(cheClass.getName(), cheClass.getCid());
			ClassController.hierarchyMap.put(cheClass.getCid(), new Node(cheClass, new HashSet<>()));

			if (cheClass.getPid() != 0) { // The child class
				ClassController.hierarchyMap.get(cheClass.getPid()).getChilds().add(new Node(cheClass, null));
			}
		});
	}
}
