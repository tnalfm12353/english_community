package hong.bufs.english_community.post;

import java.util.List;
import java.util.NoSuchElementException;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import hong.bufs.english_community.account.AccountRepository;
import hong.bufs.english_community.domain.Account;
import hong.bufs.english_community.domain.AccountPostThumbsUp;
import hong.bufs.english_community.domain.Post;
import hong.bufs.english_community.domain.PostImagePaths;
import hong.bufs.english_community.post.form.CreatePostForm;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostService {
    
    private final PostRepository postRepository;
    private final PostImageRepository postImageRepository;
    private final ThumbsUpRepository thumbsUpRepository;
    private final ModelMapper modelMapper;

    public void createPost(Account account, CreatePostForm createPostForm, List<String> filePaths) {
        Post post = modelMapper.map(createPostForm, Post.class);
        post.setAccount(account);
        if(!filePaths.isEmpty()){
            for(String filePath : filePaths) {
                System.out.println(filePath);
                PostImagePaths imagePath =  new PostImagePaths();
                imagePath.setImagePath(filePath);
                post.addImagePath(postImageRepository.save(imagePath));
            }
        }
        postRepository.save(post);
	}


    public List<Post> getPosts(){
        return postRepository.findAll();
    }

    public Post getPost(Long postId){
        return postRepository.findById(postId).orElseThrow(()-> new NoSuchElementException());
    }

    public void updateThumbsUp(Account account, Post post) {
        AccountPostThumbsUp relation = new AccountPostThumbsUp();

        relation.setAccount(account);
        relation.setPost(post);

        if(checkingMyThumbsUp(account, post)){
            thumbsUpRepository.delete(relation);
            post.setThumbsUp(post.getThumbsUp() - 1);
        }else{
            thumbsUpRepository.save(relation);
            post.setThumbsUp(post.getThumbsUp() + 1);
        }

        postRepository.save(post);
    }

    public boolean checkingMyThumbsUp(Account account, Post post) {
        return thumbsUpRepository.existsByAccountAndPost(account,post);
    }

}
