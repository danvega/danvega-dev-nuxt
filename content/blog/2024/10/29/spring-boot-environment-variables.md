---
title: Using Environment Variables in Spring Boot
description: Learn how to effectively manage configuration and secure sensitive data using environment variables in Spring Boot applications. This comprehensive guide covers best practices, security considerations, and practical examples.
slug: spring-boot-environment-variables
date: 2024-10-29T17:00:00.000Z
published: true
author: Dan Vega
tags:
  - Spring Boot
video: https://www.youtube.com/embed/rQV76dufxz4
keywords: spring boot, spring framework, environment variables, configuration, security, api keys, spring framework, java, development, best practices
---

Managing sensitive information and configuration across different environments is a crucial aspect of modern application development. In this guide, we'll explore how to effectively use environment variables in Spring Boot applications to handle configuration and secure sensitive data.

## Why Environment Variables Matter

When building Spring Boot applications, especially those that integrate with external services or databases, you'll often need to manage configuration values like API keys, database credentials, and service URLs. Hardcoding these values directly into your application code or even in configuration files can lead to security risks and deployment challenges.

Consider this problematic example:

```java
@Service
public class ApiClient {
    private static final String API_KEY = "sk-1234567890abcdef"; // Don't do this!
}
```

## Understanding Spring Boot's Environment Variable Support

Spring Boot provides robust support for environment variables through various property sources. Let's explore how to properly handle configuration using environment variables.

### Using the @Value Annotation

The most straightforward way to access environment variables is using the `@Value` annotation:

```java
@RestController
public class ApiController {
    @Value("${api.key}")
    private String apiKey;
    
    @GetMapping("/status")
    public String getStatus() {
        return "API Configured with key: " + apiKey.substring(0, 5) + "...";
    }
}
```

### Setting Default Values

You can provide default values for cases where the environment variable might not be set:

```java
@Value("${database.url:jdbc:postgresql://localhost:5432/mydb}")
private String databaseUrl;
```

## Working with Environment Variables

There are several ways to provide environment variables to your Spring Boot application:

1. System Environment Variables:
```bash
export API_KEY=your-secret-key
```

2. Application Properties:
```properties
api.key=${API_KEY}
database.url=${DB_URL:jdbc:postgresql://localhost:5432/mydb}
```

3. Command Line Arguments:
```bash
java -jar myapp.jar --api.key=your-secret-key
```

### Using the Environment Interface

For more dynamic access to environment variables, you can use Spring's Environment interface:

```java
@Service
public class ConfigService {
    private final Environment environment;
    
    public ConfigService(Environment environment) {
        this.environment = environment;
    }
    
    public String getConfigValue(String key) {
        return environment.getProperty(key);
    }
}
```

## Best Practices and Security Considerations

1. Never commit sensitive values to version control:
    - Use `.gitignore` to exclude local configuration files
    - Keep production credentials separate from development

2. Use meaningful variable names:
    - Follow a consistent naming convention
    - Use prefixes to group related variables

3. Validate environment variables on startup:

```java
@PostConstruct
public void validateConfig() {
    Assert.notNull(apiKey, "API key must be configured!");
}
```

4. Consider using encrypted properties for sensitive data:
    - Spring Cloud Config Server
    - Vault
    - AWS Secrets Manager

## Development Workflow Integration

When developing locally, you can set environment variables in your IDE. For IntelliJ IDEA:

1. Edit Run Configuration
2. Add Environment Variables
3. Apply and run

Example configuration:
```properties
API_KEY=dev-key-123
DB_URL=jdbc:postgresql://localhost:5432/devdb
```

## Working with Multiple Environments

Spring Boot makes it easy to manage different configurations for various environments:

```properties
# application.properties
spring.profiles.active=${SPRING_PROFILES_ACTIVE:dev}

# application-dev.properties
api.url=http://localhost:8080

# application-prod.properties
api.url=${API_URL}
```

## Conclusion

Environment variables are a crucial tool for managing configuration and securing sensitive data in Spring Boot applications. By following the practices outlined in this guide, you can build more secure and maintainable applications that can easily be deployed across different environments.

Remember:
- Never hardcode sensitive information
- Use environment variables for configuration that changes between environments
- Provide clear documentation for required environment variables
- Validate configuration at startup
- Use meaningful variable names and follow consistent patterns

Next time you're tempted to hardcode that API key, remember that environment variables are your friend in keeping your application secure and configurable.

Happy coding! 🚀