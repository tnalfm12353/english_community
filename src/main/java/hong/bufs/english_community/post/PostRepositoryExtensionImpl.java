package hong.bufs.english_community.post;

import java.time.LocalDateTime;
import java.util.List;

import com.querydsl.core.QueryResults;
import com.querydsl.jpa.JPQLQuery;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import hong.bufs.english_community.domain.Post;
import hong.bufs.english_community.domain.PostComment;
import hong.bufs.english_community.domain.QAccount;
import hong.bufs.english_community.domain.QPost;
import hong.bufs.english_community.domain.QPostComment;
import hong.bufs.english_community.domain.QPostImagePaths;

public class PostRepositoryExtensionImpl extends QuerydslRepositorySupport implements PostRepositoryExtension {
    
    public PostRepositoryExtensionImpl(){
        super(Post.class);
        
    }
    
    /* 
        추후 포럼타입이 생기면 where에 포럼타입 추가
     */

    @Override
    public Page<Post> getHotPostsBythumbsUp(Pageable pageable){
        int minusDayfromNow = 1;
        QueryResults<Post> fetchResults = test(pageable, minusDayfromNow);
        return new PageImpl<>(fetchResults.getResults(),pageable,fetchResults.getTotal());
    }

    private QueryResults<Post> test(Pageable pageable, int minusDayNumber){
        LocalDateTime currentTime = LocalDateTime.now().minusDays(minusDayNumber);
        
        QPost post = QPost.post;
        JPQLQuery<Post> query = from(post)
                                .leftJoin(post.postComments, QPostComment.postComment).fetchJoin()
                                .leftJoin(post.account, QAccount.account).fetchJoin()
                                .leftJoin(post.imagePaths, QPostImagePaths.postImagePaths).fetchJoin()
                                .where(post.createdDateTime.goe(currentTime))
                                .distinct();
        JPQLQuery<Post> pageableQuery = getQuerydsl().applyPagination(pageable, query);
        QueryResults<Post> fetchResults = pageableQuery.fetchResults();
        System.out.println(fetchResults.getTotal());
        if(minusDayNumber <= 10 && fetchResults.getResults().isEmpty()){ //최대 10일까지 확인.(무한 재귀하지 않기 위해..)
            System.out.println("is EMPTYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY");
            pageable.getOffset();
            minusDayNumber += 1;            
            return test(pageable,minusDayNumber);
        }
        return fetchResults;
    }

    @Override
    public List<Post> findByIdLowerThanParamDESC(long id){
        QPost post = QPost.post;
        JPQLQuery<Post> query = from(post)
                                .leftJoin(post.postComments, QPostComment.postComment).fetchJoin()
                                .leftJoin(post.account, QAccount.account).fetchJoin()
                                .leftJoin(post.imagePaths, QPostImagePaths.postImagePaths).fetchJoin()
                                .where(post.id.lt(id))
                                .orderBy(post.id.desc())
                                .limit(5)
                                .distinct();
        return query.fetch();
    }
    
    @Override
    public List<Post> findByIdFirstTimeGetPosts(){
        QPost post = QPost.post;
        return from(post)
                .leftJoin(post.postComments, QPostComment.postComment).fetchJoin()
                .leftJoin(post.account, QAccount.account).fetchJoin()
                .leftJoin(post.imagePaths, QPostImagePaths.postImagePaths).fetchJoin()
                .orderBy(post.id.desc())
                .limit(5)
                .distinct()
                .fetch();
    }
}
