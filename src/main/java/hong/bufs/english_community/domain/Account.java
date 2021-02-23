package hong.bufs.english_community.domain;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;

import hong.bufs.english_community.account.PositionType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@SequenceGenerator(
    name = "ACCOUNT_SEQ_GENERATOR",
    sequenceName = "ACCOUNT_SEQUENCE",
    initialValue = 3,
    allocationSize = 1
)
@Entity
@Setter @Getter @EqualsAndHashCode(of = "id")
@Builder @AllArgsConstructor @NoArgsConstructor
public class Account {

    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ACCOUNT_SEQ_GENERATOR")
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

    private String thumbnail;
    //Todo 프로필 이미지와 백그라운드 이미지 추가하기!
    
    private boolean isEnglishMajor; //추후 교수님이나 조교 등 확인해준다면 인증된 계정으로 만들 예정.

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
    private Set<Post> posts = new HashSet<>();
}
