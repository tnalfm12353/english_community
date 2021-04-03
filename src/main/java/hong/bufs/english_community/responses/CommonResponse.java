package hong.bufs.english_community.responses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter @Getter @NoArgsConstructor @AllArgsConstructor
public class CommonResponse<T> extends BasicResponse {
    
    private T data;
}
