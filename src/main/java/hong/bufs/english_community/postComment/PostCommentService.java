package hong.bufs.english_community.postComment;

import java.util.NoSuchElementException;

import org.modelmapper.ModelMapper;
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

    public void removeComment(){
        //좀더 깔끔하게 만들기.
        long temp = 2;
        PostComment post1 = postCommentRepository.findById(temp).orElseThrow(()-> new NoSuchElementException());
        post1.setAccount(null);
        post1.getPost().getPostComments().remove(post1);
        postCommentRepository.delete(post1);
    }
}
