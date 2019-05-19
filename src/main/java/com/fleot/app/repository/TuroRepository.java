package com.fleot.app.repository;

import com.fleot.app.domain.Turo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Turo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TuroRepository extends JpaRepository<Turo, Long> {

}
