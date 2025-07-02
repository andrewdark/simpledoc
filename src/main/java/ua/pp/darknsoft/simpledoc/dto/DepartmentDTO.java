package ua.pp.darknsoft.simpledoc.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import ua.pp.darknsoft.simpledoc.entities.security.AppUser;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
@Setter
public class DepartmentDTO {
    private Long id;
    private String name;
    private String position;
    private Boolean official;
    private Boolean deleted;
    private List<DepartmentDTO> children;
    private AppUserDTO appUserDTO;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
