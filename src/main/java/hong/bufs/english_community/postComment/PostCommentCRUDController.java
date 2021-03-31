package hong.bufs.english_community.postComment;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import hong.bufs.english_community.account.AccountContext;
import hong.bufs.english_community.account.AccountService;
import hong.bufs.english_community.account.CurrentAccount;
import hong.bufs.english_community.domain.Account;
import hong.bufs.english_community.domain.Post;
import hong.bufs.english_community.post.PostService;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequestMapping("/auth/post/comment/")
@RequiredArgsConstructor
public class PostCommentCRUDController {
    
    private final AccountService accountService;
    private final PostService postService;
    private final PostCommentService commentService;

    @PostMapping(value="{postId}/create-comment")
    public ResponseEntity<?> createComment(@CurrentAccount AccountContext context, @PathVariable long postId, @RequestBody String comment) {
        Account account = accountService.getUserAccount(context);
        Post post = postService.getPost(postId);
        commentService.createComment(account,post,comment);

        // commentService.removeComment();
        return ResponseEntity.ok().build();
    }
    
}
