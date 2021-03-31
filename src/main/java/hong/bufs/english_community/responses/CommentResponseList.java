package hong.bufs.english_community.responses;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Setter @Getter
public class CommentResponseList<T> extends BasicResponse{
    
    private List<T> dataList;

    public CommentResponseList(List<T> dataList){
        this.dataList = dataList;
    }
}
