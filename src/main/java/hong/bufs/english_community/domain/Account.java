package hong.bufs.english_community.domain;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
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
    initialValue = 1,
    allocationSize = 1
)
@Entity
@Setter @Getter @EqualsAndHashCode(of = "id")
@Builder @AllArgsConstructor @NoArgsConstructor
public class Account extends BaseTimeEntity{

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
    
    private boolean isEnglishMajor; //추후 교수님이나 조교 등 확인해준다면 인증된 계정으로 만들 예정.

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
    private Set<Post> posts = new HashSet<>();

    // 양방향으로 할려 했지만.. 
    // Could not read entity state from ResultSet : EntityKey[hong.bufs.english_community.domain.Post#2]] with root cause
    // java.lang.NumberFormatException: 1222021-03-30 22:12:18.0000002021-03-30 22:12:18.0000001 ?뀋?뀕?뀋  0 ?뀕?뀋?뀋
    // 이 에러를 도저히 못 고치겠어서 포기함..
    // public void addPost(Post post){
    //     this.posts.add(post);
    //     if(post.getAccount() != this){
    //         post.setAccount(this);
    //     }
    // }

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
    private Set<PostComment> postComments = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL)
    private Set<AccountPostThumbsUp> thumbsUpPosts = new HashSet<>();
}
