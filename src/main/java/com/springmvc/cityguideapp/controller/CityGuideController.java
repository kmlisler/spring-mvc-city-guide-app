package com.springmvc.cityguideapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CityGuideController {

    @GetMapping("/main")
    public String nearbyAttractions(String string){

        return "nearby-attractions";
    }

}
