package com.fleot.app.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Car.
 */
@Entity
@Table(name = "car")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Car implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "brand", nullable = false)
    private String brand;

    @NotNull
    @Column(name = "model", nullable = false)
    private String model;

    @NotNull
    @Column(name = "registration_no", nullable = false)
    private String registrationNo;

    
    @Lob
    @Column(name = "image", nullable = false)
    private byte[] image;

    @Column(name = "image_content_type", nullable = false)
    private String imageContentType;

    @NotNull
    @Column(name = "manufacturer_year", nullable = false)
    private Integer manufacturerYear;

    @Column(name = "driver_id")
    private Long driverId;

    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name = "age_restriction", nullable = false)
    private Integer ageRestriction;

    @NotNull
    @Column(name = "daily_rate", nullable = false)
    private Integer dailyRate;

    @Column(name = "hourly_rate")
    private Integer hourlyRate;

    @Column(name = "miles_surcharge")
    private Integer milesSurcharge;

    @Column(name = "late_return_fee")
    private Integer lateReturnFee;

    @Column(name = "cleaning_fee")
    private Integer cleaningFee;

    @Column(name = "deposit")
    private Integer deposit;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @ManyToOne
    @JsonIgnoreProperties("cars")
    private CarType cartype;

    @ManyToOne
    @JsonIgnoreProperties("cars")
    private FleetOwner fleetowner;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBrand() {
        return brand;
    }

    public Car brand(String brand) {
        this.brand = brand;
        return this;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public Car model(String model) {
        this.model = model;
        return this;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getRegistrationNo() {
        return registrationNo;
    }

    public Car registrationNo(String registrationNo) {
        this.registrationNo = registrationNo;
        return this;
    }

    public void setRegistrationNo(String registrationNo) {
        this.registrationNo = registrationNo;
    }

    public byte[] getImage() {
        return image;
    }

    public Car image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public Car imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public Integer getManufacturerYear() {
        return manufacturerYear;
    }

    public Car manufacturerYear(Integer manufacturerYear) {
        this.manufacturerYear = manufacturerYear;
        return this;
    }

    public void setManufacturerYear(Integer manufacturerYear) {
        this.manufacturerYear = manufacturerYear;
    }

    public Long getDriverId() {
        return driverId;
    }

    public Car driverId(Long driverId) {
        this.driverId = driverId;
        return this;
    }

    public void setDriverId(Long driverId) {
        this.driverId = driverId;
    }

    public String getDescription() {
        return description;
    }

    public Car description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getAgeRestriction() {
        return ageRestriction;
    }

    public Car ageRestriction(Integer ageRestriction) {
        this.ageRestriction = ageRestriction;
        return this;
    }

    public void setAgeRestriction(Integer ageRestriction) {
        this.ageRestriction = ageRestriction;
    }

    public Integer getDailyRate() {
        return dailyRate;
    }

    public Car dailyRate(Integer dailyRate) {
        this.dailyRate = dailyRate;
        return this;
    }

    public void setDailyRate(Integer dailyRate) {
        this.dailyRate = dailyRate;
    }

    public Integer getHourlyRate() {
        return hourlyRate;
    }

    public Car hourlyRate(Integer hourlyRate) {
        this.hourlyRate = hourlyRate;
        return this;
    }

    public void setHourlyRate(Integer hourlyRate) {
        this.hourlyRate = hourlyRate;
    }

    public Integer getMilesSurcharge() {
        return milesSurcharge;
    }

    public Car milesSurcharge(Integer milesSurcharge) {
        this.milesSurcharge = milesSurcharge;
        return this;
    }

    public void setMilesSurcharge(Integer milesSurcharge) {
        this.milesSurcharge = milesSurcharge;
    }

    public Integer getLateReturnFee() {
        return lateReturnFee;
    }

    public Car lateReturnFee(Integer lateReturnFee) {
        this.lateReturnFee = lateReturnFee;
        return this;
    }

    public void setLateReturnFee(Integer lateReturnFee) {
        this.lateReturnFee = lateReturnFee;
    }

    public Integer getCleaningFee() {
        return cleaningFee;
    }

    public Car cleaningFee(Integer cleaningFee) {
        this.cleaningFee = cleaningFee;
        return this;
    }

    public void setCleaningFee(Integer cleaningFee) {
        this.cleaningFee = cleaningFee;
    }

    public Integer getDeposit() {
        return deposit;
    }

    public Car deposit(Integer deposit) {
        this.deposit = deposit;
        return this;
    }

    public void setDeposit(Integer deposit) {
        this.deposit = deposit;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Car createdAt(Instant createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public Car updatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public CarType getCartype() {
        return cartype;
    }

    public Car cartype(CarType carType) {
        this.cartype = carType;
        return this;
    }

    public void setCartype(CarType carType) {
        this.cartype = carType;
    }

    public FleetOwner getFleetowner() {
        return fleetowner;
    }

    public Car fleetowner(FleetOwner fleetOwner) {
        this.fleetowner = fleetOwner;
        return this;
    }

    public void setFleetowner(FleetOwner fleetOwner) {
        this.fleetowner = fleetOwner;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Car)) {
            return false;
        }
        return id != null && id.equals(((Car) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Car{" +
            "id=" + getId() +
            ", brand='" + getBrand() + "'" +
            ", model='" + getModel() + "'" +
            ", registrationNo='" + getRegistrationNo() + "'" +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            ", manufacturerYear=" + getManufacturerYear() +
            ", driverId=" + getDriverId() +
            ", description='" + getDescription() + "'" +
            ", ageRestriction=" + getAgeRestriction() +
            ", dailyRate=" + getDailyRate() +
            ", hourlyRate=" + getHourlyRate() +
            ", milesSurcharge=" + getMilesSurcharge() +
            ", lateReturnFee=" + getLateReturnFee() +
            ", cleaningFee=" + getCleaningFee() +
            ", deposit=" + getDeposit() +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
