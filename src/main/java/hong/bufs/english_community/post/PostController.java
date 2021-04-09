package hong.bufs.english_community.post;


import java.io.InputStream;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.ServletContext;

import org.apache.commons.io.IOUtils;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import hong.bufs.english_community.domain.Post;
import hong.bufs.english_community.post.form.ResponsePostForm;
import hong.bufs.english_community.responses.CommonResponseList;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/post/")
@RequiredArgsConstructor
public class PostController {
    
    private final PostService postService;
    private final ModelMapper modelMapper;
    private final ServletContext servletContext;
    private final PostRepository postRepository;

    @GetMapping("get-posts/hot/{page}/{minusDays}") 
    public ResponseEntity<?> getHotPosts (Pageable pageable, @PathVariable int page, @PathVariable int minusDays){
        pageable = PageRequest.of(page, 5,Direction.DESC,"thumbsUp");
        Page<Post> posts = postRepository.getHotPostsBythumbsUp(pageable, minusDays);
        List<ResponsePostForm> responsePostForm = convertPostPageToResponsePostForm(posts);
        return ResponseEntity.ok().body(new CommonResponseList<ResponsePostForm>(responsePostForm));
    }

    @GetMapping("get-posts/new/{postId}") 
    public ResponseEntity<?> getNewPosts (@PathVariable long postId){
        List<Post> posts = postService.getNewPosts(postId);
        List<ResponsePostForm> responsePostForm = convertPostListToResponsePostForm(posts);
        return ResponseEntity.ok().body(new CommonResponseList<ResponsePostForm>(responsePostForm));
        
    }

    @GetMapping(value = "get-image/{imageName}")
    public @ResponseBody byte[] getPostImage (@PathVariable String imageName) throws Exception{
        String folderName = imageName.substring(2,10);
        InputStream inputStream = servletContext.getResourceAsStream("/uploadPost/"+folderName+"/"+imageName);
        return IOUtils.toByteArray(inputStream);
    }

    private List<ResponsePostForm> convertPostPageToResponsePostForm(Page<Post> posts){
        return posts.stream().map( entity -> modelMapper.map(entity, ResponsePostForm.class)).collect(Collectors.toList());
    }

    private List<ResponsePostForm> convertPostListToResponsePostForm(List<Post> posts){
        return posts.stream().map( entity -> modelMapper.map(entity, ResponsePostForm.class)).collect(Collectors.toList());
    }

    private ResponsePostForm convertPostToResponsePostForm(Post post){
        return modelMapper.map(post, ResponsePostForm.class);
    }
}
