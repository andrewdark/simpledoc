package ua.pp.darknsoft.simpledoc.utils.jwt;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${app.jwt.jwtAccessSecret}")
    private String jwtAccessSecret;

    @Value("${app.jwt.jwtAccessExpirationMs}")
    private long jwtAccessExpirationMs;

    @Value("${app.jwt.jwtRefreshSecret}")
    private String jwtRefreshSecret;

    @Value("${app.jwt.jwtRefreshExpirationMs}")
    private long jwtRefreshExpirationMs;

    //JWT PUBLIC SECTION

    //TODO: change userName to Authentication authentication
    public String generateJwtAccessToken(String userName) {
        //UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
        return generateJwtToken(userName, jwtAccessSecret, jwtAccessExpirationMs);
    }

    //TODO: change userName to Authentication authentication
    public String generateJwtRefreshToken(String userName) {
        //UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
        return generateJwtToken(userName, jwtRefreshSecret, jwtRefreshExpirationMs);
    }

    public String getUserNameFromJwtAccessToken(String token) {
        return  getUserNameFromJwtToken(token, jwtAccessSecret);
    }

    public String getUserNameFromJwtRefreshToken(String token) {
        return  getUserNameFromJwtToken(token, jwtRefreshSecret);
    }

    public boolean validateJwtAccessToken(String authToken) {
        return validateJwtToken(authToken, jwtAccessSecret);
    }

    public boolean validateJwtRefreshToken(String authToken) {
        return validateJwtToken(authToken, jwtRefreshSecret);
    }

    //JWT PRIVATE SECTION
    private String generateJwtToken(String userName, String jwtSecret, long jwtExpirationMs) {

        return Jwts.builder()
                .subject(userName)
                .issuedAt(new Date())
                .expiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(getSigningKey(jwtSecret))
                .compact();

    }

    private SecretKey getSigningKey(String jwtSecret) {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private String getUserNameFromJwtToken(String token, String jwtSecret) {
        return Jwts.parser().verifyWith(getSigningKey(jwtSecret)).build().parseSignedClaims(token).getPayload().getSubject();

    }

    private boolean validateJwtToken(String authToken, String jwtSecret) {
        try {
            Jwts.parser().verifyWith(getSigningKey(jwtSecret)).build().parseSignedClaims(authToken);
            return true;
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }

        return false;
    }
}
