---
title: "Spring Boot 3.x Features: Complete Guide to Major Updates (2022-2025)"
description: Explore the transformative features introduced in Spring Boot 3.0 through 3.5, from Java 17 requirements and GraalVM native images to virtual threads and enhanced observability. This comprehensive guide covers each release's major improvements, including Docker Compose integration, Testcontainers support, structured logging, and SSL certificate management. Learn how Spring Boot 3.x revolutionized Java application development with practical code examples and migration tips for upgrading from 2.x to 3.x.
slug: spring-boot-3-features
date: 2025-09-17T09:00:00.000Z
published: true
author: Dan Vega
tags:
    - Spring Boot
    - Java
    - Spring Framework
keywords: Spring Boot 3, Spring Boot 3.x features, Spring Boot 3.0, Spring Boot 3.5, GraalVM native image, virtual threads Spring Boot, Jakarta EE migration, Docker Compose Spring Boot, Testcontainers, structured logging, Spring Boot observability, Spring Boot migration guide, Java 17 Spring Boot, Spring Boot performance, Spring Boot 4.0
---

## What's New in Spring Boot 3.x? Understanding the Major Features

Spring Boot has long been the de facto standard for building production ready Spring applications with minimal configuration. The 3.x series, which began in November 2022, represents one of the most significant evolutionary leaps in the framework's history. This generation didn't just iterate on existing features; it fundamentally reimagined what a modern Java application framework should be.

From embracing Java 17's modern language features to pioneering support for GraalVM native images and virtual threads, Spring Boot 3.x has consistently pushed the boundaries of what's possible in the Java ecosystem. As we approach the release of Spring Boot 4.0 in November 2025, with 3.5 marking the final minor release in the 3.x line, it's the perfect time to reflect on the transformative features that have defined this generation.

