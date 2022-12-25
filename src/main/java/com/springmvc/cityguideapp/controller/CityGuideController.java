package com.springmvc.cityguideapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CityGuideController {

    @GetMapping("/")
    public String home(String string){

        return "home";
    }
    @GetMapping("/allAttractions")
    public String allAttractions(String string){

        return "all-attractions";
    }
    @GetMapping("/nearbyAttractions")
    public String nearbyAttractions(String string){

        return "nearby-attractions";
    }
    @GetMapping("/newsEventsTips")
    public String newsEventsTips(String string){

        return "news-events-tips";
    }
    @GetMapping("/purchaseCard")
    public String purchaseCard(String string){

        return "purchase-card";
    }
    @GetMapping("/weather")
    public String weather(String string){

        return "weather";
    }
    @GetMapping("/whereToEatAndStay")
    public String whereToEatAndStay(String string){

        return "where-to-eat-and-stay";
    }
    @GetMapping("/payment")
    public String payment(String string){

        return "payment";
    }
    @GetMapping("/error")
    public String error(String string){

        return "error";
    }

}
