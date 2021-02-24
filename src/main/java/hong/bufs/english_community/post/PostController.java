package hong.bufs.english_community.post;

import java.io.File;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import hong.bufs.english_community.domain.Account;
import hong.bufs.english_community.account.AccountContext;
import hong.bufs.english_community.account.AccountService;
import hong.bufs.english_community.account.CurrentAccount;
import hong.bufs.english_community.post.form.CreatePostForm;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/auth/post/")
@RequiredArgsConstructor
public class PostController {
    
    private final AccountService accountService;
    private final PostService postService;

    @PostMapping("create-post")
    public ResponseEntity<?> createPost(@CurrentAccount AccountContext context, @ModelAttribute CreatePostForm createPostForm){
        Account account = accountService.getUserAccount(context);
        List<String> filePaths = new ArrayList<String>();
        
        if(createPostForm.getFiles() != null){
            for (MultipartFile file : createPostForm.getFiles()) {
                int i = 1;
                String curDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
                String curDateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS"));
                String imgName = account.getId()+"_"+ curDateTime+"_"+i;
                try {
                    File imagefile = new File("D:/Eng_community/english_community/src/main/webapp/uploadPost/"+curDate+"/"+imgName);
                    if(!imagefile.exists()){
                        imagefile.mkdirs();
                    }
                    file.transferTo(imagefile);
                } catch (Exception e) {
                    System.out.println(e);
                }

                filePaths.add(imgName);
                i++;
            }
        }

        System.out.println(createPostForm.getContent());
        
        // postService.createPost(account,createPostForm,filePaths);

        return ResponseEntity.ok().build();
    }
}
