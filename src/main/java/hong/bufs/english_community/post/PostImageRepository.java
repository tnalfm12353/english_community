package hong.bufs.english_community.post;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import hong.bufs.english_community.domain.PostImagePaths;

@Transactional(readOnly = true)
public interface PostImageRepository extends JpaRepository<PostImagePaths,Long>{
    
}
