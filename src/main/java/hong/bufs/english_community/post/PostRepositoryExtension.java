package hong.bufs.english_community.post;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import hong.bufs.english_community.domain.Post;

@Transactional(readOnly = true)
public interface PostRepositoryExtension {
    
    Page<Post> getHotPostsBythumbsUp(Pageable pageable, int minusDayNumber);

    List<Post> findByIdLowerThanParamDESC(long id);

    List<Post> findByIdFirstTimeGetPosts();
}