package com.ghfund.appdemo.service;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ghfund.appdemo.domain.Investment;
import com.ghfund.appdemo.repository.InvestmentRepository;

/**
 * Service Implementation for managing {@link com.ghfund.appdemo.domain.Investment}.
 */
@Service
@Transactional
public class InvestmentService {

    private static final Logger LOG = LoggerFactory.getLogger(InvestmentService.class);

    private final InvestmentRepository investmentRepository;

    public InvestmentService(InvestmentRepository investmentRepository) {
        this.investmentRepository = investmentRepository;
    }

    /**
     * Save a investment.
     *
     * @param investment the entity to save.
     * @return the persisted entity.
     */
    public Investment save(Investment investment) {
        LOG.debug("Request to save Investment : {}", investment);
        return investmentRepository.save(investment);
    }

    /**
     * Update a investment.
     *
     * @param investment the entity to save.
     * @return the persisted entity.
     */
    public Investment update(Investment investment) {
        LOG.debug("Request to update Investment : {}", investment);
        return investmentRepository.save(investment);
    }

    /**
     * Partially update a investment.
     *
     * @param investment the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Investment> partialUpdate(Investment investment) {
        LOG.debug("Request to partially update Investment : {}", investment);

        return investmentRepository
            .findById(investment.getId())
            .map(existingInvestment -> {
                if (investment.getAmount() != null) {
                    existingInvestment.setAmount(investment.getAmount());
                }
                if (investment.getDate() != null) {
                    existingInvestment.setDate(investment.getDate());
                }
                if (investment.getRoi() != null) {
                    existingInvestment.setRoi(investment.getRoi());
                }
                if (investment.getStatus() != null) {
                    existingInvestment.setStatus(investment.getStatus());
                }
                if (investment.getHash() != null) {
                    existingInvestment.setHash(investment.getHash());
                }

                return existingInvestment;
            })
            .map(investmentRepository::save);
    }

    /**
     * Get all the investments.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Investment> findAll(Pageable pageable) {
        LOG.debug("Request to get all Investments");
        return investmentRepository.findAll(pageable);
    }

    /**
     * Delete the investment by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        LOG.debug("Request to delete Investment : {}", id);
        investmentRepository.deleteById(id);
    }
}
