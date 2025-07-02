package ua.pp.darknsoft.simpledoc.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
public class AppUserDTO {
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private Boolean enabled;
    private List<String> roleList = new ArrayList<>();
}
