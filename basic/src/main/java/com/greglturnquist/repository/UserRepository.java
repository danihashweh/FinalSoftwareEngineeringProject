package com.greglturnquist.repository;


import com.greglturnquist.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findById(Long id);
}
