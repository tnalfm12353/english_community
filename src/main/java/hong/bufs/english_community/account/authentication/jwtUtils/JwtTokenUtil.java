package hong.bufs.english_community.account.authentication.jwtUtils;

import java.io.UnsupportedEncodingException;
import java.util.Base64;

import javax.annotation.PostConstruct;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import hong.bufs.english_community.account.AccountContext;

@Component
public class JwtTokenUtil{

    private static final Logger log =LoggerFactory.getLogger(JwtTokenUtil.class);

    @Value("spring.jwt.secret")
    private String secretKey;

    @PostConstruct
    protected void init(){
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String generateToken(AccountContext account){
        String token = null;    
        try {
            token = JWT.create()
                        .withClaim("userName", account.getAccount().getUsername())
                        .withClaim("userRole", account.getAccount().getPosition().getPositionType())
                        .sign(generateAlgorithm());

        } catch (Exception e) {
            //TODO: handle exception
            log.error(e.getMessage());
        }

        return token;
    }

    private Algorithm generateAlgorithm() throws UnsupportedEncodingException{
        return Algorithm.HMAC256(secretKey);
    }
}