package hong.bufs.english_community.postComment;

import java.util.NoSuchElementException;

import org.modelmapper.ModelMapper;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import hong.bufs.english_community.domain.Account;
import hong.bufs.english_community.domain.Post;
import hong.bufs.english_community.domain.PostComment;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostCommentService {
    
    private final PostCommentRepository postCommentRepository;

    public PostComment createComment(Account account, Post post , String comment){
        PostComment postComment = new PostComment();
        postComment.setAccount(account);
        postComment.setComment(comment);
        post.addPostComment(postComment);

        postCommentRepository.save(postComment);
        return postComment;
    }
    
    public PostComment getPostCommentById (long commentId){
        return postCommentRepository.findById(commentId).orElseThrow(()-> new NoSuchElementException());
    }

    public void deletePostComment(Account account, PostComment comment) {
        checkCommentByAccount(account, comment);
        comment.setAccount(null);
        comment.getPost().getPostComments().remove(comment);
        postCommentRepository.delete(comment);
    }

    private void checkCommentByAccount(Account account, PostComment comment){
        if(!comment.getAccount().equals(account)){
            throw new AccessDeniedException("댓글의 글쓴이가 아닙니다.");
        }
    }
    
}
