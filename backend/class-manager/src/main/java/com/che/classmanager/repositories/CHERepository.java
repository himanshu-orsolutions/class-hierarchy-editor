package com.che.classmanager.repositories;

import com.che.classmanager.models.CHEClass;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * The CHERepository. It handles basic CRUD DB operations on the classes
 * information.
 */
public interface CHERepository extends JpaRepository<CHEClass, Integer> {

}
