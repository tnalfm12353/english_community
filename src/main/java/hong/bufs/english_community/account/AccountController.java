package hong.bufs.english_community.account;

import java.io.IOException;
import java.io.InputStream;

import javax.servlet.ServletContext;
import javax.validation.Valid;

import org.apache.commons.io.IOUtils;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import hong.bufs.english_community.account.form.ExistValidForm;
import hong.bufs.english_community.account.form.ResponseAccountForm;
import hong.bufs.english_community.account.form.SignUpForm;
import hong.bufs.english_community.domain.Account;
import hong.bufs.english_community.responses.BasicResponse;
import hong.bufs.english_community.responses.CommonResponse;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class AccountController {
    
    private final AccountService accountService;
    private final AccountRepository accountRepository;
    private final ModelMapper modelMapper;
    private final ServletContext servletContext;

    @PostMapping("/sign-up/valid-username")
    @ResponseBody
    public String validID(@Valid @RequestBody ExistValidForm existValidForm) throws Exception {
        if(accountRepository.existsByUsername(existValidForm.getIsExist())){
            return "false";
        }
        return "true";
    }

    @PostMapping("/sign-up/valid-nickname")
    @ResponseBody
    public String validNickname(@Valid @RequestBody ExistValidForm existValidForm){
        if(accountRepository.existsByNickname(existValidForm.getIsExist())){
            return "false";
        }
        return "true";
    }

    @PostMapping("/sign-up/simple-sign-up")
    public ResponseEntity<?> signUpSubmit(@Valid @RequestBody SignUpForm simpleSignUpForm){
        accountService.processNewAccount(simpleSignUpForm);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/auth/account/select-current-account")
    public ResponseEntity<? extends BasicResponse> selectCurrentAccount(@CurrentAccount AccountContext context){
        Account account = accountService.getUserAccount(context);
    
        ResponseAccountForm responseForm = convertAccountToResponseAccountForm(account);
        return ResponseEntity.ok().body(new CommonResponse<ResponseAccountForm>(responseForm));
    }
    
    @GetMapping("/auth/account/get-account-profile/{id}")
    public ResponseEntity<?> getAccountProfile (@CurrentAccount AccountContext context,@PathVariable Long id){
        Account accountProfile = accountService.getAccountProfile(id);
        ResponseAccountForm responseForm = convertAccountToResponseAccountForm(accountProfile);

        return ResponseEntity.ok().body(new CommonResponse<ResponseAccountForm>(responseForm));
    }

    private ResponseAccountForm convertAccountToResponseAccountForm(Account account){
        return modelMapper.map(account,ResponseAccountForm.class);
    }

    @GetMapping("/profile/thumbnail/{imageName}")
    public @ResponseBody byte[] getUserThumbnail (@PathVariable String imageName)throws IOException{
        InputStream inputStream = servletContext.getResourceAsStream("/uploadedThumbnail/" +imageName);
        return IOUtils.toByteArray(inputStream);
    }
}