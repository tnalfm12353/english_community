package hong.bufs.english_community.account.authentication;

import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import hong.bufs.english_community.domain.Account;
import hong.bufs.english_community.account.AccountRepository;
import hong.bufs.english_community.account.AccountContext;
import hong.bufs.english_community.account.authentication.token.AuthenticatedUserToken;
import hong.bufs.english_community.account.authentication.token.BeforeAuthenticationToken;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AccountAuthenticationProvider implements AuthenticationProvider {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        BeforeAuthenticationToken token = (BeforeAuthenticationToken) authentication;

        String username = (String)token.getPrincipal();
        String password = (String)token.getCredentials();

        
        Account account = accountRepository.findByUsername(username);
        if(account == null){
            throw new InternalAuthenticationServiceException("아이디가 유효하지 않습니다.");
        }

        if(!CheckedPassword(account,password)){
            throw new AuthenticationCredentialsNotFoundException("인증 정보가 정확하지 않습니다.");
        }
        
        return AuthenticatedUserToken.getTokenFromUserAccount(AccountContext.fromAccountEntity(account));
    }

    private boolean CheckedPassword(Account account, String password) {
        return passwordEncoder.matches(password, account.getPassword());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return BeforeAuthenticationToken.class.isAssignableFrom(authentication);
    }
    
}
