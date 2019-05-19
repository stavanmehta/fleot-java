package com.fleot.app.web.rest;

import com.fleot.app.domain.FleetOwner;
import com.fleot.app.repository.FleetOwnerRepository;
import com.fleot.app.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.fleot.app.domain.FleetOwner}.
 */
@RestController
@RequestMapping("/api")
public class FleetOwnerResource {

    private final Logger log = LoggerFactory.getLogger(FleetOwnerResource.class);

    private static final String ENTITY_NAME = "fleetOwner";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FleetOwnerRepository fleetOwnerRepository;

    public FleetOwnerResource(FleetOwnerRepository fleetOwnerRepository) {
        this.fleetOwnerRepository = fleetOwnerRepository;
    }

    /**
     * {@code POST  /fleet-owners} : Create a new fleetOwner.
     *
     * @param fleetOwner the fleetOwner to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new fleetOwner, or with status {@code 400 (Bad Request)} if the fleetOwner has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/fleet-owners")
    public ResponseEntity<FleetOwner> createFleetOwner(@Valid @RequestBody FleetOwner fleetOwner) throws URISyntaxException {
        log.debug("REST request to save FleetOwner : {}", fleetOwner);
        if (fleetOwner.getId() != null) {
            throw new BadRequestAlertException("A new fleetOwner cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FleetOwner result = fleetOwnerRepository.save(fleetOwner);
        return ResponseEntity.created(new URI("/api/fleet-owners/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /fleet-owners} : Updates an existing fleetOwner.
     *
     * @param fleetOwner the fleetOwner to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fleetOwner,
     * or with status {@code 400 (Bad Request)} if the fleetOwner is not valid,
     * or with status {@code 500 (Internal Server Error)} if the fleetOwner couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/fleet-owners")
    public ResponseEntity<FleetOwner> updateFleetOwner(@Valid @RequestBody FleetOwner fleetOwner) throws URISyntaxException {
        log.debug("REST request to update FleetOwner : {}", fleetOwner);
        if (fleetOwner.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FleetOwner result = fleetOwnerRepository.save(fleetOwner);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, fleetOwner.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /fleet-owners} : get all the fleetOwners.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of fleetOwners in body.
     */
    @GetMapping("/fleet-owners")
    public ResponseEntity<List<FleetOwner>> getAllFleetOwners(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of FleetOwners");
        Page<FleetOwner> page = fleetOwnerRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /fleet-owners/:id} : get the "id" fleetOwner.
     *
     * @param id the id of the fleetOwner to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the fleetOwner, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/fleet-owners/{id}")
    public ResponseEntity<FleetOwner> getFleetOwner(@PathVariable Long id) {
        log.debug("REST request to get FleetOwner : {}", id);
        Optional<FleetOwner> fleetOwner = fleetOwnerRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(fleetOwner);
    }

    /**
     * {@code DELETE  /fleet-owners/:id} : delete the "id" fleetOwner.
     *
     * @param id the id of the fleetOwner to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/fleet-owners/{id}")
    public ResponseEntity<Void> deleteFleetOwner(@PathVariable Long id) {
        log.debug("REST request to delete FleetOwner : {}", id);
        fleetOwnerRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
