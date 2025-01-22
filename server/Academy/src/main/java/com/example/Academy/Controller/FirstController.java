package com.example.Academy.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/first")
public class FirstController {
    @GetMapping
    public String hello() {
        return "Hello from FirstController";
    }
}
