package hong.bufs.english_community.postComment.form;

import java.time.LocalDateTime;

import hong.bufs.english_community.account.form.SimpleResponseAccountForm;
import lombok.Data;

@Data
public class PostCommentResponseForm {
    
    private SimpleResponseAccountForm account;

    private long id;
    
    private String comment;

    private LocalDateTime createdDateTime;
}
