package hong.bufs.english_community.account.authentication.successHandlers;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import hong.bufs.english_community.account.AccountContext;
import hong.bufs.english_community.account.authentication.jwtUtils.JwtTokenUtil;
import hong.bufs.english_community.account.authentication.token.AuthenticatedUserToken;
import hong.bufs.english_community.account.form.JwtResponseForm;
import hong.bufs.english_community.account.form.ResponseAccountForm;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AccountAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenUtil jwtTokenUtil;
    private final ObjectMapper objectMapper;
    private final ModelMapper modelmapper;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
        AuthenticatedUserToken token = (AuthenticatedUserToken) authentication;
        
        AccountContext account = (AccountContext) token.getPrincipal();
        
        String jwtToken = jwtTokenUtil.generateToken(account);

        ResponseAccountForm responseAccountForm = modelmapper.map(account.getAccount(),ResponseAccountForm.class);
        processResponse(response, writeDto(jwtToken,responseAccountForm));
    }

    private JwtResponseForm writeDto(String jwtToken, ResponseAccountForm responseAccountForm){
        return new JwtResponseForm(jwtToken,responseAccountForm);
    }

    private void processResponse(HttpServletResponse response, JwtResponseForm jwtResponseForm) throws IOException{
        response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE); 
        // APPLICATION_JSON_UTF8_VALUE대신 APPLICATION_JSON_VALUE 쓰라고 하는데 한글 깨짐현상 나타남.
        response.setStatus(HttpStatus.OK.value());
        response.getWriter().write(objectMapper.writeValueAsString(jwtResponseForm));
    }
}