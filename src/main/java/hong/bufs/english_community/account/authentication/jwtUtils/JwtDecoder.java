package hong.bufs.english_community.account.authentication.jwtUtils;

import java.util.Base64;
import java.util.Optional;

import javax.annotation.PostConstruct;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import hong.bufs.english_community.account.AccountContext;
import hong.bufs.english_community.account.authentication.failtureHandlers.InvalidJwtException;

@Component
public class JwtDecoder {
    
    private static final Logger log = LoggerFactory.getLogger(JwtDecoder.class);
    
    @Value("spring.jwt.secret")
    private String secretKey;

    @PostConstruct
    protected void init(){
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public AccountContext decodeJwt(String token){
        DecodedJWT decodedJWT = isValidToken(token).orElseThrow(()-> new InvalidJwtException("유효한 토큰이 아닙니다."));

        String userName = decodedJWT.getClaim("userName").asString();
        String role = decodedJWT.getClaim("userRole").asString();

        return new AccountContext(userName,"1234",role);
    }

    private Optional<DecodedJWT> isValidToken(String token){
        DecodedJWT jwt = null;
        try {
            Algorithm algorithm = Algorithm.HMAC256(secretKey);
            JWTVerifier verifier = JWT.require(algorithm).build();

            jwt = verifier.verify(token);

        } catch (Exception e) {
            log.error(e.getMessage());
        }

        return Optional.ofNullable(jwt);
    }
}
