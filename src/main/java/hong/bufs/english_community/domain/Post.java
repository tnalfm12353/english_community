package hong.bufs.english_community.domain;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.NamedAttributeNode;
import javax.persistence.NamedEntityGraph;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@SequenceGenerator(
    name = "POST_SEQ_GENERATOR",
    sequenceName = "POST_SEQUENCE",
    initialValue = 1,
    allocationSize = 1
)
@NamedEntityGraph(
    name = "Post.withImagePath",
    attributeNodes = @NamedAttributeNode("imagePaths")
)
@Entity
@Setter @Getter @EqualsAndHashCode(of = "id")
@Builder @AllArgsConstructor @NoArgsConstructor
public class Post extends BaseTimeEntity{
    
    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "POST_SEQ_GENERATOR")
    private Long id;

    @Column(nullable = false)
    private String title;

    @Lob @Basic(fetch = FetchType.EAGER)
    @Column(nullable = false)
    private String content;

    @OneToMany(cascade = CascadeType.ALL , orphanRemoval = true) // orphanremoval = 고아객체 제거
    @JoinColumn(name = "post_id")
    private Set<PostImagePaths> imagePaths = new HashSet<>();

    @ManyToOne
    @JoinColumn(name ="account", referencedColumnName = "id")
    private Account account;

    @OneToMany(cascade = CascadeType.ALL , orphanRemoval = true) //hits 값 올린건 그대로 놔두는게 좋을듯.
    private Set<AccountPostThumbsUp> whoThumbsUps = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL , orphanRemoval = true)
    private Set<PostComment> postComments = new HashSet<>();
    
    private int thumbsUp; // 추천수

    private boolean hits; // 인기 게시물인가 아닌가 

    private boolean deleted; // 삭제.


    public void addImagePath(PostImagePaths imagePath){
        imagePaths.add(imagePath);
    }
}
