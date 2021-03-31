package hong.bufs.english_community.domain;

import java.io.Serializable;
import java.util.Objects;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ThumbsUp implements Serializable{

    /**
     *
     */
    private static final long serialVersionUID = 1L;
    private Long account;
    private Long post;

    public ThumbsUp(long account, long post){
        this.account = account;
        this.post = post;
    }
    
    //equals, hashcode 구현
    @Override
    public boolean equals(Object object){
        if(this == object){
            return true;
        }

        if(object == null || getClass() != object.getClass()){
            return false;
        }

        ThumbsUp thumbsUp = (ThumbsUp) object;
        return account.equals(thumbsUp.account) && post.equals(thumbsUp.post);
    }

    @Override
    public int hashCode(){
        return Objects.hash(account,post);
    }
    
}
