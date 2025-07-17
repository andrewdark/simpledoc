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
import ua.pp.darknsoft.simpledoc.dto.DepartmentDTO;
import ua.pp.darknsoft.simpledoc.services.DepartmentService;

import java.util.Optional;

import static ua.pp.darknsoft.simpledoc.constants.ControllerConstants.DEPARTMENT;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = DEPARTMENT, produces = MediaType.APPLICATION_JSON_VALUE)
public class DepartmentController {
    private final DepartmentService departmentService;

    @GetMapping()
    public ResponseEntity<Page<DepartmentDTO>> getAllItems(
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

        Page<DepartmentDTO> items = departmentService.findAll(pageable);
        return ResponseEntity.ok(items);
    }


    @GetMapping("/{id}")
    public ResponseEntity<DepartmentDTO> getById(@PathVariable Long id) {
        Optional<DepartmentDTO> dto = departmentService.getById(id);
        return dto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/{id}/children")
    public ResponseEntity<DepartmentDTO> getByIdWithChildren(@PathVariable Long id) {
        Optional<DepartmentDTO> dto = departmentService.getByIdWithChildren(id);
        return dto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<DepartmentDTO> addRoot(@RequestBody DepartmentDTO dto) {
        dto.setParent(null);
        DepartmentDTO departmentDTO = departmentService.add(dto);
        return ResponseEntity.ok(departmentDTO);
    }
    @PostMapping("/{id}/children")
    public ResponseEntity<DepartmentDTO> addChildren(@PathVariable Long id, @RequestBody DepartmentDTO dto) {
        DepartmentDTO departmentDTO = departmentService.addChildren(id, dto);
        return ResponseEntity.ok(departmentDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DepartmentDTO> update(@PathVariable Long id, @RequestBody DepartmentDTO request) {
        request.setId(id);
        departmentService.update(id, request);
        return ResponseEntity.ok(request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        departmentService.softDeleteById(id);
        return ResponseEntity.noContent().build();
    }
}
