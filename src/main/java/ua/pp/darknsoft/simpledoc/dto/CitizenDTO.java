package ua.pp.darknsoft.simpledoc.dto;

import jakarta.persistence.Column;
import lombok.*;
import ua.pp.darknsoft.simpledoc.entities.CitizenCategory;
import ua.pp.darknsoft.simpledoc.entities.CitizenStatus;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CitizenDTO {
    private Long id;
    private String fullName;
    private String address;
    private Boolean deleted;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private List<CitizenStatusDTO> status;
    private List<CitizenCategoryDTO> category;
}
