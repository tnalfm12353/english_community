package hong.bufs.english_community.post;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import hong.bufs.english_community.domain.Post;

@Transactional(readOnly = true)
public interface PostRepository extends JpaRepository<Post,Long> , PostRepositoryExtension{
    
    Post findById(long postId);    
}
