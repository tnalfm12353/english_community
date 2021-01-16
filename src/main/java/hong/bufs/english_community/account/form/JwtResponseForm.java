package hong.bufs.english_community.account.form;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor @NoArgsConstructor
public class JwtResponseForm{

    private String jwt;
    
    private ResponseAccountForm account;
}
