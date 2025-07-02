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
import ua.pp.darknsoft.simpledoc.dto.RubricDTO;
import ua.pp.darknsoft.simpledoc.services.RubricService;

import java.util.Optional;

import static ua.pp.darknsoft.simpledoc.constants.ControllerConstants.RUBRIC;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = RUBRIC, produces = MediaType.APPLICATION_JSON_VALUE)
public class RubricController {
    private final RubricService rubricService;

    @GetMapping()
    public ResponseEntity<Page<RubricDTO>> getAllItems(
            @RequestParam(defaultValue = "0") int page,            // номер сторінки
            @RequestParam(defaultValue = "10") int size,           // розмір сторінки
            @RequestParam(defaultValue = "id") String sort,    // поле для сортування
            @RequestParam(defaultValue = "asc") String order     // напрямок: asc/desc
    ) {
        Pageable pageable = PageRequest.of(
                page,
                size,
                order.equalsIgnoreCase("asc") ? Sort.by(sort).ascending() : Sort.by(sort).descending()
        );

        Page<RubricDTO> items = rubricService.findAll(pageable);
        return ResponseEntity.ok(items);
    }


    @GetMapping("/{id}")
    public ResponseEntity<RubricDTO> getById(@PathVariable Long id) {
        Optional<RubricDTO> dto = rubricService.getById(id);
        return dto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<RubricDTO> create(@RequestBody RubricDTO request) {

        RubricDTO dto = rubricService.add(request);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RubricDTO> update(@PathVariable Long id, @RequestBody RubricDTO request) {
        request.setId(id);
        rubricService.update(id, request);
        return ResponseEntity.ok(request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        rubricService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
