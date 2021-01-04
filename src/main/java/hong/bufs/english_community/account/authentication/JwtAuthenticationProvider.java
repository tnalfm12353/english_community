package hong.bufs.english_community.account.authentication;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import hong.bufs.english_community.account.AccountContext;
import hong.bufs.english_community.account.authentication.jwtUtils.JwtDecoder;
import hong.bufs.english_community.account.authentication.token.AuthenticatedUserToken;
import hong.bufs.english_community.account.authentication.token.JwtBeforeProcessingToken;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationProvider implements AuthenticationProvider {

    private final JwtDecoder jwtDecoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String token = (String)authentication.getPrincipal();

        AccountContext userAccount = jwtDecoder.decodeJwt(token);

        return AuthenticatedUserToken.getTokenFromUserAccount(userAccount);
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return JwtBeforeProcessingToken.class.isAssignableFrom(authentication);
    }
    
}