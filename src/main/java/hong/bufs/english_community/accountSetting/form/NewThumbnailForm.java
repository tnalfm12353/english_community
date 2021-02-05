package hong.bufs.english_community.accountSetting.form;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class NewThumbnailForm {
    
    private MultipartFile thumbnail;
}
