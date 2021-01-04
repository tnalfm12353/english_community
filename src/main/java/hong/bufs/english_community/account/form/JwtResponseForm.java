package hong.bufs.english_community.account.form;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor @NoArgsConstructor
public class JwtResponseForm {

    private String jwt;

//  private thumbnail;

    private String username; 

    private String nickname;

    public JwtResponseForm(String jwt){
        this.jwt = jwt;
    }

    public JwtResponseForm(String username, String nickname){
        this.username = username;
        this.nickname = nickname;
    }
}
