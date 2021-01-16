package hong.bufs.english_community.account.form;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
public class ResponseAccountForm {
    
    private Long id;

    private String username;

    private String nickname;

    private String name;

    private String major; //전공

    private String studentNumber; //학번

    private String position; //grade or graduation or prof 
    
    private String bio; // 자기소개

    //Todo 프로필 이미지와 백그라운드 이미지 추가하기!
    private String thumbnail;
    
    private boolean isEnglishMajor; //추후 교수님이나 조교 등 확인해준다면 인증된 계정으로 만들 예정.

    private boolean isOwner; //받은 데이터가 현재 계정의 주인인지 판단할때.
}
