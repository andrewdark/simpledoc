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
import ua.pp.darknsoft.simpledoc.dto.ResolutionCategoryDTO;
import ua.pp.darknsoft.simpledoc.services.ResolutionCategoryService;

import java.util.Optional;

import static ua.pp.darknsoft.simpledoc.constants.ControllerConstants.RESOLUTION_CATEGORY;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = RESOLUTION_CATEGORY, produces = MediaType.APPLICATION_JSON_VALUE)
public class ResolutionCategoryController {

    private final ResolutionCategoryService resolutionCategoryService;

    @GetMapping()
    public ResponseEntity<Page<ResolutionCategoryDTO>> getAllItems(
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

        Page<ResolutionCategoryDTO> items = resolutionCategoryService.findAll(pageable);
        return ResponseEntity.ok(items);
    }


    @GetMapping("/{id}")
    public ResponseEntity<ResolutionCategoryDTO> getById(@PathVariable Long id) {
        Optional<ResolutionCategoryDTO> dto = resolutionCategoryService.getById(id);
        return dto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<ResolutionCategoryDTO> create(@RequestBody ResolutionCategoryDTO request) {
        ResolutionCategoryDTO dto = resolutionCategoryService.add(request);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResolutionCategoryDTO> update(@PathVariable Long id, @RequestBody ResolutionCategoryDTO request) {
        request.setId(id);
        resolutionCategoryService.update(id, request);
        return ResponseEntity.ok(request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        resolutionCategoryService.softDeleteById(id);
        return ResponseEntity.noContent().build();
    }
}
