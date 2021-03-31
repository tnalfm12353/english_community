package hong.bufs.english_community.configs;

import java.util.Arrays;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import hong.bufs.english_community.account.authentication.AccountAuthenticationFilter;
import hong.bufs.english_community.account.authentication.AccountAuthenticationProvider;
import hong.bufs.english_community.account.authentication.JwtAuthenticationFilter;
import hong.bufs.english_community.account.authentication.JwtAuthenticationProvider;
import hong.bufs.english_community.account.authentication.failtureHandlers.AccountAuthenticationFailureHandler;
import hong.bufs.english_community.account.authentication.failtureHandlers.JwtAuthenticationFailureHandler;
import hong.bufs.english_community.account.authentication.jwtUtils.HeaderTokenExtractor;
import hong.bufs.english_community.account.authentication.successHandlers.AccountAuthenticationSuccessHandler;
import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final AccountAuthenticationProvider accountAuthenticationProvider;
    private final AccountAuthenticationSuccessHandler accountAuthenticationSuccessHandler;
    private final AccountAuthenticationFailureHandler accountAuthenticationFailureHandler;
    private final JwtAuthenticationProvider jwtAuthenticationProvider;
    private final JwtAuthenticationFailureHandler jwtAuthenticationFailureHandler;
    private final HeaderTokenExtractor tokenExtractor;

    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

   
    protected AccountAuthenticationFilter accountAuthenticationFilter() throws Exception {
        AccountAuthenticationFilter loginFilter = new AccountAuthenticationFilter("/login",accountAuthenticationSuccessHandler,accountAuthenticationFailureHandler);
        loginFilter.setAuthenticationManager(super.authenticationManagerBean());
        
        return loginFilter;
    }

    protected JwtAuthenticationFilter jwtAuthenticationFilter() throws Exception{
        FilterSkipMatcher skipMatcher = new FilterSkipMatcher(Arrays.asList("/","/About"), "/auth/**");
        JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(skipMatcher, tokenExtractor, jwtAuthenticationFailureHandler);
        jwtAuthenticationFilter.setAuthenticationManager(super.authenticationManagerBean());

        return jwtAuthenticationFilter;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .authorizeRequests().anyRequest().permitAll();
            
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
            
        http.formLogin().disable()
            .addFilterBefore(accountAuthenticationFilter(),UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(this.accountAuthenticationProvider)
            .authenticationProvider(this.jwtAuthenticationProvider);
    }

}
