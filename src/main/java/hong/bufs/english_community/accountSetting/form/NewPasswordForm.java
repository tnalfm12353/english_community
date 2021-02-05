package hong.bufs.english_community.accountSetting.form;

import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class NewPasswordForm {

    @NotBlank
    private String myPassword;

    @NotBlank
    private String newPassword;
}
