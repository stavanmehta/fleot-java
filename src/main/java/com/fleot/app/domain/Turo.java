package com.fleot.app.domain;


import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * Jhipster entity model for fleot
 */
@ApiModel(description = "Jhipster entity model for fleot")
@Entity
@Table(name = "turo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Turo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "turo_id")
    private String turoId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTuroId() {
        return turoId;
    }

    public Turo turoId(String turoId) {
        this.turoId = turoId;
        return this;
    }

    public void setTuroId(String turoId) {
        this.turoId = turoId;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Turo)) {
            return false;
        }
        return id != null && id.equals(((Turo) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Turo{" +
            "id=" + getId() +
            ", turoId='" + getTuroId() + "'" +
            "}";
    }
}
