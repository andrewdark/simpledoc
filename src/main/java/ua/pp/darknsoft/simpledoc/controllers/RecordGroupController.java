package ua.pp.darknsoft.simpledoc.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.pp.darknsoft.simpledoc.dto.RecordGroupDTO;
import ua.pp.darknsoft.simpledoc.services.RecordGroupService;

import java.util.Optional;

import static ua.pp.darknsoft.simpledoc.constants.ControllerConstants.RECORDGROUP;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = RECORDGROUP, produces = MediaType.APPLICATION_JSON_VALUE)
public class RecordGroupController {
    private final RecordGroupService recordGroupService;

    @GetMapping
    public ResponseEntity<Page<RecordGroupDTO>> getRootItems(
            @RequestParam(defaultValue = "0") int number,            // номер сторінки
            @RequestParam(defaultValue = "10") int size,           // розмір сторінки
            @RequestParam(defaultValue = "name") String sort,    // поле для сортування
            @RequestParam(defaultValue = "asc") String order     // напрямок: asc/desc
    ) {
        Pageable pageable = PageRequest.of(
                number,
                size,
                order.equalsIgnoreCase("asc") ? Sort.by(sort).ascending() : Sort.by(sort).descending()
        );

        Page<RecordGroupDTO> items = recordGroupService.findAll(pageable);
        return ResponseEntity.ok(items);
    }


    @GetMapping("/{id}")
    public ResponseEntity<RecordGroupDTO> getById(@PathVariable Long id) {
        Optional<RecordGroupDTO> dto = recordGroupService.getById(id);
        return dto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/{id}/children")
    public ResponseEntity<RecordGroupDTO> getByIdWithChildren(@PathVariable Long id) {
        Optional<RecordGroupDTO> dto = recordGroupService.getByIdWithChildren(id);
        return dto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }


    @PostMapping
    public ResponseEntity<RecordGroupDTO> addRoot(@RequestBody RecordGroupDTO dto) {
        dto.setParent(null);
        RecordGroupDTO recordGroupDTO = recordGroupService.add(dto);
        return ResponseEntity.ok(recordGroupDTO);
    }

    @PostMapping("/{id}/children")
    public ResponseEntity<RecordGroupDTO> addChildren(@PathVariable Long id, @RequestBody RecordGroupDTO dto) {
        RecordGroupDTO recordGroupDTO = recordGroupService.addChildren(id, dto);
        return ResponseEntity.ok(recordGroupDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecordGroupDTO> update(@PathVariable Long id, @RequestBody RecordGroupDTO request) {
        request.setId(id);
        recordGroupService.update(id, request);
        return ResponseEntity.ok(request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        recordGroupService.softDeleteById(id);
        return ResponseEntity.noContent().build();
    }
}
