package com.fleot.app.web.rest;

import com.fleot.app.FleotappApp;
import com.fleot.app.domain.Turo;
import com.fleot.app.repository.TuroRepository;
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
import java.util.List;

import static com.fleot.app.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link TuroResource} REST controller.
 */
@SpringBootTest(classes = FleotappApp.class)
public class TuroResourceIT {

    private static final String DEFAULT_TURO_ID = "AAAAAAAAAA";
    private static final String UPDATED_TURO_ID = "BBBBBBBBBB";

    @Autowired
    private TuroRepository turoRepository;

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

    private MockMvc restTuroMockMvc;

    private Turo turo;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TuroResource turoResource = new TuroResource(turoRepository);
        this.restTuroMockMvc = MockMvcBuilders.standaloneSetup(turoResource)
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
    public static Turo createEntity(EntityManager em) {
        Turo turo = new Turo()
            .turoId(DEFAULT_TURO_ID);
        return turo;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Turo createUpdatedEntity(EntityManager em) {
        Turo turo = new Turo()
            .turoId(UPDATED_TURO_ID);
        return turo;
    }

    @BeforeEach
    public void initTest() {
        turo = createEntity(em);
    }

    @Test
    @Transactional
    public void createTuro() throws Exception {
        int databaseSizeBeforeCreate = turoRepository.findAll().size();

        // Create the Turo
        restTuroMockMvc.perform(post("/api/turos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(turo)))
            .andExpect(status().isCreated());

        // Validate the Turo in the database
        List<Turo> turoList = turoRepository.findAll();
        assertThat(turoList).hasSize(databaseSizeBeforeCreate + 1);
        Turo testTuro = turoList.get(turoList.size() - 1);
        assertThat(testTuro.getTuroId()).isEqualTo(DEFAULT_TURO_ID);
    }

    @Test
    @Transactional
    public void createTuroWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = turoRepository.findAll().size();

        // Create the Turo with an existing ID
        turo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTuroMockMvc.perform(post("/api/turos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(turo)))
            .andExpect(status().isBadRequest());

        // Validate the Turo in the database
        List<Turo> turoList = turoRepository.findAll();
        assertThat(turoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTuros() throws Exception {
        // Initialize the database
        turoRepository.saveAndFlush(turo);

        // Get all the turoList
        restTuroMockMvc.perform(get("/api/turos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(turo.getId().intValue())))
            .andExpect(jsonPath("$.[*].turoId").value(hasItem(DEFAULT_TURO_ID.toString())));
    }
    
    @Test
    @Transactional
    public void getTuro() throws Exception {
        // Initialize the database
        turoRepository.saveAndFlush(turo);

        // Get the turo
        restTuroMockMvc.perform(get("/api/turos/{id}", turo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(turo.getId().intValue()))
            .andExpect(jsonPath("$.turoId").value(DEFAULT_TURO_ID.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTuro() throws Exception {
        // Get the turo
        restTuroMockMvc.perform(get("/api/turos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTuro() throws Exception {
        // Initialize the database
        turoRepository.saveAndFlush(turo);

        int databaseSizeBeforeUpdate = turoRepository.findAll().size();

        // Update the turo
        Turo updatedTuro = turoRepository.findById(turo.getId()).get();
        // Disconnect from session so that the updates on updatedTuro are not directly saved in db
        em.detach(updatedTuro);
        updatedTuro
            .turoId(UPDATED_TURO_ID);

        restTuroMockMvc.perform(put("/api/turos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTuro)))
            .andExpect(status().isOk());

        // Validate the Turo in the database
        List<Turo> turoList = turoRepository.findAll();
        assertThat(turoList).hasSize(databaseSizeBeforeUpdate);
        Turo testTuro = turoList.get(turoList.size() - 1);
        assertThat(testTuro.getTuroId()).isEqualTo(UPDATED_TURO_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingTuro() throws Exception {
        int databaseSizeBeforeUpdate = turoRepository.findAll().size();

        // Create the Turo

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTuroMockMvc.perform(put("/api/turos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(turo)))
            .andExpect(status().isBadRequest());

        // Validate the Turo in the database
        List<Turo> turoList = turoRepository.findAll();
        assertThat(turoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTuro() throws Exception {
        // Initialize the database
        turoRepository.saveAndFlush(turo);

        int databaseSizeBeforeDelete = turoRepository.findAll().size();

        // Delete the turo
        restTuroMockMvc.perform(delete("/api/turos/{id}", turo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Turo> turoList = turoRepository.findAll();
        assertThat(turoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Turo.class);
        Turo turo1 = new Turo();
        turo1.setId(1L);
        Turo turo2 = new Turo();
        turo2.setId(turo1.getId());
        assertThat(turo1).isEqualTo(turo2);
        turo2.setId(2L);
        assertThat(turo1).isNotEqualTo(turo2);
        turo1.setId(null);
        assertThat(turo1).isNotEqualTo(turo2);
    }
}
