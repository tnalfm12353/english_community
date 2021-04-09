package hong.bufs.english_community.postComment;

import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import hong.bufs.english_community.account.AccountContext;
import hong.bufs.english_community.account.AccountService;
import hong.bufs.english_community.account.CurrentAccount;
import hong.bufs.english_community.domain.Account;
import hong.bufs.english_community.domain.Post;
import hong.bufs.english_community.domain.PostComment;
import hong.bufs.english_community.post.PostService;
import hong.bufs.english_community.postComment.form.PostCommentResponseForm;
import hong.bufs.english_community.responses.CommonResponse;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
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
    private final ModelMapper modelMapper;

    @PostMapping(value="{postId}/create-comment")
    public ResponseEntity<?> createComment(@CurrentAccount AccountContext context, @PathVariable long postId, @RequestBody String comment) {
        Account account = accountService.getUserAccount(context);
        Post post = postService.getPost(postId);
        PostComment postComment = commentService.createComment(account,post,comment);
        PostCommentResponseForm responseForm = convertPostCommentToResponsePostForm(postComment);
        return ResponseEntity.ok().body(new CommonResponse<PostCommentResponseForm>(responseForm));
    }

    @GetMapping("{commentId}/delete")
    public ResponseEntity<?> deleteComment(@CurrentAccount AccountContext context, @PathVariable long commentId){
        Account account = accountService.getUserAccount(context);
        PostComment comment = commentService.getPostCommentById(commentId);
        commentService.deletePostComment(account, comment);
        return ResponseEntity.ok().build();
    }
    
    private PostCommentResponseForm convertPostCommentToResponsePostForm(PostComment postComment){
        return modelMapper.map(postComment, PostCommentResponseForm.class);
    }
}
