package hong.bufs.english_community.domain;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@SequenceGenerator(
    name = "POST_COMMENT_SEQ_GENERATOR",
    sequenceName = "POST_COMMENT_SEQUENCE",
    initialValue = 1,
    allocationSize = 1
)

@Entity
@Setter @Getter @EqualsAndHashCode(of = "id")
public class PostComment extends BaseTimeEntity{
    
    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "POST_COMMENT_SEQ_GENERATOR")
    private Long id;

    @Lob @Basic(fetch = FetchType.EAGER)
    @Column(nullable = false)
    private String comment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account", referencedColumnName = "id")
    private Account account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post", referencedColumnName = "id")
    private Post post;
}
