package hong.bufs.english_community.responses;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter @Getter @NoArgsConstructor @AllArgsConstructor
public class CommonResponseList<T> extends BasicResponse{
    
    private List<T> dataList;

}
