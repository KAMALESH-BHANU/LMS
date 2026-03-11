package org.librarymanagementsystem.repository;

import org.librarymanagementsystem.model.Academic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AcademicRepository extends JpaRepository<Academic,Long> {


}
