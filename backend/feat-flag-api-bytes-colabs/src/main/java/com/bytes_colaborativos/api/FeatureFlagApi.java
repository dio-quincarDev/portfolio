package com.bytes_colaborativos.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class FeatureFlagApi {

	public static void main(String[] args) {
		SpringApplication.run(FeatureFlagApi.class, args);
	}

}
