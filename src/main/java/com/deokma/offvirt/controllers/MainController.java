package com.deokma.offvirt.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @author Denis Popolamov
 */
@Controller
public class MainController {
    @GetMapping("/test")
    public String test(Model model) {
        model.addAttribute("name", "React with Thymeleaf");
        return "test";
    }

    @GetMapping("/office")
    public String office(Model model) {
        //model.addAttribute("name", "React with Thymeleaf");
        return "office";
    }
}
