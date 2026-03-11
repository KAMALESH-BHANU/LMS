package org.librarymanagementsystem.repository;

import org.librarymanagementsystem.model.Work;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkRepository extends JpaRepository<Work, Long> {

    List<Work> findByUserId(Long userId);
}
