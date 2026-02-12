package com.ghfund.appdemo.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Circle.
 */
@Entity
@Table(name = "circle")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Circle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "members")
    private Integer members;

    @Column(name = "impact")
    private Integer impact;

    @Column(name = "focus")
    private String focus;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Circle id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Circle name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getMembers() {
        return this.members;
    }

    public Circle members(Integer members) {
        this.setMembers(members);
        return this;
    }

    public void setMembers(Integer members) {
        this.members = members;
    }

    public Integer getImpact() {
        return this.impact;
    }

    public Circle impact(Integer impact) {
        this.setImpact(impact);
        return this;
    }

    public void setImpact(Integer impact) {
        this.impact = impact;
    }

    public String getFocus() {
        return this.focus;
    }

    public Circle focus(String focus) {
        this.setFocus(focus);
        return this;
    }

    public void setFocus(String focus) {
        this.focus = focus;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Circle)) {
            return false;
        }
        return getId() != null && getId().equals(((Circle) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Circle{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", members=" + getMembers() +
            ", impact=" + getImpact() +
            ", focus='" + getFocus() + "'" +
            "}";
    }
}
