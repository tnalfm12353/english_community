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
@Entity
@Setter @Getter @EqualsAndHashCode(of = "id")
@Builder @AllArgsConstructor @NoArgsConstructor
public class Post {
    
    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "POST_SEQ_GENERATOR")
    private Long id;

    @Column(nullable = false)
    private String title;

    @Lob @Basic(fetch = FetchType.EAGER)
    @Column(nullable = false)
    private String content;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private Set<PostImagePaths> imagePaths = new HashSet<>();

    @ManyToOne
    @JoinColumn(name ="account", referencedColumnName = "id")
    private Account account;

    private int recommend; // 추천수

    private boolean hits; // 인기 게시물인가 아닌가 

    private LocalDateTime postedDateTime;
    private LocalDateTime modifiedDateTime;
    private LocalDateTime deletedDateTime;

    private boolean deleted; // 삭제.
}
