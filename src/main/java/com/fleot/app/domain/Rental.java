package com.fleot.app.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Rental.
 */
@Entity
@Table(name = "rental")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Rental implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "start_at")
    private ZonedDateTime startAt;

    @Column(name = "end_aat")
    private ZonedDateTime endAat;

    @OneToOne
    @JoinColumn(unique = true)
    private Car car;

    @OneToOne
    @JoinColumn(unique = true)
    private FleetOwner fleetowner;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getStartAt() {
        return startAt;
    }

    public Rental startAt(ZonedDateTime startAt) {
        this.startAt = startAt;
        return this;
    }

    public void setStartAt(ZonedDateTime startAt) {
        this.startAt = startAt;
    }

    public ZonedDateTime getEndAat() {
        return endAat;
    }

    public Rental endAat(ZonedDateTime endAat) {
        this.endAat = endAat;
        return this;
    }

    public void setEndAat(ZonedDateTime endAat) {
        this.endAat = endAat;
    }

    public Car getCar() {
        return car;
    }

    public Rental car(Car car) {
        this.car = car;
        return this;
    }

    public void setCar(Car car) {
        this.car = car;
    }

    public FleetOwner getFleetowner() {
        return fleetowner;
    }

    public Rental fleetowner(FleetOwner fleetOwner) {
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
        if (!(o instanceof Rental)) {
            return false;
        }
        return id != null && id.equals(((Rental) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Rental{" +
            "id=" + getId() +
            ", startAt='" + getStartAt() + "'" +
            ", endAat='" + getEndAat() + "'" +
            "}";
    }
}
