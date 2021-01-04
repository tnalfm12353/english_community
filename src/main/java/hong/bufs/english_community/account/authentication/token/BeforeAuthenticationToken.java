package hong.bufs.english_community.account.authentication.token;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import hong.bufs.english_community.account.form.LoginForm;

public class BeforeAuthenticationToken extends UsernamePasswordAuthenticationToken{

    private static final long serialVersionUID = 1L;

    private BeforeAuthenticationToken(Object principal, Object credentials) {
        super(principal, credentials);
    }

    public BeforeAuthenticationToken(LoginForm loginForm){
        this(loginForm.getUsername(),loginForm.getPassword());
    }
}
