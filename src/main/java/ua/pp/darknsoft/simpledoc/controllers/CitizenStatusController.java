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
import ua.pp.darknsoft.simpledoc.dto.CitizenStatusDTO;
import ua.pp.darknsoft.simpledoc.services.CitizenStatusService;

import java.util.Optional;

import static ua.pp.darknsoft.simpledoc.constants.ControllerConstants.CITIZEN_STATUS;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = CITIZEN_STATUS, produces = MediaType.APPLICATION_JSON_VALUE)
public class CitizenStatusController {
    private final CitizenStatusService citizenStatusService;

    @GetMapping()
    public ResponseEntity<Page<CitizenStatusDTO>> getAllItems(
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

        Page<CitizenStatusDTO> items = citizenStatusService.findAll(pageable);
        return ResponseEntity.ok(items);
    }


    @GetMapping("/{id}")
    public ResponseEntity<CitizenStatusDTO> getById(@PathVariable Long id) {
        Optional<CitizenStatusDTO> dto = citizenStatusService.getById(id);
        return dto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<CitizenStatusDTO> create(@RequestBody CitizenStatusDTO request) {

        CitizenStatusDTO dto = citizenStatusService.add(request);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CitizenStatusDTO> update(@PathVariable Long id, @RequestBody CitizenStatusDTO request) {
        request.setId(id);
        citizenStatusService.update(id, request);
        return ResponseEntity.ok(request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        citizenStatusService.softDeleteById(id);
        return ResponseEntity.noContent().build();
    }
}
