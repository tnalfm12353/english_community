package hong.bufs.english_community.account.form;

import javax.validation.constraints.NotBlank;


import lombok.Data;

@Data
public class LoginForm {

    @NotBlank
    private String username;

    @NotBlank
    private String password;
}
