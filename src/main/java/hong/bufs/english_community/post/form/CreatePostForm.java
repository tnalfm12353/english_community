package hong.bufs.english_community.post.form;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class CreatePostForm {
    
    private String PostType = "all";

    private String title;

    private String content;

    private List<MultipartFile> files;
}
