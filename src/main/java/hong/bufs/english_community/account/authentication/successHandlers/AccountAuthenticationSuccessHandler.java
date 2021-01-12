package hong.bufs.english_community.account.authentication.successHandlers;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import hong.bufs.english_community.account.AccountContext;
import hong.bufs.english_community.account.authentication.jwtUtils.JwtTokenUtil;
import hong.bufs.english_community.account.authentication.token.AuthenticatedUserToken;
import hong.bufs.english_community.account.form.JwtResponseForm;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AccountAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenUtil jwtTokenUtil;
    private final ObjectMapper objectMapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
        AuthenticatedUserToken token = (AuthenticatedUserToken) authentication;
        
        AccountContext account = (AccountContext) token.getPrincipal();
        
        String jwtToken = jwtTokenUtil.generateToken(account);
        System.out.println(jwtToken);

        processResponse(response, writeDto(jwtToken,account.getAccount().getId(),
                                                    account.getAccount().getUsername(),
                                                    account.getAccount().getNickname()));
    }

    private JwtResponseForm writeDto(String jwtToken, Long id, String username, String nickname){
        return new JwtResponseForm(jwtToken,id,username,nickname);
    }

    private void processResponse(HttpServletResponse response, JwtResponseForm jwtResponseForm) throws IOException{
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpStatus.OK.value());
        response.getWriter().write(objectMapper.writeValueAsString(jwtResponseForm));
    }
}