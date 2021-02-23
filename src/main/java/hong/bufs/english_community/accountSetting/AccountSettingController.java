package hong.bufs.english_community.accountSetting;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import hong.bufs.english_community.domain.Account;
import hong.bufs.english_community.account.AccountContext;
import hong.bufs.english_community.account.AccountService;
import hong.bufs.english_community.account.CurrentAccount;
import hong.bufs.english_community.accountSetting.form.NewNicknameForm;
import hong.bufs.english_community.accountSetting.form.NewPasswordForm;
import hong.bufs.english_community.accountSetting.form.NewThumbnailForm;
import hong.bufs.english_community.accountSetting.form.NewUserInfoForm;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/auth/account/settings/")
@RequiredArgsConstructor
public class AccountSettingController {
    
    private final AccountService accountService;

    @PostMapping("thumbnail")
    public ResponseEntity<?> updateThumbnail(@CurrentAccount AccountContext context, @ModelAttribute NewThumbnailForm newThumbnailForm){
        Account account = accountService.getUserAccount(context);
        MultipartFile file = newThumbnailForm.getThumbnail();
        String curDateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS"));
        String imgName = account.getId()+"_"+curDateTime;
        try {            
            File imagefile = new File("D:/Eng_community/english_community/src/main/webapp/uploadedThumbnail/"+imgName);
            file.transferTo(imagefile);
        } catch (IOException e) {
            System.out.println(e);
        }

        if(account.getThumbnail() != null){
            deleteFile(account.getThumbnail());
        }
        accountService.updateThumbnail(account,imgName);
        return ResponseEntity.ok().body(imgName);
    }

    @GetMapping("thumbnail/delete")
    public ResponseEntity<?> deleteThumbnail(@CurrentAccount AccountContext context){
        Account account = accountService.getUserAccount(context);

        if(account.getThumbnail() != null){
            deleteFile(account.getThumbnail());
        }

        return ResponseEntity.ok().build();
    }

    private void deleteFile(String fileName){
        File removeOldThumbnail = new File("D:/Eng_community/english_community/src/main/webapp/uploadedThumbnail/"+fileName);
        
        if(removeOldThumbnail.exists())
            removeOldThumbnail.delete();

    }

    @PostMapping("nickname")
    public ResponseEntity<?> updateNickname(@CurrentAccount AccountContext context, @RequestBody NewNicknameForm nicknameForm){
        Account account = accountService.getUserAccount(context);
        if(account.getNickname() == nicknameForm.getNickname()){
            return ResponseEntity.ok().build();
        }
        
        accountService.updateNickname(account,nicknameForm.getNickname());

        return ResponseEntity.ok().build();
    }

    @PostMapping("password")
    public ResponseEntity<?> updatePassword(@CurrentAccount AccountContext context, @RequestBody NewPasswordForm newPasswordForm){

        if(newPasswordForm.getMyPassword() == newPasswordForm.getNewPassword()){
            return ResponseEntity.ok().build();
        }
        Account account = accountService.getUserAccount(context);
        accountService.updatePassword(account,newPasswordForm);

        return ResponseEntity.ok().build();
    }

    @PostMapping("user-info")
    public ResponseEntity<?> updateUserInfo(@CurrentAccount AccountContext context, @RequestBody NewUserInfoForm newUserInfoForm) {
        Account account = accountService.getUserAccount(context);
        accountService.updateUserInfo(account,newUserInfoForm);
        return ResponseEntity.ok().build();
    }
    
}
