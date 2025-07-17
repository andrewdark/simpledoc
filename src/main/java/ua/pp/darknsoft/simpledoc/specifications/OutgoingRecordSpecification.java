package ua.pp.darknsoft.simpledoc.specifications;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.CollectionUtils;
import ua.pp.darknsoft.simpledoc.entities.RecordGroup;
import ua.pp.darknsoft.simpledoc.entities.records.OutgoingRecord;
import ua.pp.darknsoft.simpledoc.filters.RecordSearchFilter;

import java.util.ArrayList;
import java.util.List;

public class OutgoingRecordSpecification {

    public static Specification<OutgoingRecord> withFilter(RecordSearchFilter filter) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (!CollectionUtils.isEmpty(filter.getRecordIdSet())) {
                CriteriaBuilder.In<Long> inClause = cb.in(root.get("id"));
                filter.getRecordIdSet().forEach(inClause::value);
                predicates.add(inClause);
            }
            if (filter.getRegDateFrom() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("regDate"), filter.getRegDateFrom()));
            }

            if (filter.getRegDateTo() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("regDate"), filter.getRegDateTo()));
            }

            //RecordGroup RELATIONS BLOCK
            if (Boolean.TRUE.equals(filter.getWithRecordGroup())) {
                // Подгружаем связанные роли (fetch join)
                // Только если запрос — не count query поэтому != Long.class
                if (query.getResultType() != Long.class && query.getResultType() != long.class) {
                    root.fetch("recordGroup", JoinType.LEFT); // Или INNER, если обязательно наличие роли
                    query.distinct(true); // обязательно при fetch join в коллекции!
                }
            }
            if (filter.getRecordGroupName() != null && !filter.getRecordGroupName().isBlank()) {
                Join<Record, RecordGroup> groupJoin = root.join("recordGroup", JoinType.INNER);
                predicates.add(cb.equal(cb.lower(groupJoin.get("name")), filter.getRecordGroupName().toLowerCase()));
            }
            if (filter.getRecordGroupType() != null) {
                Join<Record, RecordGroup> groupJoin = root.join("recordGroup", JoinType.INNER);
                predicates.add(cb.equal(groupJoin.get("recordGroupType"), filter.getRecordGroupType()));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
