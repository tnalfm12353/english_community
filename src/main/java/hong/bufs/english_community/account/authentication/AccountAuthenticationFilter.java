package hong.bufs.english_community.account.authentication;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import hong.bufs.english_community.account.authentication.failtureHandlers.AccountAuthenticationFailureHandler;
import hong.bufs.english_community.account.authentication.successHandlers.AccountAuthenticationSuccessHandler;
import hong.bufs.english_community.account.authentication.token.BeforeAuthenticationToken;
import hong.bufs.english_community.account.form.LoginForm;


public class AccountAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

    private AccountAuthenticationSuccessHandler accountAuthenticationSuccessHandler;
    private AccountAuthenticationFailureHandler accountAuthenticationFailureHandler;

    public AccountAuthenticationFilter(String defaultUrl, AccountAuthenticationSuccessHandler successHandler, AccountAuthenticationFailureHandler failureHandler){
        super(defaultUrl);

        this.accountAuthenticationSuccessHandler = successHandler;
        this.accountAuthenticationFailureHandler = failureHandler;

    }

    protected AccountAuthenticationFilter(String defaultFilterProcessesUrl) {
        super(defaultFilterProcessesUrl);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException, IOException, ServletException {
        LoginForm loginForm = new ObjectMapper().readValue(request.getReader(), LoginForm.class);

        BeforeAuthenticationToken token = new BeforeAuthenticationToken(loginForm);
    
        return super.getAuthenticationManager().authenticate(token);
    }


    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
            Authentication authResult) throws IOException, ServletException {
        this.accountAuthenticationSuccessHandler.onAuthenticationSuccess(request, response, authResult);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException failed) throws IOException, ServletException {
        this.accountAuthenticationFailureHandler.onAuthenticationFailure(request, response, failed);
    }

    
}
