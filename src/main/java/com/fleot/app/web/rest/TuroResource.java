package com.fleot.app.web.rest;

import com.fleot.app.domain.Turo;
import com.fleot.app.repository.TuroRepository;
import com.fleot.app.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.fleot.app.domain.Turo}.
 */
@RestController
@RequestMapping("/api")
public class TuroResource {

    private final Logger log = LoggerFactory.getLogger(TuroResource.class);

    private static final String ENTITY_NAME = "turo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TuroRepository turoRepository;

    public TuroResource(TuroRepository turoRepository) {
        this.turoRepository = turoRepository;
    }

    /**
     * {@code POST  /turos} : Create a new turo.
     *
     * @param turo the turo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new turo, or with status {@code 400 (Bad Request)} if the turo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/turos")
    public ResponseEntity<Turo> createTuro(@RequestBody Turo turo) throws URISyntaxException {
        log.debug("REST request to save Turo : {}", turo);
        if (turo.getId() != null) {
            throw new BadRequestAlertException("A new turo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Turo result = turoRepository.save(turo);
        return ResponseEntity.created(new URI("/api/turos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /turos} : Updates an existing turo.
     *
     * @param turo the turo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated turo,
     * or with status {@code 400 (Bad Request)} if the turo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the turo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/turos")
    public ResponseEntity<Turo> updateTuro(@RequestBody Turo turo) throws URISyntaxException {
        log.debug("REST request to update Turo : {}", turo);
        if (turo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Turo result = turoRepository.save(turo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, turo.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /turos} : get all the turos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of turos in body.
     */
    @GetMapping("/turos")
    public List<Turo> getAllTuros() {
        log.debug("REST request to get all Turos");
        return turoRepository.findAll();
    }

    /**
     * {@code GET  /turos/:id} : get the "id" turo.
     *
     * @param id the id of the turo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the turo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/turos/{id}")
    public ResponseEntity<Turo> getTuro(@PathVariable Long id) {
        log.debug("REST request to get Turo : {}", id);
        Optional<Turo> turo = turoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(turo);
    }

    /**
     * {@code DELETE  /turos/:id} : delete the "id" turo.
     *
     * @param id the id of the turo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/turos/{id}")
    public ResponseEntity<Void> deleteTuro(@PathVariable Long id) {
        log.debug("REST request to delete Turo : {}", id);
        turoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
