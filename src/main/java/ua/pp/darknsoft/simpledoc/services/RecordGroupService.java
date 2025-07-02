package ua.pp.darknsoft.simpledoc.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import ua.pp.darknsoft.simpledoc.dto.RecordGroupDTO;
import ua.pp.darknsoft.simpledoc.entities.RecordGroup;
import ua.pp.darknsoft.simpledoc.services.base.CRUDService;

import java.util.List;
import java.util.Optional;

public interface RecordGroupService extends CRUDService<RecordGroupDTO, Long> {
    Optional<RecordGroupDTO> getByIdWithChildren(Long id);

    Page<RecordGroupDTO> getRootItems(Pageable pageable);

    RecordGroupDTO addChildren(Long parentId, RecordGroupDTO childrenDTO);

    RecordGroup getReference(Long recordGroupId);
}
