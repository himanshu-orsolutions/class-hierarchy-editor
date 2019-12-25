package com.che.classmanager.repositories;

import com.che.classmanager.models.CHEClass;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CHERepository extends JpaRepository<CHEClass, Integer> {

}
