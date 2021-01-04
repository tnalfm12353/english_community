package hong.bufs.english_community.account.authentication.token;

import java.util.Collection;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import hong.bufs.english_community.account.AccountContext;



public class AuthenticatedUserToken extends UsernamePasswordAuthenticationToken {

    private static final long serialVersionUID = 1L;

    private AuthenticatedUserToken(Object principal, Object credentials,
            Collection<? extends GrantedAuthority> authorities) {
        super(principal, credentials, authorities);
    }
    public AccountContext getUserAccount(){
        return (AccountContext)super.getPrincipal();
    }

    public static AuthenticatedUserToken getTokenFromUserAccount(AccountContext userAccount){
        return new AuthenticatedUserToken(userAccount, userAccount.getPassword(), userAccount.getAuthorities());
    }

    
}
