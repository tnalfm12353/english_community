package hong.bufs.english_community.account.form;

import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class SignUpForm {
    
    @NotBlank
    // @Pattern(regexp = "/^(?=.*[a-zA-Z]).{4,12}$/")
    private String username;

    @NotBlank
    // @Pattern(regexp ="/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,16}$/")
    private String password;

    @NotBlank
    // @Pattern(regexp="/^[가-힣|a-z|A-Z|0-9].{1,10}$/")
    private String nickname;

    private String position = "ANONYMOUS";

}
