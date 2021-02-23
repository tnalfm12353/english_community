package hong.bufs.english_community.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

import org.springframework.lang.Nullable;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@SequenceGenerator(
    name = "POST_IMAGE_SQE_GENERATOR",
    sequenceName = "POST_IMAGE_SQE",
    initialValue = 1,
    allocationSize = 1
)
@Entity
@Setter @Getter @EqualsAndHashCode(of = "id")
@AllArgsConstructor @NoArgsConstructor
public class PostImagePaths {

    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "POST_IMAGE_SQE_GENERATOR")
    private long id;

    @ManyToOne
    @JoinColumn(name = "post", referencedColumnName = "id")
    private Post post;

    @Column(nullable = false)
    private String imagePath;


}
