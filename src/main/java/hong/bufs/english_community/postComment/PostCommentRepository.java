package hong.bufs.english_community.postComment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import hong.bufs.english_community.domain.PostComment;

@Transactional(readOnly = true)
public interface PostCommentRepository extends JpaRepository<PostComment,Long>{
    
}
