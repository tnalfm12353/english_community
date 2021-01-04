package hong.bufs.english_community.account.form;

import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class ExistValidForm {
    
    @NotBlank
    private String isExist;

}
