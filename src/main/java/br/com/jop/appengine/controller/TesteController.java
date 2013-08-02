package br.com.jop.appengine.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("teste")
public class TesteController {

	@RequestMapping
	@ResponseBody
	public String teste() {
		return "Google App Engine";
	}
}