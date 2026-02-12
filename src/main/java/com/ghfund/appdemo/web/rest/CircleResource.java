package com.ghfund.appdemo.web.rest;

import com.ghfund.appdemo.domain.Circle;
import com.ghfund.appdemo.repository.CircleRepository;
import com.ghfund.appdemo.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.ghfund.appdemo.domain.Circle}.
 */
@RestController
@RequestMapping("/api/circles")
@Transactional
public class CircleResource {

    private static final Logger LOG = LoggerFactory.getLogger(CircleResource.class);

    private static final String ENTITY_NAME = "circle";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CircleRepository circleRepository;

    public CircleResource(CircleRepository circleRepository) {
        this.circleRepository = circleRepository;
    }

    /**
     * {@code POST  /circles} : Create a new circle.
     *
     * @param circle the circle to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new circle, or with status {@code 400 (Bad Request)} if the circle has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Circle> createCircle(@Valid @RequestBody Circle circle) throws URISyntaxException {
        LOG.debug("REST request to save Circle : {}", circle);
        if (circle.getId() != null) {
            throw new BadRequestAlertException("A new circle cannot already have an ID", ENTITY_NAME, "idexists");
        }
        circle = circleRepository.save(circle);
        return ResponseEntity.created(new URI("/api/circles/" + circle.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, circle.getId().toString()))
            .body(circle);
    }

    /**
     * {@code PUT  /circles/:id} : Updates an existing circle.
     *
     * @param id the id of the circle to save.
     * @param circle the circle to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated circle,
     * or with status {@code 400 (Bad Request)} if the circle is not valid,
     * or with status {@code 500 (Internal Server Error)} if the circle couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Circle> updateCircle(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Circle circle
    ) throws URISyntaxException {
        LOG.debug("REST request to update Circle : {}, {}", id, circle);
        if (circle.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, circle.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!circleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        circle = circleRepository.save(circle);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, circle.getId().toString()))
            .body(circle);
    }

    /**
     * {@code PATCH  /circles/:id} : Partial updates given fields of an existing circle, field will ignore if it is null
     *
     * @param id the id of the circle to save.
     * @param circle the circle to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated circle,
     * or with status {@code 400 (Bad Request)} if the circle is not valid,
     * or with status {@code 404 (Not Found)} if the circle is not found,
     * or with status {@code 500 (Internal Server Error)} if the circle couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Circle> partialUpdateCircle(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Circle circle
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update Circle partially : {}, {}", id, circle);
        if (circle.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, circle.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!circleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Circle> result = circleRepository
            .findById(circle.getId())
            .map(existingCircle -> {
                if (circle.getName() != null) {
                    existingCircle.setName(circle.getName());
                }
                if (circle.getMembers() != null) {
                    existingCircle.setMembers(circle.getMembers());
                }
                if (circle.getImpact() != null) {
                    existingCircle.setImpact(circle.getImpact());
                }
                if (circle.getFocus() != null) {
                    existingCircle.setFocus(circle.getFocus());
                }

                return existingCircle;
            })
            .map(circleRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, circle.getId().toString())
        );
    }

    /**
     * {@code GET  /circles} : get all the circles.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of circles in body.
     */
    @GetMapping("")
    public List<Circle> getAllCircles() {
        LOG.debug("REST request to get all Circles");
        return circleRepository.findAll();
    }

    /**
     * {@code GET  /circles/:id} : get the "id" circle.
     *
     * @param id the id of the circle to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the circle, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Circle> getCircle(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Circle : {}", id);
        Optional<Circle> circle = circleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(circle);
    }

    /**
     * {@code DELETE  /circles/:id} : delete the "id" circle.
     *
     * @param id the id of the circle to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCircle(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete Circle : {}", id);
        circleRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
