package hong.bufs.english_community.account;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
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
import hong.bufs.english_community.responses.BasicResponse;
import hong.bufs.english_community.responses.CommonResponse;
import hong.bufs.english_community.responses.ErrorResponse;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class AccountController {
    
    private final AccountService accountService;
    private final AccountRepository accountRepository;
    private final ModelMapper modelMapper;
    
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

    @GetMapping("/api/account/select-current-account")
    public ResponseEntity<? extends BasicResponse> selectCurrentAccount(@CurrentAccount AccountContext context){
        Account account = accountService.getUserAccount(context);
    
        ResponseAccountForm responseForm = new ResponseAccountForm();
        responseForm.setId(account.getId());
        responseForm.setUsername(account.getUsername());
        responseForm.setNickname(account.getNickname());
        
        return ResponseEntity.ok().body(new CommonResponse<ResponseAccountForm>(responseForm));
    }
    
    @GetMapping("/api/account/get-account-profile/{username}")
    public ResponseEntity<?> getAccountProfile (@CurrentAccount AccountContext context,@PathVariable String username){
        Account accountProfile = accountService.getAccountProfile(username);

        ResponseAccountForm responseForm = modelMapper.map(accountProfile, ResponseAccountForm.class);
        
        if(context.getUsername().equals(accountProfile.getUsername())){
            responseForm.setOwner(true);
        }
        
        return ResponseEntity.ok().body(new CommonResponse<ResponseAccountForm>(responseForm));
    }


}
