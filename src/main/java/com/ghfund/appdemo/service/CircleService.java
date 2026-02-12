package com.ghfund.appdemo.service;

import com.ghfund.appdemo.domain.Circle;
import com.ghfund.appdemo.repository.CircleRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.ghfund.appdemo.domain.Circle}.
 */
@Service
@Transactional
public class CircleService {

    private static final Logger LOG = LoggerFactory.getLogger(CircleService.class);

    private final CircleRepository circleRepository;

    public CircleService(CircleRepository circleRepository) {
        this.circleRepository = circleRepository;
    }

    /**
     * Save a circle.
     *
     * @param circle the entity to save.
     * @return the persisted entity.
     */
    public Circle save(Circle circle) {
        LOG.debug("Request to save Circle : {}", circle);
        return circleRepository.save(circle);
    }

    /**
     * Update a circle.
     *
     * @param circle the entity to save.
     * @return the persisted entity.
     */
    public Circle update(Circle circle) {
        LOG.debug("Request to update Circle : {}", circle);
        return circleRepository.save(circle);
    }

    /**
     * Partially update a circle.
     *
     * @param circle the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Circle> partialUpdate(Circle circle) {
        LOG.debug("Request to partially update Circle : {}", circle);

        return circleRepository
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
    }

    /**
     * Get all the circles.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Circle> findAll(Pageable pageable) {
        LOG.debug("Request to get all Circles");
        return circleRepository.findAll(pageable);
    }

    /**
     * Get one circle by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Circle> findOne(Long id) {
        LOG.debug("Request to get Circle : {}", id);
        return circleRepository.findById(id);
    }

    /**
     * Delete the circle by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        LOG.debug("Request to delete Circle : {}", id);
        circleRepository.deleteById(id);
    }
}
