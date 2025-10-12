package aim.Authorization;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    public TestController() {
        System.out.println("TestController создан! (hot reload)");
    }

    @GetMapping("/test")
    public String test() {
        return "ok";
    }
} 