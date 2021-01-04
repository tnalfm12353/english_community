package hong.bufs.english_community.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
 
@Controller
public class MainController {

    @GetMapping("/*") 
    public String Mainpage() {
        return "page";
    }
}