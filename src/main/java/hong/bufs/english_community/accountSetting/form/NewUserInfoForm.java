package hong.bufs.english_community.accountSetting.form;

import hong.bufs.english_community.account.PositionType;
import lombok.Data;

@Data
public class NewUserInfoForm {
    
    private String name;

    private String major;

    private String studentNumber;

    private PositionType position;

    private String grade;

    private String bio;
}
