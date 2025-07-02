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
import ua.pp.darknsoft.simpledoc.dto.CitizenCategoryDTO;
import ua.pp.darknsoft.simpledoc.services.CitizenCategoryService;

import java.util.Optional;

import static ua.pp.darknsoft.simpledoc.constants.ControllerConstants.CITIZEN_CATEGORY;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = CITIZEN_CATEGORY, produces = MediaType.APPLICATION_JSON_VALUE)
public class CitizenCategoryController {
    private final CitizenCategoryService citizenCategoryService;

    @GetMapping()
    public ResponseEntity<Page<CitizenCategoryDTO>> getAllItems(
            @RequestParam(defaultValue = "0") int page,         // номер сторінки
            @RequestParam(defaultValue = "10") int size,        // розмір сторінки
            @RequestParam(defaultValue = "id") String sort,     // поле для сортування
            @RequestParam(defaultValue = "asc") String order    // напрямок: asc/desc
    ) {
        Pageable pageable = PageRequest.of(
                page,
                size,
                order.equalsIgnoreCase("asc") ? Sort.by(sort).ascending() : Sort.by(sort).descending()
        );

        Page<CitizenCategoryDTO> items = citizenCategoryService.findAll(pageable);
        return ResponseEntity.ok(items);
    }


    @GetMapping("/{id}")
    public ResponseEntity<CitizenCategoryDTO> getById(@PathVariable Long id) {
        Optional<CitizenCategoryDTO> dto = citizenCategoryService.getById(id);
        return dto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<CitizenCategoryDTO> create(@RequestBody CitizenCategoryDTO request) {
        CitizenCategoryDTO dto = citizenCategoryService.add(request);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CitizenCategoryDTO> update(@PathVariable Long id, @RequestBody CitizenCategoryDTO request) {
        request.setId(id);
        citizenCategoryService.update(id, request);
        return ResponseEntity.ok(request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        citizenCategoryService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
