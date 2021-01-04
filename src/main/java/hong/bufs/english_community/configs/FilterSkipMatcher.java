package hong.bufs.english_community.configs;

import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

public class FilterSkipMatcher implements RequestMatcher {

    private OrRequestMatcher orRequestMatcher;
    private RequestMatcher processingMatcher;

    public FilterSkipMatcher(List<String> pathToSkip, String requestPath){
        this.orRequestMatcher = new OrRequestMatcher(pathToSkip.stream().map(path -> new AntPathRequestMatcher(path)).collect(Collectors.toList()));
        this.processingMatcher = new AntPathRequestMatcher(requestPath);
    }
    
    @Override
    public boolean matches(HttpServletRequest request) {
        return !orRequestMatcher.matches(request) && processingMatcher.matches(request);
    }
    
}
