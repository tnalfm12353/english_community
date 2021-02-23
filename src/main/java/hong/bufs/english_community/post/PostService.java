package hong.bufs.english_community.post;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import hong.bufs.english_community.domain.Account;
import hong.bufs.english_community.post.form.CreatePostForm;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostService {
    
    
    private final ModelMapper modelMapper;

    public void createPost(Account account, CreatePostForm createPostForm, List<String> filePaths) {

	}
    

}
