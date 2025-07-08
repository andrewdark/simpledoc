package ua.pp.darknsoft.simpledoc.dto;

import lombok.*;
import ua.pp.darknsoft.simpledoc.entities.security.AppUser;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DepartmentDTO {
    private Long id;
    private String name;
    private String position;
    private Boolean official;
    private Boolean deleted;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private DepartmentDTO parent;
    private List<DepartmentDTO> children;
    private AppUserDTO appUserDTO;
}
