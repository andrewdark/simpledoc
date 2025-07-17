package ua.pp.darknsoft.simpledoc.filters;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import ua.pp.darknsoft.simpledoc.entities.enums.RecordGroupType;

import java.time.LocalDate;
import java.util.Set;

@Builder
@Getter
@Setter
public class RecordSearchFilter{
    private RecordGroupType recordGroupType;
    private Set<Long> recordIdSet;
    private LocalDate regDateFrom;
    private LocalDate regDateTo;
    private String  recordGroupName;
    private Long orderNum;
    private String regNum;

    private Boolean withRecordGroup;


}
