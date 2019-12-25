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

@Component
public class StartupListener implements ApplicationListener<ApplicationStartedEvent> {

	@Autowired
	CHERepository cheRepository;

	@Override
	public void onApplicationEvent(ApplicationStartedEvent event) {

		// Initializing the hierarchy map and class name map
		List<CHEClass> cheClasses = cheRepository.findAll();

		cheClasses.forEach(cheClass -> {
			// Adding the class into the hierarchy map and class name set
			ClassController.classNameMap.put(cheClass.getName(), cheClass.getCid());
			ClassController.hierarchyMap.put(cheClass.getCid(), new Node(cheClass, new HashSet<>()));

			if (cheClass.getPid() != 0) {
				ClassController.hierarchyMap.get(cheClass.getPid()).getChilds().add(new Node(cheClass, null));
			}
		});
	}
}
