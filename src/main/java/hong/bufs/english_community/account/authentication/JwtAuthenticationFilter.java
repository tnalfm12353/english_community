package hong.bufs.english_community.account.authentication;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.RequestMatcher;

import hong.bufs.english_community.account.authentication.failtureHandlers.JwtAuthenticationFailureHandler;
import hong.bufs.english_community.account.authentication.jwtUtils.HeaderTokenExtractor;
import hong.bufs.english_community.account.authentication.token.JwtBeforeProcessingToken;



public class JwtAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    private JwtAuthenticationFailureHandler jwtAuthenticationFailureHandler;
    private HeaderTokenExtractor headerTokenExtractor;

    protected JwtAuthenticationFilter(RequestMatcher requiresAuthenticationRequestMatcher) {
        super(requiresAuthenticationRequestMatcher);
    }

    public JwtAuthenticationFilter(RequestMatcher requestMatcher, HeaderTokenExtractor headerTokenExtractor, JwtAuthenticationFailureHandler jwtAuthenticationFailureHandler){
        this(requestMatcher);
        this.headerTokenExtractor = headerTokenExtractor;
        this.jwtAuthenticationFailureHandler = jwtAuthenticationFailureHandler;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException, IOException, ServletException {
        String tokenPayload = request.getHeader("Authorization");
        JwtBeforeProcessingToken token = new JwtBeforeProcessingToken(this.headerTokenExtractor.extract(tokenPayload));
        return super.getAuthenticationManager().authenticate(token);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
            Authentication authResult) throws IOException, ServletException {
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authResult);
        SecurityContextHolder.setContext(context);
        
        chain.doFilter(request, response);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException failed) throws IOException, ServletException {
                
        SecurityContextHolder.clearContext();
        this.jwtAuthenticationFailureHandler.onAuthenticationFailure(request, response, failed);
    }
}
