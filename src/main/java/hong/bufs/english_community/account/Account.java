package hong.bufs.english_community.account;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter @Getter @EqualsAndHashCode(of = "id")
@Builder @AllArgsConstructor @NoArgsConstructor
public class Account {

    @Id @GeneratedValue
    private Long id;

    @Column(unique = true , nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(unique = true , nullable = false)
    private String nickname;

    private String name;

    private String major; //전공

    private String studentNumber; //학번

    @Enumerated(EnumType.STRING)
    private PositionType position; //grade or graduation or prof 
    
    private String bio; // 자기소개

    //Todo 프로필 이미지와 백그라운드 이미지 추가하기!
    
    private boolean isEnglishMajor; //추후 교수님이나 조교 등 확인해준다면 인증된 계정으로 만들 예정.
}
