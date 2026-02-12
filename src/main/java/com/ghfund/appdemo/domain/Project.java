package com.ghfund.appdemo.domain;

import com.ghfund.appdemo.domain.enumeration.ProjectStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Project.
 */
@Entity
@Table(name = "project")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Project implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "sector")
    private String sector;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ProjectStatus status;

    @Column(name = "target_amount", precision = 21, scale = 2)
    private BigDecimal targetAmount;

    @Column(name = "current_raised", precision = 21, scale = 2)
    private BigDecimal currentRaised;

    @Column(name = "impact_score")
    private Integer impactScore;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Project id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Project name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSector() {
        return this.sector;
    }

    public Project sector(String sector) {
        this.setSector(sector);
        return this;
    }

    public void setSector(String sector) {
        this.sector = sector;
    }

    public ProjectStatus getStatus() {
        return this.status;
    }

    public Project status(ProjectStatus status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(ProjectStatus status) {
        this.status = status;
    }

    public BigDecimal getTargetAmount() {
        return this.targetAmount;
    }

    public Project targetAmount(BigDecimal targetAmount) {
        this.setTargetAmount(targetAmount);
        return this;
    }

    public void setTargetAmount(BigDecimal targetAmount) {
        this.targetAmount = targetAmount;
    }

    public BigDecimal getCurrentRaised() {
        return this.currentRaised;
    }

    public Project currentRaised(BigDecimal currentRaised) {
        this.setCurrentRaised(currentRaised);
        return this;
    }

    public void setCurrentRaised(BigDecimal currentRaised) {
        this.currentRaised = currentRaised;
    }

    public Integer getImpactScore() {
        return this.impactScore;
    }

    public Project impactScore(Integer impactScore) {
        this.setImpactScore(impactScore);
        return this;
    }

    public void setImpactScore(Integer impactScore) {
        this.impactScore = impactScore;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Project)) {
            return false;
        }
        return getId() != null && getId().equals(((Project) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Project{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", sector='" + getSector() + "'" +
            ", status='" + getStatus() + "'" +
            ", targetAmount=" + getTargetAmount() +
            ", currentRaised=" + getCurrentRaised() +
            ", impactScore=" + getImpactScore() +
            "}";
    }
}
