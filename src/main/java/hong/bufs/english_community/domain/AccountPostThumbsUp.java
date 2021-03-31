package hong.bufs.english_community.domain;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Entity
@Setter
@Getter 
@IdClass(ThumbsUp.class)
@NoArgsConstructor
public class AccountPostThumbsUp {
    
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id")
    private Account account;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    // 음...
    // public void setAccount(Account account){
    //     if(this.account != null){
    //         this.account.getThumbsUpPosts().remove(this);
    //     }
    //     this.account = account;
    //     account.getThumbsUpPosts().add(this);
    // }

    // public void setPost(Post post){
    //     if(this.post != null){
    //         this.post.getWhoThumbsUps().remove(this);
    //     }
    //     this.post = post;
    //     post.getWhoThumbsUps().add(this);
    // }
}
