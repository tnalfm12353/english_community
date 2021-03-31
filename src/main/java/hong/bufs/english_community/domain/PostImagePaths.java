package hong.bufs.english_community.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@SequenceGenerator(
    name = "POST_IMAGE_SQE_GENERATOR",
    sequenceName = "POST_IMAGE_SQE",
    initialValue = 1,
    allocationSize = 1
)
@Entity
@Setter @Getter @EqualsAndHashCode(of = "id")
public class PostImagePaths {

    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "POST_IMAGE_SQE_GENERATOR")
    private long id;

    @Column(nullable = false)
    private String imagePath;

}
