package hong.bufs.english_community.controller;

import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import hong.bufs.english_community.account.AccountService;
import hong.bufs.english_community.account.AccountContext;
import hong.bufs.english_community.account.authentication.jwtUtils.JwtTokenUtil;
import hong.bufs.english_community.account.form.JwtResponseForm;
import hong.bufs.english_community.account.form.LoginForm;
import hong.bufs.english_community.account.form.SignUpForm;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*; // post, get 이런 것들
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*; // status().isOk(), is3xxRedirection() 이런것들.

import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
public class MainControllerTest {

    @Autowired MockMvc mockMvc;
    @Autowired AccountService accountService;
    @Autowired ObjectMapper objectMapper;
    @Autowired JwtTokenUtil jwtTokenUtil;

    @BeforeEach
    void beforeEach(){
        SignUpForm signUpForm = new SignUpForm();
        signUpForm.setUsername("testHong");
        signUpForm.setPassword("testhong123!");
        signUpForm.setNickname("testHong");
        accountService.processNewAccount(signUpForm);
    }


    //TODO 정신나감 이거 고쳐야댐.
    @DisplayName("로그인 성공")
    @Test
    void login_and_generate_jwt()throws Exception{
        LoginForm loginForm = new LoginForm();
        loginForm.setUsername("testHong");
        loginForm.setPassword("testhong123!");

        AccountContext userAccount = new AccountContext(loginForm.getPassword(), loginForm.getPassword(),"ROLE_USER");
        String token = jwtTokenUtil.generateToken(userAccount);

        // JwtResponseForm jwt = new JwtResponseForm(token);

        mockMvc.perform(post("/login")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(objectMapper.writeValueAsString(loginForm)))
                .andExpect(status().isOk());
                // .andExpect(content().json(objectMapper.writeValueAsString(jwt)));
    }
}
    