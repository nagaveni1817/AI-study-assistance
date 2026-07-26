package com.aistudyassistance.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

	@Bean
	public OpenAPI aiStudyAssistanceOpenApi() {
		return new OpenAPI()
				.info(new Info()
						.title("AI Study Assistance API")
						.version("v1")
						.description("Backend API documentation for AI Study Assistance."));
	}
}
