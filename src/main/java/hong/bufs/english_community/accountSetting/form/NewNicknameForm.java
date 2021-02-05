package hong.bufs.english_community.accountSetting.form;

import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class NewNicknameForm {
    
    @NotBlank
    private String nickname;
}
