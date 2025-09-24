package ua.pp.darknsoft.simpledoc.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import ua.pp.darknsoft.simpledoc.dto.CitizenDTO;
import ua.pp.darknsoft.simpledoc.services.CitizenService;

import java.util.Optional;

import static ua.pp.darknsoft.simpledoc.constants.ControllerConstants.CITIZEN;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = CITIZEN, produces = MediaType.APPLICATION_JSON_VALUE)
public class CitizenController {
    private final CitizenService citizenService;

    @GetMapping
    public ResponseEntity<Page<CitizenDTO>> getAllItems(
            @RequestParam(defaultValue = "0") int number,         // номер сторінки
            @RequestParam(defaultValue = "10") int size,        // розмір сторінки
            @RequestParam(defaultValue = "id") String sort,     // поле для сортування
            @RequestParam(defaultValue = "asc") String order    // напрямок: asc/desc
    ) {
        Pageable pageable = PageRequest.of(
                number,
                size,
                order.equalsIgnoreCase("asc") ? Sort.by(sort).ascending() : Sort.by(sort).descending()
        );

        Page<CitizenDTO> items = citizenService.findAll(pageable);
        return ResponseEntity.ok(items);
    }


    @GetMapping("/{id}")
    public ResponseEntity<CitizenDTO> getById(@PathVariable Long id) {
        Optional<CitizenDTO> dto = citizenService.getById(id);
        return dto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/search")
    public ResponseEntity<Page<CitizenDTO>> findByName(@RequestParam String fullName,
                                                       @RequestParam(defaultValue = "0") int number,         // номер сторінки
                                                       @RequestParam(defaultValue = "10") int size,        // розмір сторінки
                                                       @RequestParam(defaultValue = "fullName") String sort,     // поле для сортування
                                                       @RequestParam(defaultValue = "asc") String order) {    // напрямок: asc/desc) {

        if (StringUtils.hasLength(fullName) && fullName.length() > 1) {
            Pageable pageable = PageRequest.of(
                    number,
                    size,
                    order.equalsIgnoreCase("asc") ? Sort.by(sort).ascending() : Sort.by(sort).descending()
            );
            Page<CitizenDTO> items = citizenService.getAllByFullNameLike(fullName, pageable);

            return ResponseEntity.ok(items);
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping
    public ResponseEntity<CitizenDTO> create(@RequestBody CitizenDTO request) {

        CitizenDTO dto = citizenService.add(request);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CitizenDTO> update(@PathVariable Long id, @RequestBody CitizenDTO request) {
        request.setId(id);
        citizenService.update(id, request);
        return ResponseEntity.ok(request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        citizenService.softDeleteById(id);
        return ResponseEntity.noContent().build();
    }
}
