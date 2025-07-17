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
import ua.pp.darknsoft.simpledoc.dto.ResolutionDTO;
import ua.pp.darknsoft.simpledoc.services.ResolutionService;

import java.util.Optional;

import static ua.pp.darknsoft.simpledoc.constants.ControllerConstants.RESOLUTION;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = RESOLUTION, produces = MediaType.APPLICATION_JSON_VALUE)
public class ResolutionController {

    private final ResolutionService resolutionService;

    @GetMapping
    public ResponseEntity<Page<ResolutionDTO>> getAllItems(
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

        Page<ResolutionDTO> items = resolutionService.findAll(pageable);
        return ResponseEntity.ok(items);
    }


    @GetMapping("/{id}")
    public ResponseEntity<ResolutionDTO> getById(@PathVariable Long id) {
        Optional<ResolutionDTO> dto = resolutionService.getById(id);
        return dto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<ResolutionDTO> create(@RequestBody ResolutionDTO request) {
        ResolutionDTO dto = resolutionService.add(request);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResolutionDTO> update(@PathVariable Long id, @RequestBody ResolutionDTO request) {
        request.setId(id);
        resolutionService.update(id, request);
        return ResponseEntity.ok(request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        resolutionService.softDeleteById(id);
        return ResponseEntity.noContent().build();
    }
}
