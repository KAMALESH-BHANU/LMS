package org.librarymanagementsystem.repository;

import org.librarymanagementsystem.model.BookRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRequestRepository extends JpaRepository<BookRequest, Long> {

    Page<BookRequest> findByStatus(String status, Pageable pageable);

}