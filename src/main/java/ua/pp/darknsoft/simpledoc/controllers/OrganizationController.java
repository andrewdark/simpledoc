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
import ua.pp.darknsoft.simpledoc.dto.OrganizationDTO;
import ua.pp.darknsoft.simpledoc.services.OrganizationService;

import java.util.Optional;

import static ua.pp.darknsoft.simpledoc.constants.ControllerConstants.ORGANIZATION;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = ORGANIZATION, produces = MediaType.APPLICATION_JSON_VALUE)
public class OrganizationController {

    private final OrganizationService organizationService;

    @GetMapping()
    public ResponseEntity<Page<OrganizationDTO>> getAllItems(
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

        Page<OrganizationDTO> items = organizationService.findAll(pageable);
        return ResponseEntity.ok(items);
    }
    @GetMapping("/search")
    public ResponseEntity<Page<OrganizationDTO>> getAllItemsByName(
            @RequestParam(defaultValue = "name") String name,
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

        Page<OrganizationDTO> items = organizationService.getAllByNameLike(name,pageable);
        return ResponseEntity.ok(items);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrganizationDTO> getById(@PathVariable Long id) {
        Optional<OrganizationDTO> dto = organizationService.getById(id);
        return dto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<OrganizationDTO> create(@RequestBody OrganizationDTO request) {
        OrganizationDTO dto = organizationService.add(request);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrganizationDTO> update(@PathVariable Long id, @RequestBody OrganizationDTO request) {
        request.setId(id);
        organizationService.update(id, request);
        return ResponseEntity.ok(request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        organizationService.softDeleteById(id);
        return ResponseEntity.noContent().build();
    }
}
