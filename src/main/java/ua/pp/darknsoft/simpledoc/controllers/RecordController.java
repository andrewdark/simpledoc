package ua.pp.darknsoft.simpledoc.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ua.pp.darknsoft.simpledoc.dto.RecordDTO;
import ua.pp.darknsoft.simpledoc.entities.enums.RecordGroupType;
import ua.pp.darknsoft.simpledoc.filters.RecordSearchFilter;
import ua.pp.darknsoft.simpledoc.services.RecordService;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static ua.pp.darknsoft.simpledoc.constants.ControllerConstants.RECORD;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = RECORD, produces = MediaType.APPLICATION_JSON_VALUE)
public class RecordController {

    private final RecordService recordService;

    @GetMapping()
    public ResponseEntity<Page<RecordDTO>> getAllItems(
            @RequestParam(defaultValue = "node") String type,
            @RequestParam(defaultValue = "0") int number,            // номер сторінки
            @RequestParam(defaultValue = "10") int size,           // розмір сторінки
            @RequestParam(defaultValue = "id") String sort,    // поле для сортування
            @RequestParam(defaultValue = "asc") String order     // напрямок: asc/desc
    ) {
        Pageable pageable = PageRequest.of(
                number,
                size,
                order.equalsIgnoreCase("asc") ? Sort.by(sort).ascending() : Sort.by(sort).descending()
        );

        Page<RecordDTO> items = recordService.getAllByRecordGroupType(pageable, RecordGroupType.valueOf(type.toUpperCase()));
        return ResponseEntity.ok(items);
    }


    @GetMapping("/{id}")
    public ResponseEntity<RecordDTO> getById(@PathVariable Long id) {
        Optional<RecordDTO> dto = recordService.getById(id);
        return dto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping("/search") //search?page=0&size=5&sort=id,desc
    public Page<RecordDTO> search(
            @RequestBody RecordSearchFilter filter,
            @RequestParam(defaultValue = "0") int number,            // номер сторінки
            @RequestParam(defaultValue = "10") int size,           // розмір сторінки
            @RequestParam(defaultValue = "id") String sort,    // поле для сортування
            @RequestParam(defaultValue = "asc") String order
    ) {
        Pageable pageable = PageRequest.of(
                number,
                size,
                order.equalsIgnoreCase("asc") ? Sort.by(sort).ascending() : Sort.by(sort).descending()
        );
        return recordService.searchRecords(filter, pageable);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<RecordDTO> create(@RequestPart("data") RecordDTO request,
                                            @RequestPart(value = "fileList", required = false) List<MultipartFile> fileList) {
        if (Objects.isNull(request.getRecordGroup())) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        if (Objects.isNull(request.getRecordGroup().getRecordGroupType()))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        if (RecordGroupType.NODE == request.getRecordGroup().getRecordGroupType())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        if(CollectionUtils.isEmpty(fileList)){
            RecordDTO saved = recordService.add(request);
            return ResponseEntity.ok(saved);
        }

        RecordDTO saved = recordService.add(request, fileList);
        return ResponseEntity.ok(saved);

    }

    @PutMapping("/{id}")
    public ResponseEntity<RecordDTO> update(@PathVariable Long id, @RequestBody RecordDTO request) {
        request.setId(id);
        recordService.update(id, request);
        return ResponseEntity.ok(request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        recordService.softDeleteById(id);
        return ResponseEntity.noContent().build();
    }
}
