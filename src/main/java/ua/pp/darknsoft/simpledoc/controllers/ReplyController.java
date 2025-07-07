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
import ua.pp.darknsoft.simpledoc.dto.ReplyDTO;
import ua.pp.darknsoft.simpledoc.services.ReplyService;

import java.util.Optional;

import static ua.pp.darknsoft.simpledoc.constants.ControllerConstants.REPLY;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = REPLY, produces = MediaType.APPLICATION_JSON_VALUE)
public class ReplyController {
    private final ReplyService replyService;

    @GetMapping()
    public ResponseEntity<Page<ReplyDTO>> getAllItems(
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

        Page<ReplyDTO> items = replyService.findAll(pageable);
        return ResponseEntity.ok(items);
    }


    @GetMapping("/{id}")
    public ResponseEntity<ReplyDTO> getById(@PathVariable Long id) {
        Optional<ReplyDTO> dto = replyService.getById(id);
        return dto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<ReplyDTO> create(@RequestBody ReplyDTO request) {

        ReplyDTO dto = replyService.add(request);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReplyDTO> update(@PathVariable Long id, @RequestBody ReplyDTO request) {
        request.setId(id);
        replyService.update(id, request);
        return ResponseEntity.ok(request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        replyService.softDeleteById(id);
        return ResponseEntity.noContent().build();
    }
}
