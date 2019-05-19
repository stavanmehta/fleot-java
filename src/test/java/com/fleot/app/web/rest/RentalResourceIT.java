package com.fleot.app.web.rest;

import com.fleot.app.FleotappApp;
import com.fleot.app.domain.Rental;
import com.fleot.app.repository.RentalRepository;
import com.fleot.app.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.fleot.app.web.rest.TestUtil.sameInstant;
import static com.fleot.app.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link RentalResource} REST controller.
 */
@SpringBootTest(classes = FleotappApp.class)
public class RentalResourceIT {

    private static final ZonedDateTime DEFAULT_START_AT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_START_AT = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_END_AAT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_END_AAT = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private RentalRepository rentalRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restRentalMockMvc;

    private Rental rental;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RentalResource rentalResource = new RentalResource(rentalRepository);
        this.restRentalMockMvc = MockMvcBuilders.standaloneSetup(rentalResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Rental createEntity(EntityManager em) {
        Rental rental = new Rental()
            .startAt(DEFAULT_START_AT)
            .endAat(DEFAULT_END_AAT);
        return rental;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Rental createUpdatedEntity(EntityManager em) {
        Rental rental = new Rental()
            .startAt(UPDATED_START_AT)
            .endAat(UPDATED_END_AAT);
        return rental;
    }

    @BeforeEach
    public void initTest() {
        rental = createEntity(em);
    }

    @Test
    @Transactional
    public void createRental() throws Exception {
        int databaseSizeBeforeCreate = rentalRepository.findAll().size();

        // Create the Rental
        restRentalMockMvc.perform(post("/api/rentals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rental)))
            .andExpect(status().isCreated());

        // Validate the Rental in the database
        List<Rental> rentalList = rentalRepository.findAll();
        assertThat(rentalList).hasSize(databaseSizeBeforeCreate + 1);
        Rental testRental = rentalList.get(rentalList.size() - 1);
        assertThat(testRental.getStartAt()).isEqualTo(DEFAULT_START_AT);
        assertThat(testRental.getEndAat()).isEqualTo(DEFAULT_END_AAT);
    }

    @Test
    @Transactional
    public void createRentalWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rentalRepository.findAll().size();

        // Create the Rental with an existing ID
        rental.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRentalMockMvc.perform(post("/api/rentals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rental)))
            .andExpect(status().isBadRequest());

        // Validate the Rental in the database
        List<Rental> rentalList = rentalRepository.findAll();
        assertThat(rentalList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRentals() throws Exception {
        // Initialize the database
        rentalRepository.saveAndFlush(rental);

        // Get all the rentalList
        restRentalMockMvc.perform(get("/api/rentals?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rental.getId().intValue())))
            .andExpect(jsonPath("$.[*].startAt").value(hasItem(sameInstant(DEFAULT_START_AT))))
            .andExpect(jsonPath("$.[*].endAat").value(hasItem(sameInstant(DEFAULT_END_AAT))));
    }
    
    @Test
    @Transactional
    public void getRental() throws Exception {
        // Initialize the database
        rentalRepository.saveAndFlush(rental);

        // Get the rental
        restRentalMockMvc.perform(get("/api/rentals/{id}", rental.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(rental.getId().intValue()))
            .andExpect(jsonPath("$.startAt").value(sameInstant(DEFAULT_START_AT)))
            .andExpect(jsonPath("$.endAat").value(sameInstant(DEFAULT_END_AAT)));
    }

    @Test
    @Transactional
    public void getNonExistingRental() throws Exception {
        // Get the rental
        restRentalMockMvc.perform(get("/api/rentals/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRental() throws Exception {
        // Initialize the database
        rentalRepository.saveAndFlush(rental);

        int databaseSizeBeforeUpdate = rentalRepository.findAll().size();

        // Update the rental
        Rental updatedRental = rentalRepository.findById(rental.getId()).get();
        // Disconnect from session so that the updates on updatedRental are not directly saved in db
        em.detach(updatedRental);
        updatedRental
            .startAt(UPDATED_START_AT)
            .endAat(UPDATED_END_AAT);

        restRentalMockMvc.perform(put("/api/rentals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRental)))
            .andExpect(status().isOk());

        // Validate the Rental in the database
        List<Rental> rentalList = rentalRepository.findAll();
        assertThat(rentalList).hasSize(databaseSizeBeforeUpdate);
        Rental testRental = rentalList.get(rentalList.size() - 1);
        assertThat(testRental.getStartAt()).isEqualTo(UPDATED_START_AT);
        assertThat(testRental.getEndAat()).isEqualTo(UPDATED_END_AAT);
    }

    @Test
    @Transactional
    public void updateNonExistingRental() throws Exception {
        int databaseSizeBeforeUpdate = rentalRepository.findAll().size();

        // Create the Rental

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRentalMockMvc.perform(put("/api/rentals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rental)))
            .andExpect(status().isBadRequest());

        // Validate the Rental in the database
        List<Rental> rentalList = rentalRepository.findAll();
        assertThat(rentalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRental() throws Exception {
        // Initialize the database
        rentalRepository.saveAndFlush(rental);

        int databaseSizeBeforeDelete = rentalRepository.findAll().size();

        // Delete the rental
        restRentalMockMvc.perform(delete("/api/rentals/{id}", rental.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Rental> rentalList = rentalRepository.findAll();
        assertThat(rentalList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Rental.class);
        Rental rental1 = new Rental();
        rental1.setId(1L);
        Rental rental2 = new Rental();
        rental2.setId(rental1.getId());
        assertThat(rental1).isEqualTo(rental2);
        rental2.setId(2L);
        assertThat(rental1).isNotEqualTo(rental2);
        rental1.setId(null);
        assertThat(rental1).isNotEqualTo(rental2);
    }
}
