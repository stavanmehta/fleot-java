package com.fleot.app.web.rest;

import com.fleot.app.FleotappApp;
import com.fleot.app.domain.Car;
import com.fleot.app.repository.CarRepository;
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
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.fleot.app.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link CarResource} REST controller.
 */
@SpringBootTest(classes = FleotappApp.class)
public class CarResourceIT {

    private static final String DEFAULT_BRAND = "AAAAAAAAAA";
    private static final String UPDATED_BRAND = "BBBBBBBBBB";

    private static final String DEFAULT_MODEL = "AAAAAAAAAA";
    private static final String UPDATED_MODEL = "BBBBBBBBBB";

    private static final String DEFAULT_REGISTRATION_NO = "AAAAAAAAAA";
    private static final String UPDATED_REGISTRATION_NO = "BBBBBBBBBB";

    private static final byte[] DEFAULT_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_CONTENT_TYPE = "image/png";

    private static final Integer DEFAULT_MANUFACTURER_YEAR = 1;
    private static final Integer UPDATED_MANUFACTURER_YEAR = 2;

    private static final Long DEFAULT_DRIVER_ID = 1L;
    private static final Long UPDATED_DRIVER_ID = 2L;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Integer DEFAULT_AGE_RESTRICTION = 1;
    private static final Integer UPDATED_AGE_RESTRICTION = 2;

    private static final Integer DEFAULT_DAILY_RATE = 1;
    private static final Integer UPDATED_DAILY_RATE = 2;

    private static final Integer DEFAULT_HOURLY_RATE = 1;
    private static final Integer UPDATED_HOURLY_RATE = 2;

    private static final Integer DEFAULT_MILES_SURCHARGE = 1;
    private static final Integer UPDATED_MILES_SURCHARGE = 2;

    private static final Integer DEFAULT_LATE_RETURN_FEE = 1;
    private static final Integer UPDATED_LATE_RETURN_FEE = 2;

    private static final Integer DEFAULT_CLEANING_FEE = 1;
    private static final Integer UPDATED_CLEANING_FEE = 2;

    private static final Integer DEFAULT_DEPOSIT = 1;
    private static final Integer UPDATED_DEPOSIT = 2;

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private CarRepository carRepository;

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

    private MockMvc restCarMockMvc;

