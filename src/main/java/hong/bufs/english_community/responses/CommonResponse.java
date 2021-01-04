package hong.bufs.english_community.responses;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Setter @Getter
public class CommonResponse<T> extends BasicResponse {
    
    private T data;

    public CommonResponse(T data){
        this.data = data;
    }
}
