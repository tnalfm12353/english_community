package hong.bufs.english_community.account.authentication.token;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

public class JwtBeforeProcessingToken extends UsernamePasswordAuthenticationToken{

    private static final long serialVersionUID = 1L;

	private JwtBeforeProcessingToken(Object principal, Object credentials) {
		super(principal, credentials);
    }
    
    public JwtBeforeProcessingToken(String token){
        this(token, token.length());
    }

}