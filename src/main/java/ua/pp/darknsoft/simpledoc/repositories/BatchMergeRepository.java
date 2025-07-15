package ua.pp.darknsoft.simpledoc.repositories;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.util.ArrayList;
import java.util.List;

public interface BatchMergeRepository<T> {

    @PersistenceContext
    EntityManager getEntityManager(); // Обязательно нужен EntityManager

    default List<T> batchMerge(List<T> detachedEntities, int batchSize) {
        EntityManager em = getEntityManager();
        List<T> mergedList = new ArrayList<>(detachedEntities.size());

        for (int i = 0; i < detachedEntities.size(); i++) {
            T merged = em.merge(detachedEntities.get(i));
            mergedList.add(merged);

            if (i > 0 && i % batchSize == 0) {
                em.flush();
                em.clear();
            }
        }

        em.flush();
        em.clear();

        return mergedList;
    }
}