    private Car car;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CarResource carResource = new CarResource(carRepository);
        this.restCarMockMvc = MockMvcBuilders.standaloneSetup(carResource)
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
    public static Car createEntity(EntityManager em) {
        Car car = new Car()
            .brand(DEFAULT_BRAND)
            .model(DEFAULT_MODEL)
            .registrationNo(DEFAULT_REGISTRATION_NO)
            .image(DEFAULT_IMAGE)
            .imageContentType(DEFAULT_IMAGE_CONTENT_TYPE)
            .manufacturerYear(DEFAULT_MANUFACTURER_YEAR)
            .driverId(DEFAULT_DRIVER_ID)
            .description(DEFAULT_DESCRIPTION)
            .ageRestriction(DEFAULT_AGE_RESTRICTION)
            .dailyRate(DEFAULT_DAILY_RATE)
            .hourlyRate(DEFAULT_HOURLY_RATE)
            .milesSurcharge(DEFAULT_MILES_SURCHARGE)
            .lateReturnFee(DEFAULT_LATE_RETURN_FEE)
            .cleaningFee(DEFAULT_CLEANING_FEE)
            .deposit(DEFAULT_DEPOSIT)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedAt(DEFAULT_UPDATED_AT);
        return car;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Car createUpdatedEntity(EntityManager em) {
        Car car = new Car()
            .brand(UPDATED_BRAND)
            .model(UPDATED_MODEL)
            .registrationNo(UPDATED_REGISTRATION_NO)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE)
            .manufacturerYear(UPDATED_MANUFACTURER_YEAR)
            .driverId(UPDATED_DRIVER_ID)
            .description(UPDATED_DESCRIPTION)
            .ageRestriction(UPDATED_AGE_RESTRICTION)
            .dailyRate(UPDATED_DAILY_RATE)
            .hourlyRate(UPDATED_HOURLY_RATE)
            .milesSurcharge(UPDATED_MILES_SURCHARGE)
            .lateReturnFee(UPDATED_LATE_RETURN_FEE)
            .cleaningFee(UPDATED_CLEANING_FEE)
            .deposit(UPDATED_DEPOSIT)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);
        return car;
    }

    @BeforeEach
    public void initTest() {
        car = createEntity(em);
    }

    @Test
    @Transactional
    public void createCar() throws Exception {
        int databaseSizeBeforeCreate = carRepository.findAll().size();

        // Create the Car
        restCarMockMvc.perform(post("/api/cars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(car)))
            .andExpect(status().isCreated());

        // Validate the Car in the database
        List<Car> carList = carRepository.findAll();
        assertThat(carList).hasSize(databaseSizeBeforeCreate + 1);
        Car testCar = carList.get(carList.size() - 1);
        assertThat(testCar.getBrand()).isEqualTo(DEFAULT_BRAND);
        assertThat(testCar.getModel()).isEqualTo(DEFAULT_MODEL);
        assertThat(testCar.getRegistrationNo()).isEqualTo(DEFAULT_REGISTRATION_NO);
        assertThat(testCar.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testCar.getImageContentType()).isEqualTo(DEFAULT_IMAGE_CONTENT_TYPE);
        assertThat(testCar.getManufacturerYear()).isEqualTo(DEFAULT_MANUFACTURER_YEAR);
        assertThat(testCar.getDriverId()).isEqualTo(DEFAULT_DRIVER_ID);
        assertThat(testCar.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testCar.getAgeRestriction()).isEqualTo(DEFAULT_AGE_RESTRICTION);
        assertThat(testCar.getDailyRate()).isEqualTo(DEFAULT_DAILY_RATE);
        assertThat(testCar.getHourlyRate()).isEqualTo(DEFAULT_HOURLY_RATE);
        assertThat(testCar.getMilesSurcharge()).isEqualTo(DEFAULT_MILES_SURCHARGE);
        assertThat(testCar.getLateReturnFee()).isEqualTo(DEFAULT_LATE_RETURN_FEE);
        assertThat(testCar.getCleaningFee()).isEqualTo(DEFAULT_CLEANING_FEE);
        assertThat(testCar.getDeposit()).isEqualTo(DEFAULT_DEPOSIT);
        assertThat(testCar.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testCar.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createCarWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = carRepository.findAll().size();

        // Create the Car with an existing ID
        car.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCarMockMvc.perform(post("/api/cars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(car)))
            .andExpect(status().isBadRequest());

        // Validate the Car in the database
        List<Car> carList = carRepository.findAll();
        assertThat(carList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkBrandIsRequired() throws Exception {
        int databaseSizeBeforeTest = carRepository.findAll().size();
        // set the field null
        car.setBrand(null);

        // Create the Car, which fails.

        restCarMockMvc.perform(post("/api/cars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(car)))
            .andExpect(status().isBadRequest());

        List<Car> carList = carRepository.findAll();
        assertThat(carList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkModelIsRequired() throws Exception {
        int databaseSizeBeforeTest = carRepository.findAll().size();
        // set the field null
        car.setModel(null);

        // Create the Car, which fails.

        restCarMockMvc.perform(post("/api/cars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(car)))
            .andExpect(status().isBadRequest());

        List<Car> carList = carRepository.findAll();
        assertThat(carList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRegistrationNoIsRequired() throws Exception {
        int databaseSizeBeforeTest = carRepository.findAll().size();
        // set the field null
        car.setRegistrationNo(null);

        // Create the Car, which fails.

        restCarMockMvc.perform(post("/api/cars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(car)))
            .andExpect(status().isBadRequest());

        List<Car> carList = carRepository.findAll();
        assertThat(carList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkManufacturerYearIsRequired() throws Exception {
        int databaseSizeBeforeTest = carRepository.findAll().size();
        // set the field null
        car.setManufacturerYear(null);

        // Create the Car, which fails.

        restCarMockMvc.perform(post("/api/cars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(car)))
            .andExpect(status().isBadRequest());

        List<Car> carList = carRepository.findAll();
        assertThat(carList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAgeRestrictionIsRequired() throws Exception {
        int databaseSizeBeforeTest = carRepository.findAll().size();
        // set the field null
        car.setAgeRestriction(null);

        // Create the Car, which fails.

        restCarMockMvc.perform(post("/api/cars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(car)))
            .andExpect(status().isBadRequest());

        List<Car> carList = carRepository.findAll();
        assertThat(carList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDailyRateIsRequired() throws Exception {
        int databaseSizeBeforeTest = carRepository.findAll().size();
        // set the field null
        car.setDailyRate(null);

        // Create the Car, which fails.

        restCarMockMvc.perform(post("/api/cars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(car)))
            .andExpect(status().isBadRequest());

        List<Car> carList = carRepository.findAll();
        assertThat(carList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCars() throws Exception {
        // Initialize the database
        carRepository.saveAndFlush(car);

        // Get all the carList
        restCarMockMvc.perform(get("/api/cars?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(car.getId().intValue())))
            .andExpect(jsonPath("$.[*].brand").value(hasItem(DEFAULT_BRAND.toString())))
            .andExpect(jsonPath("$.[*].model").value(hasItem(DEFAULT_MODEL.toString())))
            .andExpect(jsonPath("$.[*].registrationNo").value(hasItem(DEFAULT_REGISTRATION_NO.toString())))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))))
            .andExpect(jsonPath("$.[*].manufacturerYear").value(hasItem(DEFAULT_MANUFACTURER_YEAR)))
            .andExpect(jsonPath("$.[*].driverId").value(hasItem(DEFAULT_DRIVER_ID.intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].ageRestriction").value(hasItem(DEFAULT_AGE_RESTRICTION)))
            .andExpect(jsonPath("$.[*].dailyRate").value(hasItem(DEFAULT_DAILY_RATE)))
            .andExpect(jsonPath("$.[*].hourlyRate").value(hasItem(DEFAULT_HOURLY_RATE)))
            .andExpect(jsonPath("$.[*].milesSurcharge").value(hasItem(DEFAULT_MILES_SURCHARGE)))
            .andExpect(jsonPath("$.[*].lateReturnFee").value(hasItem(DEFAULT_LATE_RETURN_FEE)))
            .andExpect(jsonPath("$.[*].cleaningFee").value(hasItem(DEFAULT_CLEANING_FEE)))
            .andExpect(jsonPath("$.[*].deposit").value(hasItem(DEFAULT_DEPOSIT)))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }
    
    @Test
    @Transactional
    public void getCar() throws Exception {
        // Initialize the database
        carRepository.saveAndFlush(car);

        // Get the car
        restCarMockMvc.perform(get("/api/cars/{id}", car.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(car.getId().intValue()))
            .andExpect(jsonPath("$.brand").value(DEFAULT_BRAND.toString()))
            .andExpect(jsonPath("$.model").value(DEFAULT_MODEL.toString()))
            .andExpect(jsonPath("$.registrationNo").value(DEFAULT_REGISTRATION_NO.toString()))
            .andExpect(jsonPath("$.imageContentType").value(DEFAULT_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.image").value(Base64Utils.encodeToString(DEFAULT_IMAGE)))
            .andExpect(jsonPath("$.manufacturerYear").value(DEFAULT_MANUFACTURER_YEAR))
            .andExpect(jsonPath("$.driverId").value(DEFAULT_DRIVER_ID.intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.ageRestriction").value(DEFAULT_AGE_RESTRICTION))
            .andExpect(jsonPath("$.dailyRate").value(DEFAULT_DAILY_RATE))
            .andExpect(jsonPath("$.hourlyRate").value(DEFAULT_HOURLY_RATE))
            .andExpect(jsonPath("$.milesSurcharge").value(DEFAULT_MILES_SURCHARGE))
            .andExpect(jsonPath("$.lateReturnFee").value(DEFAULT_LATE_RETURN_FEE))
            .andExpect(jsonPath("$.cleaningFee").value(DEFAULT_CLEANING_FEE))
            .andExpect(jsonPath("$.deposit").value(DEFAULT_DEPOSIT))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCar() throws Exception {
        // Get the car
        restCarMockMvc.perform(get("/api/cars/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCar() throws Exception {
        // Initialize the database
        carRepository.saveAndFlush(car);

        int databaseSizeBeforeUpdate = carRepository.findAll().size();

        // Update the car
        Car updatedCar = carRepository.findById(car.getId()).get();
        // Disconnect from session so that the updates on updatedCar are not directly saved in db
        em.detach(updatedCar);
        updatedCar
            .brand(UPDATED_BRAND)
            .model(UPDATED_MODEL)
            .registrationNo(UPDATED_REGISTRATION_NO)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE)
            .manufacturerYear(UPDATED_MANUFACTURER_YEAR)
            .driverId(UPDATED_DRIVER_ID)
            .description(UPDATED_DESCRIPTION)
            .ageRestriction(UPDATED_AGE_RESTRICTION)
            .dailyRate(UPDATED_DAILY_RATE)
            .hourlyRate(UPDATED_HOURLY_RATE)
            .milesSurcharge(UPDATED_MILES_SURCHARGE)
            .lateReturnFee(UPDATED_LATE_RETURN_FEE)
            .cleaningFee(UPDATED_CLEANING_FEE)
            .deposit(UPDATED_DEPOSIT)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);

        restCarMockMvc.perform(put("/api/cars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCar)))
            .andExpect(status().isOk());

        // Validate the Car in the database
        List<Car> carList = carRepository.findAll();
        assertThat(carList).hasSize(databaseSizeBeforeUpdate);
        Car testCar = carList.get(carList.size() - 1);
        assertThat(testCar.getBrand()).isEqualTo(UPDATED_BRAND);
        assertThat(testCar.getModel()).isEqualTo(UPDATED_MODEL);
        assertThat(testCar.getRegistrationNo()).isEqualTo(UPDATED_REGISTRATION_NO);
        assertThat(testCar.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testCar.getImageContentType()).isEqualTo(UPDATED_IMAGE_CONTENT_TYPE);
        assertThat(testCar.getManufacturerYear()).isEqualTo(UPDATED_MANUFACTURER_YEAR);
        assertThat(testCar.getDriverId()).isEqualTo(UPDATED_DRIVER_ID);
        assertThat(testCar.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testCar.getAgeRestriction()).isEqualTo(UPDATED_AGE_RESTRICTION);
        assertThat(testCar.getDailyRate()).isEqualTo(UPDATED_DAILY_RATE);
        assertThat(testCar.getHourlyRate()).isEqualTo(UPDATED_HOURLY_RATE);
        assertThat(testCar.getMilesSurcharge()).isEqualTo(UPDATED_MILES_SURCHARGE);
        assertThat(testCar.getLateReturnFee()).isEqualTo(UPDATED_LATE_RETURN_FEE);
        assertThat(testCar.getCleaningFee()).isEqualTo(UPDATED_CLEANING_FEE);
        assertThat(testCar.getDeposit()).isEqualTo(UPDATED_DEPOSIT);
        assertThat(testCar.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testCar.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingCar() throws Exception {
        int databaseSizeBeforeUpdate = carRepository.findAll().size();

        // Create the Car

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCarMockMvc.perform(put("/api/cars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(car)))
            .andExpect(status().isBadRequest());

        // Validate the Car in the database
        List<Car> carList = carRepository.findAll();
        assertThat(carList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCar() throws Exception {
        // Initialize the database
        carRepository.saveAndFlush(car);

        int databaseSizeBeforeDelete = carRepository.findAll().size();

        // Delete the car
        restCarMockMvc.perform(delete("/api/cars/{id}", car.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Car> carList = carRepository.findAll();
        assertThat(carList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Car.class);
        Car car1 = new Car();
        car1.setId(1L);
        Car car2 = new Car();
        car2.setId(car1.getId());
        assertThat(car1).isEqualTo(car2);
        car2.setId(2L);
        assertThat(car1).isNotEqualTo(car2);
        car1.setId(null);
        assertThat(car1).isNotEqualTo(car2);
    }
}
