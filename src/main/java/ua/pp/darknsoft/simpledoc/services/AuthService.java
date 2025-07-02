package ua.pp.darknsoft.simpledoc.services;


import ua.pp.darknsoft.simpledoc.dto.AuthenticationRequestDTO;
import ua.pp.darknsoft.simpledoc.dto.AuthenticationResponseDTO;
import ua.pp.darknsoft.simpledoc.dto.RegistrationRequestDTO;

public interface AuthService {
    AuthenticationResponseDTO registration(RegistrationRequestDTO responseDTO);
    AuthenticationResponseDTO authenticateUser(AuthenticationRequestDTO authenticationRequestDTO);
    void logout(String refreshToken);
    AuthenticationResponseDTO refresh(String refreshToken);
}
