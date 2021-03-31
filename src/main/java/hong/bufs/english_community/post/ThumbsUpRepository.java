package hong.bufs.english_community.post;

import org.springframework.data.jpa.repository.JpaRepository;

import hong.bufs.english_community.domain.Account;
import hong.bufs.english_community.domain.AccountPostThumbsUp;
import hong.bufs.english_community.domain.Post;
import hong.bufs.english_community.domain.ThumbsUp;

public interface ThumbsUpRepository extends JpaRepository<AccountPostThumbsUp,ThumbsUp>{

    boolean existsByAccountAndPost(Account account, Post post);

    boolean existsByAccountIdAndPostId(Long id, Long id2);
    
}
