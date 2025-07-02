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
import ua.pp.darknsoft.simpledoc.dto.DeliveryDTO;
import ua.pp.darknsoft.simpledoc.services.DeliveryService;

import java.util.Optional;

import static ua.pp.darknsoft.simpledoc.constants.ControllerConstants.DELIVERY;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = DELIVERY, produces = MediaType.APPLICATION_JSON_VALUE)
public class DeliveryController {
    private final DeliveryService deliveryService;

    @GetMapping()
    public ResponseEntity<Page<DeliveryDTO>> getAllItems(
            @RequestParam(defaultValue = "0") int number,       // номер сторінки
            @RequestParam(defaultValue = "10") int size,        // розмір сторінки
            @RequestParam(defaultValue = "id") String sort,     // поле для сортування
            @RequestParam(defaultValue = "asc") String order    // напрямок: asc/desc
    ) {
        Pageable pageable = PageRequest.of(
                number,
                size,
                order.equalsIgnoreCase("asc") ? Sort.by(sort).ascending() : Sort.by(sort).descending()
        );

        Page<DeliveryDTO> items = deliveryService.findAll(pageable);
        return ResponseEntity.ok(items);
    }


    @GetMapping("/{id}")
    public ResponseEntity<DeliveryDTO> getById(@PathVariable Long id) {
        Optional<DeliveryDTO> dto = deliveryService.getById(id);
        return dto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<DeliveryDTO> create(@RequestBody DeliveryDTO request) {

        DeliveryDTO dto = deliveryService.add(request);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DeliveryDTO> update(@PathVariable Long id, @RequestBody DeliveryDTO request) {
        request.setId(id);
        deliveryService.update(id, request);
        return ResponseEntity.ok(request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        deliveryService.softDeleteById(id);
        return ResponseEntity.noContent().build();
    }
}