This guide highlights the most impactful features from each release in the 3.x series, exploring how these features have solved real-world problems and transformed the way we build, deploy, and operate Spring applications. While we won't cover every single enhancement and bug fix, we'll focus on the game-changing capabilities that have shaped modern Spring development. For a complete list of all features and changes, you can visit the official [Spring Boot documentation](https://spring.io/projects/spring-boot) and [release notes](https://github.com/spring-projects/spring-boot/releases).

### Quick Navigation: Spring Boot 3.x Releases

- [Spring Boot 3.0](#spring-boot-30-november-2022-the-foundation-for-modern-java) - Java 17, GraalVM Native Images, Jakarta EE
- [Spring Boot 3.1](#spring-boot-31-may-2023-developer-experience-revolution) - Docker Compose, Testcontainers
- [Spring Boot 3.2](#spring-boot-32-november-2023-performance-and-modernization) - Virtual Threads, RestClient
- [Spring Boot 3.3](#spring-boot-33-may-2024-security-and-transparency) - SBOM, Enhanced Observability
- [Spring Boot 3.4](#spring-boot-34-november-2024-operational-excellence) - Structured Logging, @Fallback
- [Spring Boot 3.5](#spring-boot-35-may-2025-the-grand-finale) - SSL Metrics, Quartz Actuator

## Spring Boot 3.0 (November 2022): The Foundation for Modern Java

Spring Boot 3.0 arrived as a watershed moment, making bold decisions that would define the framework's direction for years to come. By requiring Java 17 as a baseline and embracing Jakarta EE, this release signaled Spring's commitment to modernization and set the stage for innovative features that wouldn't have been possible with legacy constraints.

### How to Upgrade to Spring Boot 3.0: JDK 17+ Requirement

The decision to require JDK 17 as a minimum wasn't just about keeping up with Java's release cadence; it was about unlocking a treasure trove of language features that make code more expressive and maintainable. Developers could now use records for DTOs, text blocks for multiline strings, pattern matching for instanceof checks, and sealed classes for domain modeling.

```java
// Using Java Records for DTOs
public record UserDTO(String id, String name, String email) {}

// Pattern matching with instanceof
if (obj instanceof String s && s.length() > 5) {
    System.out.println(s.toUpperCase());
}

// Text blocks for readable SQL or JSON
String query = """
    SELECT u.id, u.name, u.email
    FROM users u
    WHERE u.created_at > ?
    ORDER BY u.name
    """;
```

### Migrating from javax to Jakarta EE 9/10 in Spring Boot 3.0

The transition from `javax.*` to `jakarta.*` packages represented more than a simple namespace change; it was a critical step in the evolution of enterprise Java. This migration solved the long-standing issue of Java EE's stagnation under Oracle and embraced the community-driven Jakarta EE initiative.

```java
// Before (Spring Boot 2.x)
import javax.servlet.http.HttpServletRequest;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

// After (Spring Boot 3.0)
import jakarta.servlet.http.HttpServletRequest;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotNull;
```

### Spring Boot GraalVM Native Image Support: Complete Guide

Perhaps no feature better exemplifies Spring Boot 3.0's forward thinking approach than first class GraalVM native image support. This solved the long-standing challenge of Java's relatively slow startup times and high memory consumption, making Spring Boot applications viable for serverless environments and resource-constrained deployments.

```bash
# Build a native image
./mvnw -Pnative native:compile

# Run the native executable (starts in ~50ms vs ~2000ms for JVM)
./target/my-app

# Memory usage drops from ~300MB to ~50MB
```

The native image support includes AOT (Ahead-of-Time) processing that analyzes your application at build time:

```java
@Configuration
@RegisterReflectionForBinding(UserDTO.class) // Hint for native image
public class AppConfig {
    // Configuration that works seamlessly in both JVM and native
}
```

### Spring Boot 3.0 Observability with Micrometer: Enhanced Monitoring

Spring Boot 3.0 introduced a unified approach to observability through Micrometer's new Observation API. This solved the fragmentation problem where developers had to configure metrics, tracing, and logging separately, often with inconsistent implementations.

```java
@RestController
public class UserController {
    private final ObservationRegistry registry;
    
    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Long id) {
        return Observation.createNotStarted("user.fetch", registry)
            .lowCardinalityKeyValue("user.type", "regular")
            .observe(() -> userService.findById(id));
    }
}
```

### Declarative HTTP Clients in Spring Boot 3.0: HTTP Interface Tutorial

Declarative HTTP clients arrived as a modern alternative to RestTemplate and WebClient, providing a type-safe, annotation-driven approach similar to Feign but with Spring's native support:

```java
@Configuration
@EnableWebMvc
public class ClientConfig {
    @Bean
    public UserClient userClient() {
        WebClient webClient = WebClient.builder()
            .baseUrl("https://api.example.com")
            .build();
        HttpServiceProxyFactory factory = 
            HttpServiceProxyFactory.builder(WebClientAdapter.forClient(webClient))
            .build();
        return factory.createClient(UserClient.class);
    }
}

@HttpExchange("/api/users")
interface UserClient {
    @GetExchange("/{id}")
    User findById(@PathVariable Long id);
    
    @PostExchange
    User create(@RequestBody User user);
}
```

### RFC 7807 Problem Details

Built-in support for standardized error responses solved the inconsistency problem in REST API error handling:

```java
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(UserNotFoundException.class)
    ProblemDetail handleUserNotFound(UserNotFoundException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(
            HttpStatus.NOT_FOUND, e.getMessage());
        problemDetail.setTitle("User Not Found");
        problemDetail.setType(URI.create("https://api.example.com/errors/not-found"));
        return problemDetail;
    }
}
```

## Spring Boot 3.1 (May 2023): Developer Experience Revolution

Spring Boot 3.1 focused intensively on improving the developer experience, particularly around local development and testing. This release recognized that developers spend most of their time in development and test environments, and optimized for those workflows.

### Spring Boot Docker Compose Integration: Simplifying Local Development

The Docker Compose support eliminated the tedious process of manually starting and stopping development services. Spring Boot now automatically detects `compose.yaml` files and manages the lifecycle of defined services:

```yaml
# compose.yaml in project root
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: secret
    ports:
      - "5432:5432"
  
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
```

```properties
# application.properties
# Spring Boot automatically configures connections to these services
spring.docker.compose.enabled=true
spring.docker.compose.lifecycle-management=start_and_stop
```

### Spring Boot Testcontainers Tutorial: @ServiceConnection Annotation

The `@ServiceConnection` annotation transformed integration testing by eliminating boilerplate container configuration:

```java
@SpringBootTest
@Testcontainers
class IntegrationTest {
    
    @Container
    @ServiceConnection
    static PostgreSQLContainer<?> postgres = 
        new PostgreSQLContainer<>("postgres:15-alpine");
    
    @Container
    @ServiceConnection
    static GenericContainer<?> redis = 
        new GenericContainer<>("redis:7-alpine")
            .withExposedPorts(6379);
    
    @Test
    void contextLoads() {
        // Containers are automatically started and configured
        // No need for @DynamicPropertySource or manual configuration
    }
}
```

### Spring Authorization Server

The production-ready OAuth 2.0 authorization server filled a critical gap left by Spring Security OAuth's deprecation:

```java
@Configuration
@EnableAuthorizationServer
public class AuthorizationServerConfig {
    
    @Bean
    public RegisteredClientRepository registeredClientRepository() {
        RegisteredClient registeredClient = RegisteredClient.withId(UUID.randomUUID().toString())
            .clientId("client")
            .clientSecret("{noop}secret")
            .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
            .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
            .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
            .redirectUri("http://localhost:8080/authorized")
            .scope(OidcScopes.OPENID)
            .build();
        
        return new InMemoryRegisteredClientRepository(registeredClient);
    }
}
```

## Spring Boot 3.2 (November 2023): Performance and Modernization

Spring Boot 3.2 arrived with a laser focus on performance and modern Java features. With JDK 21's release bringing virtual threads out of preview, this version positioned Spring Boot at the forefront of Java's concurrency revolution.

### Spring Boot 3.2 Virtual Threads: JDK 21 Performance Guide

Virtual threads represent the most significant change to Java concurrency since the introduction of the `java.util.concurrent` package. Spring Boot 3.2's support solved the age-old problem of thread-per-request architectures hitting scalability walls:

```properties
# Enable virtual threads with a single property
spring.threads.virtual.enabled=true
```

```java
@RestController
public class HighConcurrencyController {
    
    @GetMapping("/process")
    public String processRequest() throws InterruptedException {
        // This can now handle 10,000+ concurrent requests
        // without 10,000 OS threads
        Thread.sleep(1000); // Simulating I/O operation
        return "Processed on: " + Thread.currentThread();
    }
}

// Before virtual threads: ~200 concurrent requests max
// After virtual threads: ~10,000+ concurrent requests easily
```

### Spring Boot RestClient Tutorial: Modern Alternative to RestTemplate

RestClient emerged as the modern successor to RestTemplate, offering a fluent API without the reactive programming complexity of WebClient:

```java
@Service
public class ApiService {
    private final RestClient restClient;
    
    public ApiService(RestClient.Builder builder) {
        this.restClient = builder
            .baseUrl("https://api.example.com")
            .defaultHeader("Accept", "application/json")
            .requestInterceptor((request, body, execution) -> {
                log.info("Calling: {}", request.getURI());
                return execution.execute(request, body);
            })
            .build();
    }
    
    public User fetchUser(Long id) {
        return restClient.get()
            .uri("/users/{id}", id)
            .retrieve()
            .onStatus(HttpStatusCode::is4xxClientError, (request, response) -> {
                throw new UserNotFoundException("User not found: " + id);
            })
            .body(User.class);
    }
}
```

### Spring Boot JdbcClient: Simplified Database Access in 3.2

A modern, fluent alternative to JdbcTemplate that reduces boilerplate:

```java
@Repository
public class UserRepository {
    private final JdbcClient jdbcClient;
    
    public UserRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }
    
    public Optional<User> findById(Long id) {
        return jdbcClient.sql("SELECT * FROM users WHERE id = :id")
            .param("id", id)
            .query(User.class)
            .optional();
    }
    
    public List<User> findByAge(int minAge) {
        return jdbcClient.sql("SELECT * FROM users WHERE age >= ?")
            .param(minAge)
            .query(User.class)
            .list();
    }
}
```

### Dynamic SSL Certificate Reloading in Spring Boot 3.2

Dynamic SSL certificate reloading solved the operational nightmare of certificate rotation requiring application restarts:

```yaml
spring:
  ssl:
    bundle:
      jks:
        server:
          key:
            alias: "server"
          keystore:
            location: "classpath:server.jks"
            password: "secret"
          reload-on-update: true  # Hot reload when certificate changes
```

### Spring Boot Class Data Sharing (CDS): Faster Startup Times

CDS support dramatically improves startup time by sharing class metadata across JVM instances:

```bash
# Generate CDS archive
java -Dspring.context.exit=onRefresh -XX:ArchiveClassesAtExit=app.jsa -jar app.jar

# Run with CDS (30-50% faster startup)
java -XX:SharedArchiveFile=app.jsa -jar app.jar
```

## Spring Boot 3.3 (May 2024): Security and Transparency

Spring Boot 3.3 emphasized security, transparency, and operational excellence. With increasing focus on supply chain security and compliance requirements, this release provided tools to understand and secure application dependencies.

### CDS (Class Data Sharing) Support Enhancement

Building on 3.2's foundation, CDS support was refined to be more automatic and easier to use in containerized environments.

### Enhanced Spring Boot Observability in 3.3: Zero Configuration Monitoring

Extended observability coverage to more Spring components with zero configuration:

```java
// Automatic observation for Spring Data repositories
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // All methods are automatically observed
    List<User> findByAgeGreaterThan(int age);
}

// Custom observations with more context
@Component
public class OrderService {
    private final ObservationRegistry registry;
    
    public Order processOrder(Order order) {
        return Observation.createNotStarted("order.processing", registry)
            .contextualName("process-order")
            .lowCardinalityKeyValue("order.type", order.getType())
            .highCardinalityKeyValue("order.id", order.getId())
            .observe(() -> {
                // Business logic here
                return orderRepository.save(order);
            });
    }
}
```

### Spring Boot SBOM Actuator: Software Bill of Materials for Security

The SBOM endpoint provides transparency into application dependencies, crucial for security audits and compliance:

```bash
# Get SBOM in CycloneDX format
curl http://localhost:8080/actuator/sbom

# Returns detailed dependency information
{
  "bomFormat": "CycloneDX",
  "specVersion": "1.4",
  "components": [
    {
      "type": "library",
      "name": "spring-boot",
      "version": "3.3.0",
      "licenses": [{"license": {"name": "Apache-2.0"}}]
    }
  ]
}
```

### Spring Boot Service Connections: Enhanced Testing with Multiple Services

Service connections were extended to support more services and testing scenarios:

```java
@SpringBootTest
class MultiServiceIntegrationTest {
    
    @Container
    @ServiceConnection
    static MongoDBContainer mongodb = new MongoDBContainer("mongo:6");
    
    @Container
    @ServiceConnection
    static KafkaContainer kafka = new KafkaContainer(
        DockerImageName.parse("confluentinc/cp-kafka:latest"));
    
    @Container
    @ServiceConnection(name = "redis-cache")
    static GenericContainer<?> redis = new GenericContainer<>("redis:7-alpine")
        .withExposedPorts(6379);
}
```

### Base64 Resource Support in Spring Boot Configuration

Native support for Base64-encoded resources simplified handling of certificates and sensitive data in configuration:

```yaml
app:
  ssl:
    # Inline certificate as Base64
    certificate: base64:LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNVakNDQWJz...
  
  encryption:
    # Inline key material
    public-key: base64:MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQ...

# Reference in code
@Value("${app.ssl.certificate}")
private Resource certificate;
```

## Spring Boot 3.4 (November 2024): Operational Excellence

Spring Boot 3.4 focused on operational maturity, recognizing that modern applications need sophisticated logging, resilient patterns, and cloud-native compatibility.

### Spring Boot Structured Logging: JSON Logs for Cloud Native Applications

Native structured logging support solved the challenge of parsing logs in modern observability platforms:

```properties
# Enable structured JSON logging
logging.structured.format.console=ecs
logging.structured.format.file=logstash

# Or use custom format
logging.pattern.console={"timestamp":"%d","level":"%level","message":"%msg"}%n
```

```java
@Component
public class UserService {
    private static final Logger log = LoggerFactory.getLogger(UserService.class);
    
    public void processUser(String userId, String action) {
        // Structured logging with MDC
        try (MDC.MDCCloseable closeable = MDC.putCloseable("user.id", userId)) {
            log.info("Processing user action", 
                kv("action", action),
                kv("timestamp", Instant.now()),
                kv("processing.time.ms", 150));
        }
    }
}

// Output:
{
  "timestamp": "2024-11-15T10:30:00Z",
  "level": "INFO",
  "logger": "com.example.UserService",
  "message": "Processing user action",
  "user.id": "user-123",
  "action": "UPDATE_PROFILE",
  "processing.time.ms": 150
}
```

### Spring Boot @Fallback Annotation: Graceful Degradation Pattern

The `@Fallback` annotation provides elegant handling of optional dependencies and graceful degradation:

```java
@Configuration
public class DataSourceConfig {
    
    @Bean
    @Primary
    @ConditionalOnProperty("app.database.primary.enabled")
    public DataSource primaryDataSource() {
        return DataSourceBuilder.create()
            .url("jdbc:postgresql://prod-db:5432/myapp")
            .build();
    }
    
    @Bean
    @Fallback  // Only used if primary isn't available
    public DataSource fallbackDataSource() {
        log.warn("Using in-memory database as fallback");
        return new EmbeddedDatabaseBuilder()
            .setType(EmbeddedDatabaseType.H2)
            .addScript("schema.sql")
            .build();
    }
}
```

### Spring Boot MockMvc with AssertJ: Improved Testing Experience

Enhanced testing experience with fluent assertions:

```java
@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Test
    void testUserEndpoint() throws Exception {
        assertThat(mockMvc.perform(post("/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                        "name": "John Doe",
                        "email": "john@example.com"
                    }
                    """)))
            .hasStatus(HttpStatus.CREATED)
            .hasContentType(MediaType.APPLICATION_JSON)
            .bodyJson()
                .extractingPath("$.id").isNotNull()
                .extractingPath("$.name").isEqualTo("John Doe")
                .extractingPath("$.email").isEqualTo("john@example.com");
    }
}
```

### Virtual Thread Configuration in Spring Boot 3.4: Advanced Setup

Building on 3.2's foundation, virtual thread support was extended to more components:

```java
@Configuration
@EnableAsync
public class AsyncConfig {
    
    @Bean
    public TaskExecutor taskExecutor() {
        // Virtual thread executor for @Async methods
        return new TaskExecutorAdapter(Executors.newVirtualThreadPerTaskExecutor());
    }
    
    @Bean
    @ConditionalOnProperty("spring.threads.virtual.enabled")
    public TomcatProtocolHandlerCustomizer<?> protocolHandlerVirtualThreadCustomizer() {
        return protocolHandler -> {
            protocolHandler.setExecutor(Executors.newVirtualThreadPerTaskExecutor());
        };
    }
}
```

### Spring Boot ARM Support: Building Multi-Architecture Docker Images

Official ARM support solved deployment challenges on Apple Silicon and ARM-based cloud instances:

```xml
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <configuration>
        <image>
            <buildpacks>
                <buildpack>paketobuildpacks/java</buildpack>
            </buildpacks>
            <platforms>
                <platform>linux/amd64</platform>
                <platform>linux/arm64</platform>
            </platforms>
        </image>
    </configuration>
</plugin>
```

## Spring Boot 3.5 (May 2025): The Grand Finale

Spring Boot 3.5, as the final minor release in the 3.x series, focuses on operational polish and preparing applications for the future. It addresses the remaining gaps in observability, configuration management, and operational control.

### Spring Boot SSL Certificate Monitoring: Metrics and Alerts

Comprehensive SSL certificate monitoring prevents the all-too-common production outage from expired certificates:

```java
// Automatically exposed metrics:
// - ssl.bundle.validity.days (days until expiration)
// - ssl.bundle.expiry.timestamp
// - ssl.bundle.reload.count
// - ssl.bundle.reload.failure

@Component
public class CertificateMonitor {
    private final MeterRegistry meterRegistry;
    
    @EventListener
    public void onSslBundleReload(SslBundleReloadEvent event) {
        Gauge.builder("ssl.certificate.days_until_expiry", 
            () -> event.getBundle().getDaysUntilExpiry())
            .tag("bundle", event.getBundleName())
            .register(meterRegistry);
        
        // Alert if certificate expires in less than 30 days
        if (event.getBundle().getDaysUntilExpiry() < 30) {
            alertingService.sendCertificateExpiryWarning(event.getBundleName());
        }
    }
}
```

### Spring Boot Environment Variables: Loading JSON Configuration

Direct JSON property loading from environment variables simplifies cloud deployments:

```bash
# Set complex configuration via environment variable
export SPRING_APPLICATION_JSON='{
  "server": {"port": 8080},
  "spring": {
    "datasource": {
      "url": "jdbc:postgresql://localhost:5432/mydb",
      "username": "user"
    }
  },
  "app": {
    "features": ["feature1", "feature2"],
    "cache": {"ttl": 3600}
  }
}'

# Or use individual JSON properties
export APP_CONFIG='{"timeout": 30, "retries": 3}'
```

```java
@ConfigurationProperties(prefix = "app")
public class AppProperties {
    private Map<String, Object> config;
    // Automatically populated from APP_CONFIG environment variable
}
```

### Spring Boot Quartz Actuator: Trigger Scheduled Jobs via REST API

Operational flexibility to manually trigger scheduled jobs without waiting for their schedule:

```bash
# List all Quartz jobs
curl http://localhost:8080/actuator/quartz/jobs

# Get job details
curl http://localhost:8080/actuator/quartz/jobs/reportGeneration/daily-report

# Manually trigger a job
curl -X POST http://localhost:8080/actuator/quartz/jobs/reportGeneration/daily-report/trigger

# Trigger with custom data
curl -X POST http://localhost:8080/actuator/quartz/jobs/data-sync/trigger \
  -H "Content-Type: application/json" \
  -d '{"source": "manual", "priority": "high"}'
```

```java
@Component
public class ReportJob implements Job {
    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        // This can now be triggered via actuator endpoint
        String trigger = context.getTrigger().getKey().getName();
        if ("MANUAL".equals(trigger)) {
            log.info("Job manually triggered via actuator");
        }
        generateReport();
    }
}
```

### Spring Boot ECS Structured Logging: Nested JSON Format Guide

Enhanced structured logging with nested JSON for better compatibility with modern log aggregation systems:

```properties
logging.structured.format.console=ecs
logging.structured.ecs.service.name=my-service
logging.structured.ecs.service.version=${project.version}
logging.structured.ecs.service.environment=${spring.profiles.active}
```

```java
@RestController
public class OrderController {
    private static final Logger log = LoggerFactory.getLogger(OrderController.class);
    
    @PostMapping("/orders")
    public Order createOrder(@RequestBody Order order) {
        log.info("Creating order", 
            kv("event.action", "order.create"),
            kv("event.category", "process"),
            kv("order", Map.of(
                "id", order.getId(),
                "amount", order.getAmount(),
                "items", order.getItems().size()
            )),
            kv("user", Map.of(
                "id", getCurrentUserId(),
                "role", getCurrentUserRole()
            ))
        );
        return orderService.create(order);
    }
}

// Output:
{
  "@timestamp": "2025-05-01T10:30:00.123Z",
  "log.level": "INFO",
  "message": "Creating order",
  "ecs": {
    "version": "8.6"
  },
  "service": {
    "name": "my-service",
    "version": "3.5.0",
    "environment": "production"
  },
  "event": {
    "action": "order.create",
    "category": "process"
  },
  "order": {
    "id": "ORD-12345",
    "amount": 299.99,
    "items": 3
  },
  "user": {
    "id": "USER-789",
    "role": "customer"
  }
}
```

## Conclusion: Spring Boot 3.x Migration Guide and Future Roadmap

The Spring Boot 3.x series will be remembered as the generation that modernized Java application development for the cloud native era. From the bold decision to require Java 17 in 3.0 to the operational refinements in 3.5, each release has systematically addressed the real challenges developers face in building, testing, deploying, and operating applications at scale.

### Key Achievements of Spring Boot 3.x Series

**Performance Revolution**: Virtual threads and native images transformed Java from a memory hungry, slow starting platform to one that can compete with Go and Rust in cloud environments

**Developer Experience**: Docker Compose integration, Testcontainers support, and declarative HTTP clients eliminated countless hours of boilerplate and configuration

**Operational Excellence**: Structured logging, comprehensive observability, and SSL certificate management addressed the critical needs of production systems

**Modern Java Embrace**: By requiring Java 17 and quickly adopting Java 21 features, Spring Boot ensured developers could use the latest language improvements

### Preparing for Spring Boot 4.0 (November 2025)

As we prepare for Spring Boot 4.0 in November 2025, the 3.x series has laid an incredibly strong foundation. The framework has evolved from being merely a convention over configuration tool to a comprehensive platform that addresses the entire application lifecycle from the first line of code to production monitoring.

The journey from 3.0 to 3.5 demonstrates Spring Boot's commitment to solving real problems rather than chasing trends. Whether you're building microservices, serverless functions, or traditional applications, Spring Boot 3.x provides the tools, performance, and operational capabilities needed for modern Java development.

### Frequently Asked Questions (FAQ)

**Q: Should I upgrade to Spring Boot 3.x from 2.x?**
A: Yes, if you can meet the Java 17 requirement. The performance improvements, especially with virtual threads and native images, make it worthwhile.

**Q: What's the biggest breaking change in Spring Boot 3.0?**
A: The migration from javax to jakarta packages requires updating all imports in your codebase.

**Q: Can I use Spring Boot 3.x with Java 11?**
A: No, Spring Boot 3.x requires Java 17 as a minimum. For Java 11 support, you'll need to stay on Spring Boot 2.7.

**Q: When will Spring Boot 4.0 be released?**
A: Spring Boot 4.0 is scheduled for release in November 2025.

**Q: How do I enable virtual threads in Spring Boot?**
A: Simply add `spring.threads.virtual.enabled=true` to your application properties (requires Java 21+).

### Related Resources

- [Official Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Boot 3.0 Migration Guide](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0-Migration-Guide)
- [Spring Boot Release Notes](https://github.com/spring-projects/spring-boot/releases)
- [Spring Boot Sample Projects](https://github.com/spring-projects/spring-boot/tree/main/spring-boot-samples)

As we bid farewell to the 3.x series, we look forward to seeing how Spring Boot 4.0 will build upon this remarkable foundation to push Java application development even further into the future.

---

*Last updated: September 2025 | Spring Boot 3.5 is the final minor release in the 3.x series*