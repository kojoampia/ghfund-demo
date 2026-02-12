package com.ghfund.appdemo.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Investment.
 */
@Entity
@Table(name = "investment")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Investment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "project", nullable = false)
    private String project;

    @Column(name = "amount", precision = 21, scale = 2)
    private BigDecimal amount;

    @Column(name = "date")
    private Instant date;

    @Column(name = "roi", precision = 21, scale = 2)
    private BigDecimal roi;

    @Column(name = "status")
    private String status;

    @Column(name = "hash")
    private String hash;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Investment id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProject() {
        return this.project;
    }

    public Investment project(String project) {
        this.setProject(project);
        return this;
    }

    public void setProject(String project) {
        this.project = project;
    }

    public BigDecimal getAmount() {
        return this.amount;
    }

    public Investment amount(BigDecimal amount) {
        this.setAmount(amount);
        return this;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Instant getDate() {
        return this.date;
    }

    public Investment date(Instant date) {
        this.setDate(date);
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public BigDecimal getRoi() {
        return this.roi;
    }

    public Investment roi(BigDecimal roi) {
        this.setRoi(roi);
        return this;
    }

    public void setRoi(BigDecimal roi) {
        this.roi = roi;
    }

    public String getStatus() {
        return this.status;
    }

    public Investment status(String status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getHash() {
        return this.hash;
    }

    public Investment hash(String hash) {
        this.setHash(hash);
        return this;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Investment)) {
            return false;
        }
        return getId() != null && getId().equals(((Investment) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Investment{" +
            "id=" + getId() +
            ", project='" + getProject() + "'" +
            ", amount=" + getAmount() +
            ", date='" + getDate() + "'" +
            ", roi=" + getRoi() +
            ", status='" + getStatus() + "'" +
            ", hash='" + getHash() + "'" +
            "}";
    }
}
