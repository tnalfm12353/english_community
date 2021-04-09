package hong.bufs.english_community.post;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.NoSuchElementException;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import hong.bufs.english_community.account.AccountRepository;
import hong.bufs.english_community.domain.Account;
import hong.bufs.english_community.domain.AccountPostThumbsUp;
import hong.bufs.english_community.domain.Post;
import hong.bufs.english_community.domain.PostImagePaths;
import hong.bufs.english_community.post.form.CreatePostForm;
import lombok.RequiredArgsConstructor;

@Transactional
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


    public List<Post> getNewPosts(long postId){
        if(postId != 0){
            return postRepository.findByIdLowerThanParamDESC(postId);
        }else{
            return postRepository.findByIdFirstTimeGetPosts();
        }
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


    public void deletePost(Post post) {
        postRepository.delete(post);
    }


    public Post getPostToUpdate(Account account,long postId) throws AccessDeniedException {
        Post post = postRepository.findById(postId);
        checkPostByAccount(account, post);
        return post;
    }

    private void checkPostByAccount(Account account,Post post) throws AccessDeniedException{
        if(!post.getAccount().equals(account)){
            throw new AccessDeniedException("게시물의 글쓴이가 아닙니다.");
        }
    }

}
