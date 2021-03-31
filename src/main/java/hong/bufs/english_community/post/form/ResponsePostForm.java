package hong.bufs.english_community.post.form;

import java.time.LocalDateTime;
import java.util.List;

import hong.bufs.english_community.account.form.SimpleResponseAccountForm;
import hong.bufs.english_community.domain.PostImagePaths;
import lombok.Data;

@Data
public class ResponsePostForm {

    private SimpleResponseAccountForm account;

    private long id;
    private String title;
    private String content;

    private List<PostImagePaths> imagePaths;
    private int thumbsUp;
    private boolean myThumbsUp = false;

    private LocalDateTime createdDateTime;
}
