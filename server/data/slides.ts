// Auto-generated slide deck manifest - do not edit manually
// Regenerate with: node scripts/import-slides.js <deck.pdf> <talk-slug>
export interface SlideDeck {
  pdf: string
  pdfSize: number
  width: number
  height: number
  slides: Array<{ src: string; text: string }>
}

export const slideDecks: Record<string, SlideDeck> = {
  "confoo-2026-introduction-to-spring-ai": {
    "pdf": "/slides/confoo-2026-introduction-to-spring-ai/confoo-2026-introduction-to-spring-ai.pdf",
    "pdfSize": 1067594,
    "width": 1920,
    "height": 1080,
    "slides": [
      {
        "src": "/slides/confoo-2026-introduction-to-spring-ai/001.webp",
        "text": "Spring into AI AI for Java Developers Dan Vega Spring Developer Advocate @ Broadcom"
      },
      {
        "src": "/slides/confoo-2026-introduction-to-spring-ai/002.webp",
        "text": "Introduction"
      },
      {
        "src": "/slides/confoo-2026-introduction-to-spring-ai/003.webp",
        "text": "About Me Husband & Father Cleveland, OH Spring Developer Advocate Java Champion Author 24 Years in Software Development danvega.dev"
      },
      {
        "src": "/slides/confoo-2026-introduction-to-spring-ai/004.webp",
        "text": "/ / https: www.springofficehours.io"
      },
      {
        "src": "/slides/confoo-2026-introduction-to-spring-ai/005.webp",
        "text": "The Java AI Opportunity"
      },
      {
        "src": "/slides/confoo-2026-introduction-to-spring-ai/006.webp",
        "text": "Why are we talking about AI on the JVM?"
      },
      {
        "src": "/slides/confoo-2026-introduction-to-spring-ai/007.webp",
        "text": "I know that most people won’t believe it, but I can guarantee you that in 2 years, the majority of AI agent workloads will run on the JVM James Ward Principal Developer Advocate at AWS"
      },
      {
        "src": "/slides/confoo-2026-introduction-to-spring-ai/008.webp",
        "text": "Python earned its place in AI. TensorFlow. PyTorch. Scikit-learn. Hugging Face. Python dominated AI research and model training. That part of the story is not up for debate. But the game has changed."
      },
      {
        "src": "/slides/confoo-2026-introduction-to-spring-ai/009.webp",
        "text": "But what are we actually doing? Building & Training Models Integrating AI into Applications • Specialized ML frameworks required • REST APIs & SDKs • Research-oriented workflows • Authentication & Rate Limiting • Customized Data Pipelines • Retry Logic & Resilience • GPU Infrastructure • Observability Most of us aren't training models. We're calling them."
      },
      {
        "src": "/slides/confoo-2026-introduction-to-spring-ai/010.webp",
        "text": "You've done this before. Databases → Message Queues → Payment Gateways LLMs are just the next Integration. → Cloud"
      },
      {
        "src": "/slides/confoo-2026-introduction-to-spring-ai/011.webp",
        "text": "Java Is Built for This Enterprise-grade infrastructure Spring, Kafka, observability tools that are already running in production at scale Type safety & structured output Parse AI responses into real objects with compile-time guarantees, not loose strings Battle-tested at scale Millions of JVM applications serving billions of requests every single day Your existing team No need to hire a Python shop or replatform. Just upskill the developers you already trust"
      },
      {
        "src": "/slides/confoo-2026-introduction-to-spring-ai/012.webp",
        "text": "/bin/bash echo \"Calling Open AI \" MY_OPENAI_KEY=\"YOUR_API_KEY_HERE\" PROMPT=\"Tell me an interesting fact about Java\" curl https: api.openai.com/v1/chat/completions \\ -H \"Content-Type: application/json\" \\ -H \"Authorization: Bearer $MY_OPENAI_KEY\" \\ . . . / / -d '{\"model\": “gpt-5\", \"messages\": [{“role\":\"user\", \"content\": \"'\"${PROMPT}\"'\"}] }' ! # Calling OpenAI with cURL"
      },
      {
        "src": "/slides/confoo-2026-introduction-to-spring-ai/013.webp",
        "text": "API Response { \"id\": \"chatcmpl-ABNbjZ5oRbo72OevnCX2arPufJCYK\", \"object\": \"chat.completion\", \"model\": \"gpt-5\", \"choices\": [{ \"message\": { \"role\": \"assistant\", \"content\": \"Java was initially designed with interactive television in mind \" }, \"finish_reason\": \"stop\" }], \"usage\": { \"prompt_tokens\": 14, \"completion_tokens\": 90, \"total_tokens\": 104 } . . . }"
      },
      {
        "src": "/slides/confoo-2026-introduction-to-spring-ai/014.webp",
        "text": "Calling OpenAI with Java public static void main(String[] args) throws IOException, InterruptedException { var apiKey = \"YOUR_API_KEY_HERE\"; var body = \"\"\" { \"model\": \"gpt-5\", \"messages\": [{ \"role\": \"user\", \"content\": \"Tell me an interesting fact about Java\" }] } “”\"; HttpRequest request = HttpRequest.newBuilder() .uri(URI.create(\"https: api.openai.com/v1/chat/completions\")) .header(\"Content-Type\", \"application/json\") .header(\"Authorization\", \"Bearer \" + apiKey) .POST(HttpRequest.BodyPublishers.ofString(body)) .build(); / / } var client = HttpClient.newHttpClient(); var response = client.send(request,HttpResponse.BodyHandlers.ofString()); System.out.println(response.body());"
      },
      {
        "src": "/slides/confoo-2026-introduction-to-spring-ai/015.webp",
        "text": "Spring AI provides us so much more than a facility for making REST API calls"
      },
      {
        "src": "/slides/confoo-2026-introduction-to-spring-ai/016.webp",
        "text": "What Are the Challenges? What does a framework provide you? Model abstraction and portability Response streaming and async processing Unified API across providers Memory and conversation management Structured output parsing Embedding and vector operations Prompt template management Function calling integration Token counts & cost management Observability and monitoring Retry logic and error handling Security and compliance"
      },
      {
        "src": "/slides/confoo-2026-introduction-to-spring-ai/017.webp",
        "text": "LLM Pricing"
      },
      {
        "src": "/slides/confoo-2026-introduction-to-spring-ai/018.webp",
        "text": "ChatGPT Pricing Tiers"
      },
      {
        "src": "/slides/confoo-2026-introduction-to-spring-ai/019.webp",
        "text": "API Pricing"
      },
      {
        "src": "/slides/confoo-2026-introduction-to-spring-ai/020.webp",
        "text": "What is a Token? ~100 tokens ≈ 75 words A token is roughly 3/4 of a word"
      },
      {
        "src": "/slides/confoo-2026-introduction-to-spring-ai/021.webp",
        "text": "What is a Token?"
      },
      {
        "src": "/slides/confoo-2026-introduction-to-spring-ai/022.webp",
        "text": "Context Window"
      },
      {
        "src": "/slides/confoo-2026-introduction-to-spring-ai/023.webp",
        "text": "LLM Pricing Comparison Model Context Input / Output (per 1M tokens) GPT-5 (OpenAI) ~400K $1.25 / $10.00 GPT-5 Mini ~400K $0.25 / $2.00 GPT-5 Nano ~400K $0.05 / $0.40 Claude Sonnet 4 200K $3.00 / $15.00 Claude Opus 4.1 200K (32K out) $15.00 / $75.00 Gemini 2.5 Flash-Lite 1M $0.10 / $0.40 Gemini 2.5 Flash 1M $0.30 / $1.25 Gemini 2.5 Pro 1M (2M roadmap) $1.25-2.50 / $10-15 Grok 3 (xAI) 131K $3.00 / $15.00"
      },
      {
        "src": "/slides/confoo-2026-introduction-to-spring-ai/024.webp",
        "text": "Spring AI Introduction"
      },
      {
        "src": "/slides/confoo-2026-introduction-to-spring-ai/025.webp",
        "text": "Getting Started A Tour of Spring AI Features • Spring AI Reference Documentation • Currently Versions: • Spring Boot 3 - v1.1.2 • Spring Boot 4 - 2.0.0 M2 • start.spring.io • Chat Client & Chat Model • Blocking vs Non-Blocking (Streaming Responses) • Response Types (Content / ChatResponse) • Spring AI Features (Prompt Templates, Structured Output & more) 29"
      },
      {
        "src": "/slides/confoo-2026-introduction-to-spring-ai/026.webp",
        "text": "Demo Time Check out the code"
      },
      {
        "src": "/slides/confoo-2026-introduction-to-spring-ai/027.webp",
        "text": "Thank You www.danvega.dev"
      }
    ]
  },
  "confoo-2026-whats-new-in-spring-boot-4": {
    "pdf": "/slides/confoo-2026-whats-new-in-spring-boot-4/confoo-2026-whats-new-in-spring-boot-4.pdf",
    "pdfSize": 2456210,
    "width": 1920,
    "height": 1080,
    "slides": [
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/001.webp",
        "text": "W H AT ' S N E W I N SPRING BOOT 4 Spring Framework 7 & Spring Boot 4 Dan Vega // Spring Developer Advocate @Broadcom"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/002.webp",
        "text": "DAN VEGA Spring Developer Advocate @Broadcom Java Champion Author: Fundamentals of Software Engineering (O'Reilly) 24+ years building software Cleveland, OH // Husband & Father danvega.dev YouTube // Blog // Podcast"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/003.webp",
        "text": "/ / https: www.springofficehours.io"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/004.webp",
        "text": "WHERE WE'VE BEEN Spring Boot 3.x recap"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/005.webp",
        "text": "\" You can't really know where you are going until you know where you have been. - Maya Angelou"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/006.webp",
        "text": ""
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/007.webp",
        "text": "3.0 November 2022 • JDK 17+ • Jakarta EE 9/10 • Ahead-of-Time (AOT) / GraalVM • Observability • HTTP Interface Clients • RFC 7807 Problem Details"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/008.webp",
        "text": "3.1 May 2023 • Docker Compose support • Testcontainers • Spring Authorization Server"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/009.webp",
        "text": "3.2 • JDK 21 (LTS) support November 2023 • Virtual Threads • New Rest Client • New JDBC Client • SSL Bundle Reloading"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/010.webp",
        "text": "3.3 • CDS Support May 2024 • Observability Enhancements • SBOM Actuator Endpoint • Service Connections • Base64 Resources"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/011.webp",
        "text": "3.4 • Structured Logging November 2024 • @Fallback Beans • AssertJ support for MockMvc • Expanded Virtual Thread Support • ARM image support out-of-the-box"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/012.webp",
        "text": "3.5 May 2025 • SSL Bundle Metrics • Load properties from env vars • Trigger Quartz jobs from Actuator • ECS structured logging (nested format)"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/013.webp",
        "text": "SPRING FRAMEWORK 7 & SPRING BOOT 4 November 2025"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/014.webp",
        "text": "THE ROAD TO GA spring.io/blog/2025/09/02/road_to_ga_introduction"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/015.webp",
        "text": "SPRING BOOT 4 github.com/danvega/sb4"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/016.webp",
        "text": ""
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/017.webp",
        "text": "BASELINE UPGRADES • JDK 17+ / JDK 25 (LTS) • Kotlin 2.2 • Jakarta EE 11 • GraalVM 25 • Servlet 6.1 (Tomcat 11) • Jackson 3 • JPA 3.2 • JUnit 6 • Bean Validation 3.1 • Hibernate ORM 7.x"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/018.webp",
        "text": "MODULAR AUTO-CONFIG The biggest structural change in Boot 4"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/019.webp",
        "text": "185 KB → 2 MB spring-boot-autoconfigure JAR growth from 2014 to 2025"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/020.webp",
        "text": "WHAT CHANGED • Auto-config split into focused modules • spring-boot-starter-web -> spring-boot-webmvc • spring-boot-starter-webmvc (new, more explicit) • Each starter brings only its own auto-config"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/021.webp",
        "text": ""
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/022.webp",
        "text": ""
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/023.webp",
        "text": ""
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/024.webp",
        "text": "JACKSON 3 New JSON library with big improvements"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/025.webp",
        "text": "JACKSON 3 SUPPORT • Immutable builder-based configuration • ISO-8601 date defaults out of the box • Unchecked exceptions - better for lambdas/streams • New tools.jackson packages • Spring Boot auto-configures JsonMapper bean • Mix of Jackson 2 & 3 supported during migration"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/026.webp",
        "text": "Jackson 3 - JsonMapper @Component public class DataLoader implements CommandLineRunner { private static final Logger log = LoggerFactory.getLogger(DataLoader.class); private static final String DONUTS_JSON_PATH = \"classpath:/data/donuts-menu.json\"; private final JsonMapper jsonMapper; private final ResourceLoader resourceLoader; private List<Donut> donuts; public DataLoader(JsonMapper jsonMapper, ResourceLoader resourceLoader) { this.jsonMapper = jsonMapper; this.resourceLoader = resourceLoader; } @Override public void run(String args) throws Exception { log.info(\"Loading Donuts \\uD83C\\uDF69\"); try { Resource resource = resourceLoader.getResource(DONUTS_JSON_PATH); this.donuts = jsonMapper.readValue(resource.getInputStream(), new TypeReference > < . . } . } } catch (JacksonException e) { log.error(\"Error loading Donuts: {}\", e.getMessage()); } catch (Exception e) { throw e; } () {});"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/027.webp",
        "text": "Jackson - Use Jackson 2 Defaults spring: application: name: donut-shop jackson: serialization: indent-output: true use-jackson2-defaults: true"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/028.webp",
        "text": "Jackson - JSON Views # # public record Donut( @JsonView(Views.Summary.class) String type, @JsonView(Views.Public.class) Glaze glaze, @JsonView(Views.Public.class) List<String> toppings, @JsonView(Views.Summary.class) @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = \"$#. BigDecimal price, @JsonView(Views.Public.class) Boolean isVegan, @JsonView(Views.Internal.class) Integer calories, @JsonView(Views.Internal.class) LocalDateTime bakedAt) {} \")"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/029.webp",
        "text": "Jackson - JSON Views public class Views { * Summary view: Minimal information for quick listings * Includes: type, price public interface Summary {} * Public view: Information suitable for public API consumers * Includes: Summary + glaze, toppings, isVegan public interface Public extends Summary {} * Internal view: Additional details for internal use * Includes: Public + calories, bakedAt public interface Internal extends Public {} * Admin view: Complete information for administrative purposes * Includes: All fields (no restrictions) public interface Admin extends Internal {} / * / * / * / * * * * * * * * * / / / / }"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/030.webp",
        "text": "❌ OLD: Required mutable wrapper object var user = new User(\"Marcel\", \"Martin\", LocalDate.of(1971, 7, 12), \"m@m.fr\", \"1234 rue Gambetta\", 69002, \"Lyon\", \"France\"); var jacksonValue = new MappingJacksonValue(user); jacksonValue.setSerializationView(Summary.class); Wrapper! Mutable! / / / / / / / / var response = this.restTemplate.postForObject( \"http: localhost:8080/create\", jacksonValue, Have to send wrapper, not the actual object String.class ); / / Spring Boot 3 - Request with filtered fields"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/031.webp",
        "text": "✅ NEW: Clean, immutable, fluent API var user = new User(\"Marcel\", \"Martin\", LocalDate.of(1971, 7, 12), \"m@m.fr\", \"1234 rue Gambetta\", 69002, \"Lyon\", \"France\"); / / / / / / var response = this.restClient.post() .uri(\"http: localhost:8080/create\") .hint(JsonView.class.getName(), Summary.class) .body(user) Send the actual object .retrieve() .body(String.class); / / Spring Boot 4 - Request with filtered fields Clean hint!"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/032.webp",
        "text": "NULL SAFETY WITH JSPECIFY Say goodbye to NullPointerExceptions… maybe"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/033.webp",
        "text": "EVER HIT A NullPointer Exception? Yeah. Everyone. Every single one of you."
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/034.webp",
        "text": "THE PROBLEM ISN’T NULL Sometimes you want to express the absence of a value"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/035.webp",
        "text": "THE REAL PROBLEM WITH NULL Is that it is usually implicit and undocumented"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/036.webp",
        "text": "EXPRESS NULLABILITY JSPECIFY / / https: jspecify.dev"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/037.webp",
        "text": "JSPECIFY ANNOTATIONS • @Nullable: Indicates that a type usage (Fields, Return Types, Parameters & Generics) can be null@NullMarked - everything is non-null by default • @NonNull: This explicitly marks that null is not a valid value for this type usage • @NullMarked: All type usages within that scope are considered non-null by default • @NullUnmarked: All type usages have unspecified nullness (neither nullable nor non-null by default)"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/038.webp",
        "text": "SPRING FRAMEWORK JSR-305 ANNOTATIONS • Replaces Spring's JSR-305 annotations • @Nullable • @NonNull • @NonNullApi • @NonNullFields"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/039.webp",
        "text": "Why are we doing this? Ensure null safety in the IDE or during compilation time"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/040.webp",
        "text": "SUPPORT FOR JSPECIFY Across the Spring Portfolio of projects"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/041.webp",
        "text": "BeanRegistrar API Programmatic Bean Registration"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/042.webp",
        "text": "PROGRAMMATICALLY REGISTER BEANS A more flexible way to register multiple or conditional beans without abusing @Bean methods."
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/043.webp",
        "text": "Bean Registrar in Action public class MessageServiceRegistrar implements BeanRegistrar { @Override public void register(BeanRegistry registry, Environment env) { String messageType = env.getProperty(\"app.message-type\", \"email\"); switch (messageType.toLowerCase()) { case \"email\" registry.registerBean(\"messageService\", EmailMessageService.class, spec spec.description(\"Email service via BeanRegistrar\")); case \"sms\" registry.registerBean(\"messageService\", SmsMessageService.class, spec spec.description(\"SMS service via BeanRegistrar\")); } } > > > - - - > - }"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/044.webp",
        "text": "Bean Registrar in Action @Configuration @Import(MessageServiceRegistrar.class) public class ModernConfig { other bean definitions here / / }"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/045.webp",
        "text": "BUILT-IN API VERSIONING First-class support in MVC & WebFlux"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/046.webp",
        "text": "WE COULD ALWAYS VERSION OUR API’S Introducing first-class support for web endpoint versioning in MVC / WebFlux"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/047.webp",
        "text": "API VERSIONING • version attribute on @GetMapping / @PostMapping • Version source: header, param, media type or path variable • Configurable strategy via ApiVersionConfigurer • Supported versions + default version • No more custom interceptors or filters"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/048.webp",
        "text": "API VERSIONING IN ACTION @GetMapping(value = \"/{version}/users\", version = \"1.0\") public List<UserDTOv1> findAllV1() { return userRepository.findAll().stream() .map(userMapper toV1) .collect(Collectors.toList()); } : : : : @GetMapping(value = \"/{version}/users\", version = \"2.0\") public List<UserDTOv2> findAllV2() { return userRepository.findAll().stream() .map(userMapper toV2) .collect(Collectors.toList()); }"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/049.webp",
        "text": "API VERSIONING IN ACTION @Configuration public class WebConfig implements WebMvcConfigurer { * path-segment /v1/users * request header * query param * media type param / * * / } @Override public void configureApiVersioning(ApiVersionConfigurer configurer) { configurer .addSupportedVersions(\"1.0\",\"1.1\",\"2.0\") .setDefaultVersion(\"1.0\") .useRequestHeader(\"X-API-Version\") .setVersionParser(new ApiVersionParser()); }"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/050.webp",
        "text": "HTTP INTERFACE CLIENTS Declarative HTTP with @HttpExchange"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/051.webp",
        "text": "HTTP INTERFACE CLIENTS Introduced in Spring Framework 6 & Spring Boot 3.0"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/052.webp",
        "text": "HTTP CLIENTS IN ACTION @HttpExchange(url = “/todos\", accept = \"application/json\") public interface TodoService { @GetExchange(\"/\") List<Todo> getAllTodos(); @GetExchange(\"/{id}\") Todo getTodoById(@PathVariable Long id); @PostExchange(\"/\") Todo createTodo(@RequestBody Todo todo); }"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/053.webp",
        "text": "HTTP CLIENTS IN ACTION @Bean public TodoService todoService(RestClient.Builder restClientBuilder) { var restClient = restClientBuilder .baseUrl(\"https: jsonplaceholder.typicode.com\") .build(); / / } var adapter = RestClientAdapter.create(restClient); var factory = HttpServiceProxyFactory.builderFor(adapter).build(); return factory.createClient(TodoService.class);"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/054.webp",
        "text": "HTTP CLIENTS IN ACTION @HttpExchange(url = “/todos\", accept = \"application/json\") public interface TodoService { @GetExchange(\"/\") List<Todo> getAllTodos(); @GetExchange(\"/{id}\") Todo getTodoById(@PathVariable Long id); } / / @Configuration(proxyBeanMethods = false) @ImportHttpServices(TodoService.class) public class HttpClientConfig { That's it! }"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/055.webp",
        "text": "HTTP CLIENTS IN ACTION @Configuration @ImportHttpServices(group = \"jsonplaceholder\", types = {TodoService.class, PostService.class}) @ImportHttpServices(group = \"github\", types = {RepoService.class, IssueService.class}) public class MultiApiConfig { @Bean RestClientHttpServiceGroupConfigurer groupConfigurer() { return groups { groups.filterByName(\"jsonplaceholder\") .forEachClient((group, builder) builder .baseUrl(\"https: jsonplaceholder.typicode.com/\") .build()); > > - - / / / / > } - } }; groups.filterByName(\"github\") .forEachClient((group, builder) builder .baseUrl(\"https: api.github.com\") .defaultHeader(\"Accept\", \"application/vnd.github.v3+json\") .build());"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/056.webp",
        "text": "BUILT-IN RESILIENCE No more Spring Retry dependency"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/057.webp",
        "text": "RESILIENCE FEATURES • @Retryable - retry failed methods with backoff • RetryTemplate - dynamic control over retry • @ConcurrencyLimit - throttle concurrent calls • Exponential backoff (1s, 2s, 4s, 8s...) • Jitter support - prevent thundering herd • All built into Spring Framework 7 Core"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/058.webp",
        "text": "RESLIANCE IN ACTION & & = ! : : > - = = @Service public class RestaurantService { @Retryable( maxAttempts = 4, includes = RestaurantApiException.class, delay = 1000, multiplier = 2 ) public List<MenuItem> getMenuFromPartner(String restaurantId) { if (random.nextDouble() < 0.4) { throw new RestaurantApiException(\"Partner restaurant API is temporarily unavailable\"); } Restaurant restaurant = dataLoader.getRestaurant(restaurantId); if (restaurant null) { throw new RestaurantApiException(\"Restaurant not found: \" + restaurantId); } List<MenuItem> menu = restaurant.menuItemIds().stream() .map(dataLoader getMenuItem) .filter(item item null item.available()) .toList(); return menu; } }"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/059.webp",
        "text": "RESLIANCE IN ACTION public DriverAssignmentService(DriverRetryListener driverRetryListener) { this.driverRetryListener = driverRetryListener; RetryPolicy retryPolicy = RetryPolicy.builder() .maxAttempts(10) .delay(Duration.ofMillis(2000)) .multiplier(1.5) .maxDelay(Duration.ofMillis(10000)) .includes(NoDriversAvailableException.class) .build(); } retryTemplate = new RetryTemplate(retryPolicy); retryTemplate.setRetryListener(driverRetryListener);"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/060.webp",
        "text": "RESLIANCE IN ACTION @Service public class RestaurantNotificationService { private static final Logger log = LoggerFactory.getLogger(RestaurantNotificationService.class); @ConcurrencyLimit(3) public void notifyRestaurant(Order order) { LocalTime start = LocalTime.now(); log.info(\"[CONCURRENT] Sending notification to restaurant for order {} (Thread: {})\", order.id(), Thread.currentThread().getName()); Simulate notification taking time (network call, webhook, etc.) simulateDelay(Duration.ofSeconds(2)); } / / } LocalTime end = LocalTime.now(); log.info(\"[CONCURRENT] Notification sent for order {} (took {}ms)\", order.id(), Duration.between(start, end).toMillis());"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/061.webp",
        "text": "REST TEST CLIENT A modern testing facade"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/062.webp",
        "text": "HTTP CLIENTS A quick history lesson on Http Clients"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/063.webp",
        "text": "RestTestClient"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/064.webp",
        "text": "REST TEST CLIENT IN ACTION @WebMvcTest(TodoSimpleController.class) @AutoConfigureRestTestClient public class TodoSimpleControllerTest { @Autowired RestTestClient client; @Test public void findAllTodos() { List<Todo> todos = client.get() .uri(\"/api/todos/simple/\") .exchange() .expectStatus().isOk() .expectBody(new ParameterizedTypeReference<List<Todo .returnResult() .getResponseBody(); > > } assertEquals(1, todos.size()); assertEquals(\"First Todo\", todos.get(0).title()); () {})"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/065.webp",
        "text": "OPEN TELEMETRY A new spring boot starter"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/066.webp",
        "text": "KEY CONCEPTS • Single Dependency: spring-boot-starter-opentelemetry - replaces complex setup • Automatic instrumentation: HTTP server/client, JDBC & more • Log correlation: Automatic trace/span ID injection into logs • OLTP export: Works with any OpenTelemetry-compatible backend • Production ready: Official Spring Support, no alpha dependencies"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/067.webp",
        "text": "LGTM STACK • Loki - for logs (Log aggregation system) • Grafana - for visualization and dashboards • Tempo - for traces (distributed tracing backend) • Mimir - for metrics (long-term storage for Prometheus metrics"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/068.webp",
        "text": "OPEN TELEMETRY SPRING BOOT STARTER spring: application: name: my-app / / / / / / management: tracing: sampling: probability: 1.0 # 100% for development otlp: metrics: export: url: http: localhost:4318/v1/metrics opentelemetry: tracing: export: otlp: endpoint: http: localhost:4318/v1/traces logging: export: otlp: endpoint: http: localhost:4318/v1/logs"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/069.webp",
        "text": ""
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/070.webp",
        "text": "JMS CLIENT Virtual Threads"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/071.webp",
        "text": "UNIFIED JMS CLIENT • Modern alternative to JmsTemplate • Fluent API like RestClient & JdbcClient • Customizable QoS settings • Unified exception translation • Supports jakarta.jms and Spring messaging"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/072.webp",
        "text": "JMS CLIENT IN ACTION @Service public class OrderMessagingService { private final JmsClient jmsClient; public OrderMessagingService(JmsClient jmsClient) { this.jmsClient = jmsClient; } public void sendOrder(Order order) { jmsClient.send(\"orders.queue\") .withBody(order); } }"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/073.webp",
        "text": "SPRING DATA AOT REPOSITORIES Generate Repository code at build time"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/074.webp",
        "text": "SPRING DATA REPOSITORIES @Repository public interface CoffeeRepository extends ListCrudRepository<Coffee, Long> { List<Coffee> findByNameContainingIgnoreCase(String name); List<Coffee> findBySizeAndPriceGreaterThan(Size size, BigDecimal price); }"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/075.webp",
        "text": "THE SOLUTION? AOT Repositories"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/076.webp",
        "text": "50-70% Faster startup with AOT repositories Query parsing at build time, not runtime"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/077.webp",
        "text": ""
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/078.webp",
        "text": "SPRING SECURITY MFA Multi-Factor Authentication"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/079.webp",
        "text": "MULTI-FACTOR AUTH • First-class MFA in Spring Security • @EnableMultiFactorAuthentication • Factor tracking via FactorGrantedAuthority • Global or selective (per-endpoint) MFA • PASSWORD + One-Time Token out of the box"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/080.webp",
        "text": "SPRING DATA REPOSITORIES @Repository public interface CoffeeRepository extends ListCrudRepository<Coffee, Long> { List<Coffee> findByNameContainingIgnoreCase(String name); List<Coffee> findBySizeAndPriceGreaterThan(Size size, BigDecimal price); }"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/081.webp",
        "text": "What is Multi-Factor Authentication? MFA requires users to provide multiple factors to authenticate — combining something you know, have, or are. OWASP FACTOR CATEGORIES SPRING SECURITY APPROACH Something you know — Password, PIN At authentication time, Spring Security adds a FactorGrantedAuthority to Something you have — SMS, Email, Token Something you are — Biometrics track which factors have been verified. Authorization rules can then require multiple factors before granting access. Somewhere you are — Geolocation FACTOR_PASSWORD + FACTOR_OTT Something you do — Behavior profiling"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/082.webp",
        "text": "Enabling MFA Use @EnableMultiFactorAuthentication to require multiple factors globally. @Configuration @EnableWebSecurity(debug = true) @EnableMultiFactorAuthentication(authorities = { FactorGrantedAuthority.PASSWORD_AUTHORITY, FactorGrantedAuthority.OTT_AUTHORITY }) class SecurityConfig { @Bean SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception { return http .authorizeHttpRequests((authorize) authorize .requestMatchers(\"/\", \"/ott/sent\").permitAll() .requestMatchers(\"/admin \").hasRole(\"ADMIN\") .anyRequest().authenticated() ) .formLogin(withDefaults()) .oneTimeTokenLogin(withDefaults()) .build(); } > - * * Smart Redirect: Automatically sends user to missing factor's login / All URLs: Require both PASSWORD and OTT factors"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/083.webp",
        "text": "Selective MFA Require MFA only for specific endpoints using AuthorizationManagerFactories. @Bean SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception { var mfa = AuthorizationManagerFactories.multiFactor() .requireFactors( FactorGrantedAuthority.PASSWORD_AUTHORITY, FactorGrantedAuthority.OTT_AUTHORITY ) .build(); http } .authorizeHttpRequests((authorize) authorize .requestMatchers(\"/admin \").access(mfa.hasRole(\"ADMIN\")) .requestMatchers(\"/user/settings \").access(mfa.authenticated()) .anyRequest().authenticated() ) .formLogin(Customizer.withDefaults()) .oneTimeTokenLogin(Customizer.withDefaults()); return http.build(); * * /user/settings/** → Requires MFA only / > - * * / /admin/** → Requires MFA + ADMIN role Everything else → Single factor OK"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/084.webp",
        "text": "start.spring.io Spring Boot 4.0.3 is available NOW Java 25"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/085.webp",
        "text": "SHOW ME THE CODE github.com/danvega/sb4"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/086.webp",
        "text": "RESOURCES Spring Framework 7.0 Release Notes github.com/spring-projects/spring-framework/wiki Spring Boot 4.0 Release Notes github.com/spring-projects/spring-boot/wiki Road to GA Blog Series spring.io/blog/2025/09/02/road_to_ga_introduction Demo Repository github.com/danvega/sb4 Spring Portfolio Generations spring.io/projects/generations"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/087.webp",
        "text": "ROADMAP Spring Framework 6.2 Spring Framework 7.0 Available Now November 2025 • Final 6.x with long-term support • Foundation for Spring Boot 4.0 • Foundation for Boot 3.4 & 3.5 • JDK 17+, optimized for JDK 25 • JDK 17 & JDK 21 LTS • Jakarta EE 11, JSpecify, Kotlin 2.x • Deep core container revision • Bean registration, API versioning"
      },
      {
        "src": "/slides/confoo-2026-whats-new-in-spring-boot-4/088.webp",
        "text": "THANK YOU! dan.vega@broadcom.com danvega.dev @therealdanvega"
      }
    ]
  },
  "devnexus-2026-fundamentals-software-engineering-ai": {
    "pdf": "/slides/devnexus-2026-fundamentals-software-engineering-ai/devnexus-2026-fundamentals-software-engineering-ai.pdf",
    "pdfSize": 10362123,
    "width": 1920,
    "height": 1080,
    "slides": [
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/001.webp",
        "text": "Fundamentals of Software Engineering Nathaniel Schutta Dan Vega … In the age of AI"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/002.webp",
        "text": "Nathaniel Schutta @nts.bsky.social https://www.linkedin.com/in/nate-schutta https://ntschutta.io/ Dan Vega @therealdanvega https://www.linkedin.com/in/danvega https://danvega.dev"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/003.webp",
        "text": "Part 1: Core Skills 1. Programmer to Engineer 2. Reading Code 3. Writing Code Part 2: Technical Practices 4. Software Modeling 5. Automated Testing 6. Working with Existing Code Part 3: Application Development and Design 7. User Interface Design 8. Working with Data 9. Software Architecture 10.To Production Part 4: Professional Development and Growth 11.Powering Up Your Productivity 12.Learning to Learn 13.Mastering Soft Skills in the Tech World 14.Career Management 15.The AI-Powered Software Engineer"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/004.webp",
        "text": "Do the fundamentals still matter?"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/005.webp",
        "text": "Where do the fundamentals matter?"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/006.webp",
        "text": "…In the age of AI"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/007.webp",
        "text": "A brief history of abstractions We've always been building layers to make things easier. Punch Cards & Machine Code Assembly Language High-Level Languages OOP & Frameworks Cloud & Platforms AI-Assisted Development 1950s 1960s 1970s 1990s 2010s 2020s Programmers spoke the machine's language Mnemonics replaced raw binary C, COBOL, Fortran abstracted hardware Java, patterns, and reusable components Managed infrastructure and serverless Copilots, agents, and code generation Every new abstraction made us more productive — but never eliminated the need to understand what's happening underneath."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/008.webp",
        "text": "Here we go again... Every few years, something new is going to make developers obsolete. 2000s IDEs & code generators \"Drag-and-drop will replace coding\" 2010s Frameworks & low-code \"Anyone can build an app now\" 2018+ No-code platforms \"Developers are the new buggy whip makers\" 2023+ AI code assistants \"Why learn to code at all?\" Yet here we are."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/009.webp",
        "text": "Are our roles changing? Absolutely!"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/010.webp",
        "text": "But first... What does a Software Engineer actually do?"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/011.webp",
        "text": "Write Code. Go Home …right?"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/012.webp",
        "text": "What a Software Engineer really does Requirements & Planning System Design & Architecture Writing Code Testing & Debugging Code Review Deployment & CI/CD Monitoring & Performance Communication & Collaboration Security & Compliance Documentation Mentoring & Leadership Problem Solving Writing code is just one piece of the puzzle"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/013.webp",
        "text": ""
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/014.webp",
        "text": "Before we say AI replaces software engineers…"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/015.webp",
        "text": "Let’s make sure we understand what they actually do."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/016.webp",
        "text": "Meanwhile… The Market Panicked."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/017.webp",
        "text": "fl The software industry has ebbed and owed before."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/018.webp",
        "text": "There are always ups and downs to the job market."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/019.webp",
        "text": "Things seem… uncertain right now."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/020.webp",
        "text": ""
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/021.webp",
        "text": ""
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/022.webp",
        "text": ""
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/023.webp",
        "text": ""
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/024.webp",
        "text": "“ Six months ago, Dario Amodei, the CEO of massive AI company Anthropic, claimed that in half a year, AI would be \"writing 90 percent of code.\" And that was the worst-case scenario; in just three months, he predicted, we could hit a place where \"essentially all\" code is written by AI.”"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/025.webp",
        "text": ""
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/026.webp",
        "text": "fi https://bsky.app/pro le/garymarcus.bsky.social/post/3lkdxwb6lzc2f"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/027.webp",
        "text": "Tool Makers Non Programmers Business"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/028.webp",
        "text": "What about vibe coding? Is this what replaces software engineers?"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/029.webp",
        "text": "/ / https: x.com/karpathy/status/1886192184808149383"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/030.webp",
        "text": "We Vibe Code a 30k / month SaaS App in 64 minutes / / https: www.youtube.com/@GregIsenberg"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/031.webp",
        "text": "“I think what AI does quite frankly is reduce the oor and raise the ceiling for all of us.” fl –Satya Nadella, Microsoft"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/032.webp",
        "text": ""
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/033.webp",
        "text": ""
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/034.webp",
        "text": "It isn’t a silver bullet"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/035.webp",
        "text": ""
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/036.webp",
        "text": "http://bit.ly/4myx9jJ"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/037.webp",
        "text": ""
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/038.webp",
        "text": "“I rmly believe that AI makes engineering more essential, not less. The fear among junior engineers is real, but it's backwards. Yes, AI can write working code from natural language, but working code and engineered systems are worlds apart.” fi – Nate B. Jones"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/039.webp",
        "text": "But the stakes matter. Vibe coding and engineered systems are worlds apart. Vibe Coding Context Engineering Personal budget tracker HR payroll system Side project landing page Healthcare records platform Internal tool prototype Financial trading system Hobby app for personal use Infrastructure at scale Proof of concept / MVP Anything with compliance or SLAs If it breaks, you adjust your budget. If it breaks, thousands don't get paid. Same tools. Completely different responsibility."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/040.webp",
        "text": "fi https://bsky.app/pro le/headius.bsky.social/post/3lmdn76ujen2l"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/041.webp",
        "text": "Code is cheap. Software is not."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/042.webp",
        "text": "Ultimately, the fundamentals matter more than ever."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/043.webp",
        "text": "One of the Real Dangers we face."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/044.webp",
        "text": "“Even as experts become the only people who can effectively check the work of ever more capable AIs, we are in danger of stopping the pipeline that creates experts.” –Ethan Mollick, Co-Intelligence"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/045.webp",
        "text": ""
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/046.webp",
        "text": "We are at a crossroad…"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/047.webp",
        "text": "Fundamentals AI Dependent"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/048.webp",
        "text": "What I’m excited about."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/049.webp",
        "text": "There is a particular type of satisfaction that comes from making something that works."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/050.webp",
        "text": "A wonderful time to be a builder. The Old Reality The New Reality The Superpower Great ideas but no time, no budget, no team. You have an idea? Build it. Today. Fundamentals + AI = an engineer who can build anything. Projects stayed on the backlog forever. Tools for yourself, side projects, prototypes — things you couldn't touch before. You're not being replaced. You're being amplified. The cost of experimentation has collapsed. This is the most exciting time in 24 years of building software. Building anything meaningful required massive investment. I don't think I've ever been this excited to build software."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/051.webp",
        "text": ""
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/052.webp",
        "text": ""
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/053.webp",
        "text": ""
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/054.webp",
        "text": ""
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/055.webp",
        "text": ""
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/056.webp",
        "text": "The Photographer 📸"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/057.webp",
        "text": "Crossing the chasm."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/058.webp",
        "text": "Fundamentals matter."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/059.webp",
        "text": "What do professional athletes work on over and over?"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/060.webp",
        "text": "The things they were taught in the beginning of their career."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/061.webp",
        "text": "Stance, grip, alignment for golfers."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/062.webp",
        "text": "Shooting form, dribbling, layups for basketball players."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/063.webp",
        "text": "They don’t spend much time on the highlight reel stuff."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/064.webp",
        "text": "https://twitter.com/DaliaShea/status/1367827097109078019"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/065.webp",
        "text": "There are any number of paths to become a software engineer."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/066.webp",
        "text": "Comp Sci undergrad degrees."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/067.webp",
        "text": "Boot camps."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/068.webp",
        "text": "Self taught."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/069.webp",
        "text": "Doesn’t really matter."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/070.webp",
        "text": "But there is a huge gulf between what we teach you…"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/071.webp",
        "text": "And what you need to be successful."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/072.webp",
        "text": "What you really need to know. What you learn in a comp sci program. What you learn in a boot camp."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/073.webp",
        "text": "Sorry about that!"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/074.webp",
        "text": "Fundamental goals are different."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/075.webp",
        "text": "Undergrad programs prepare you for…graduate programs."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/076.webp",
        "text": "Algorithms, language design, compiler theory, OS."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/077.webp",
        "text": "fi Boot camps cram speci cs into a *very* short time frame."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/078.webp",
        "text": "Frameworks, language du jour."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/079.webp",
        "text": "More practical? Maybe. More transitory? Maybe."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/080.webp",
        "text": "Some of these bootcamps are run by Universities!"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/081.webp",
        "text": "🤔"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/082.webp",
        "text": "fi #probably ne"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/083.webp",
        "text": "Mostly, we teach you how to code."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/084.webp",
        "text": "You learn a language or three."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/085.webp",
        "text": "Become familiar with our good friends foo and bar."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/086.webp",
        "text": "https://twitter.com/corneil/status/1431133997124423680"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/087.webp",
        "text": "Learn a bit about debugging."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/088.webp",
        "text": "But a lot of important things are left out. For various reasons."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/089.webp",
        "text": "Time for one."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/090.webp",
        "text": "Undergrad degree might put you at an advantage…for a year or two."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/091.webp",
        "text": "But things usually even out."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/092.webp",
        "text": "Don’t forger, the “traditional” undergrad comp sci program?"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/093.webp",
        "text": "Didn’t exist at most schools until relatively recently."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/094.webp",
        "text": "And early on, they were often math heavy…"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/095.webp",
        "text": "Some people think math aptitude is required."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/096.webp",
        "text": "It isn’t."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/097.webp",
        "text": "https://twitter.com/adammgrant/status/1406978898181636099"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/098.webp",
        "text": ""
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/099.webp",
        "text": "There’s one other key component…"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/100.webp",
        "text": "https://twitter.com/EmilyKager/status/1378009547734802433"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/101.webp",
        "text": "Never apologize for how you became a developer."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/102.webp",
        "text": "Ultimately it is about problem solving, tinkering, creativity."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/103.webp",
        "text": "If you have the mindset, you have it. Period."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/104.webp",
        "text": "Core Skills"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/105.webp",
        "text": "Reading code."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/106.webp",
        "text": "Despite the way we teach…"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/107.webp",
        "text": "You’ll spend far more time reading code than writing it."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/108.webp",
        "text": "Yet we jump right into writing."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/109.webp",
        "text": "Not how you’d learn French or Italian is it?"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/110.webp",
        "text": "https://twitter.com/adammgrant/status/1406978898181636099"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/111.webp",
        "text": ""
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/112.webp",
        "text": "In the era of AI, you will spend even more time reading code."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/113.webp",
        "text": "You need to be critical of code."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/114.webp",
        "text": "Anecdotally. Senior devs tend to be more skeptical of output."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/115.webp",
        "text": "Modify the results."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/116.webp",
        "text": "Less experienced devs? May just commit the output."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/117.webp",
        "text": "“Even as experts become the only people who can effectively check the work of ever more capable AIs, we are in danger of stopping the pipeline that creates experts.” –Ethan Mollick, Co-Intelligence"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/118.webp",
        "text": ""
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/119.webp",
        "text": "🤔"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/120.webp",
        "text": "Reading code is practically a developer’s nightmare."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/121.webp",
        "text": "😡"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/122.webp",
        "text": "︵ (╯°□°)╯ ┻━┻"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/123.webp",
        "text": "Why do we dislike other’s code so much?"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/124.webp",
        "text": "When we read someone’s code, we have two problems."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/125.webp",
        "text": "We need to understand the domain, the problem at hand."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/126.webp",
        "text": "And we have to see that problem through another’s eyes."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/127.webp",
        "text": "It is the later that often frustrates us the most."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/128.webp",
        "text": "We’ve all read some code and wondered “what idiot wrote this?”"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/129.webp",
        "text": "Only for you to realize…you were the idiot the wrote this!"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/130.webp",
        "text": "https://twitter.com/pawpoise/status/38010102002888704"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/131.webp",
        "text": "We’re also dealing with patches on top of patches."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/132.webp",
        "text": "Often made with inadequate time or understanding."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/133.webp",
        "text": "Ship it!"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/134.webp",
        "text": "There’s also the IKEA effect."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/135.webp",
        "text": "We place a higher value on things we’ve created."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/136.webp",
        "text": "One study found people would pay 63% more if they assembled it."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/137.webp",
        "text": "🤔"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/138.webp",
        "text": "The mere-exposure effect."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/139.webp",
        "text": "Familiarity may breed contempt…"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/140.webp",
        "text": "But we tend to prefer things we are familiar with."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/141.webp",
        "text": "Part of the dogmatism around programming languages."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/142.webp",
        "text": "fi Developers tend to think time began with the rst language learned."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/143.webp",
        "text": "“Why does Java need these new fangled Lambdas?”"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/144.webp",
        "text": "🤔"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/145.webp",
        "text": "Blub paradox."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/146.webp",
        "text": ""
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/147.webp",
        "text": "Languages exist along a power continuum."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/148.webp",
        "text": "Looking down the axis, you see languages missing key features!"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/149.webp",
        "text": "How could anyone be productive without that?!?"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/150.webp",
        "text": "Looking up the continuum, you see weird languages."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/151.webp",
        "text": "And features you don’t use (since they don’t exist in Blub!)"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/152.webp",
        "text": "We tend to get attached to a language and stick with it."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/153.webp",
        "text": "Be careful here."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/154.webp",
        "text": ""
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/155.webp",
        "text": "Important to look at other languages."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/156.webp",
        "text": "Consider learning a new language every year or two."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/157.webp",
        "text": ""
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/158.webp",
        "text": "Even if you don’t use them in your day to day work."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/159.webp",
        "text": "Learning Ruby/Python/Haskel/Lisp/ Rust/Go will change how you code."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/160.webp",
        "text": "The more languages you know, the easier it is to learn another."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/161.webp",
        "text": "You have more things to compare it to."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/162.webp",
        "text": "Oh, that’s like this in Ruby and that in JavaScript."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/163.webp",
        "text": "Diversity makes us stronger."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/164.webp",
        "text": "AI can help you understand a codebase!"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/165.webp",
        "text": "Soft Skills"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/166.webp",
        "text": "Career Exploration with AI & NotebookLM https://fundamentalsofswe.com/workshops"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/167.webp",
        "text": "fi Arti cial Intelligence (AI)"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/168.webp",
        "text": "Anyone else feeling overwhelmed? 🙋"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/169.webp",
        "text": ""
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/170.webp",
        "text": "Things we're supposed to learn right now LLMs Prompt Engineering AI Agents Cursor Context Windows GPT-5 Claude Agentic Workflows LoRA MCP Multi-Agent Systems Windsurf Fine-Tuning RAG Claude Code Context Engineering Gemini Prompt Chaining Hallucination Mitigation A2A Protocol Mistral Structured Output Constitutional AI Vector Databases Tool Calling Vibe Coding GitHub Copilot Tokens Llama Embeddings Memory Systems Grok Sampling Chain of Thought ...and that's just this week… Function Calling Agentic IDEs Guardrails DeepSeek RLHF Qwen Evals Computer Use Observability MoE"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/171.webp",
        "text": ""
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/172.webp",
        "text": "The good news? You don't need to learn all of this. You need to understand the building blocks."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/173.webp",
        "text": "The AI Developer Stack Your Application Today's focus The thing your users actually care about Agents & Workflows We're going to zoom into the Tools & Actions layer, specifically MCP. Orchestration, Multi-Agent, Agentic IDEs, Evals Tools & Actions Function Calling, Tool Use, APIs, MCP Context & Memory Prompts, RAG, Embeddings, Vector DBs, Context Windows Models GPT, Claude, Gemini, Llama, Mistral, ... Start with the layer that gives your models superpowers MCP is a single protocol that sits between your AI models and the outside world. Master this one building block, and a huge chunk of that wall of terms starts to make sense."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/174.webp",
        "text": "Will AI Replace Developers?"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/175.webp",
        "text": "“It Depends” 🤷"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/176.webp",
        "text": "What about costs of running these models?"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/177.webp",
        "text": "You are the pilot not the passenger."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/178.webp",
        "text": "“AI won’t replace developers, but developers who use AI will replace those who don’t.” –Jeff Atwood (attributed), software developer, author, blogger and entrepreneur"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/179.webp",
        "text": "Threat or Liberation?"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/180.webp",
        "text": "Your pAIr programmer."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/181.webp",
        "text": "Fundamentals AI Dependent"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/182.webp",
        "text": "/ / https: x.com/karpathy/status/1886192184808149383"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/183.webp",
        "text": "Consider these 2 scenarios Scenario 1 You want to build a personal expense tracker to categorize your monthly spending. You use vibe coding to generate the application over a weekend. If a bug miscalculates your coffee expenses, the worst outcome is a slightly inaccurate budget. Scenario 2 Your company needs a payroll system that handles thousands of employees across multiple states with different tax requirements. A bug here could mean employees don’t get paid correctly, tax obligations aren’t met, and the company faces legal consequences."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/184.webp",
        "text": "Getting Started with AI."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/185.webp",
        "text": "LLM Pricing & Tokens The Currency of LLMS"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/186.webp",
        "text": "Producing Pricing This is pricing for the the products that sit on top of the LLMs"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/187.webp",
        "text": "API Pricing API Pricing is based on Tokens"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/188.webp",
        "text": "What is a Token? Tokenizer Example ~¾ Tell me an interesting fact about Java 7 tokens · 38 characters [60751, 668, 448, 9559, 2840, 1078, 13114] of a word per token Context Window 100 tokens ≈ 75 words 1 token ≈ 4 characters Why it matters Everything going to and from the model is measured in tokens. More tokens = more cost. Tools add tokens too. ← Context Window Size (e.g., 200K tokens) → System → User → Assistant → Tools → TOKENS"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/189.webp",
        "text": "LLM Pricing Landscape Per 1M tokens · Prices as of mid-2025 Model Context Input Output Notes GPT-5 (OpenAI) ~400K $1.25 $10.00 Cached: $0.125 GPT-5 Mini ~400K $0.25 $2.00 Cached: $0.025 GPT-5 Nano ~400K $0.05 $0.40 Cached: $0.005 Claude Sonnet 4 200K $3.00 $15.00 Claude Opus 4.1 200K $15.00 $75.00 Gemini 2.5 Flash-Lite 1M $0.10 $0.40 Gemini 2.5 Flash 1M $0.30 $1.25 Gemini 2.5 Pro 1M $1.25 $10.00 >200K: $2.50/$15 Grok 3 (xAI) 131K $3.00 $15.00 Cached: $0.75 32K output Key insight: A single tool call can add 500-2,000 tokens of overhead. With 10 tools available, that's up to 20K tokens before the user even asks a question."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/190.webp",
        "text": "Context Rot Bigger context windows don't mean better answers Lost in the Middle Accuracy vs. Position in Context Liu et al., 2023 Accuracy % 75% LLMs are better at using info at the beginning or end of context. Performance degrades significantly in the middle. 65% Context Length Hurts Du et al., 2025 55% 1st 5th 10th Beginning 15th 20th Middle End Even with perfect retrieval, performance still degrades 13-85% as input length increases within claimed limits. Position of answer in document Stuffing more context isn't always the answer. This is why tools and MCP matter."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/191.webp",
        "text": "The Hidden Cost of Tools Every tool you register eats context — even when it's not used 200K Token Context Window System Prompt Tool Definitions (10 tools × ~500 tokens each) Chat History Available for user query + response Selection Accuracy Context Budget Not Reusable More tools means more chances for the model to pick the wrong one. Beyond ~20 tools, decision quality drops significantly. Each tool definition costs 200-2,000 tokens. Register 50 tools and you've burned 25-100K tokens before the conversation starts. Traditional tools are wired into one application. Want them in Slack, IntelliJ, and a CLI? Rewrite the integration 3 times. This is the exact problem MCP solves — standardized, reusable, shareable tool endpoints"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/192.webp",
        "text": "Tools"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/193.webp",
        "text": "ffi The Best Tools are the ones you’re most e cient using"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/194.webp",
        "text": ""
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/195.webp",
        "text": "AI-Assisted Feature Development https://fundamentalsofswe.com/workshops"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/196.webp",
        "text": "So now what?"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/197.webp",
        "text": "Many of us enjoy the craft of building software."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/198.webp",
        "text": "Technology changes."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/199.webp",
        "text": "Constantly."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/200.webp",
        "text": "Our industry is evolving."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/201.webp",
        "text": "Some will be tempted to just…"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/202.webp",
        "text": ""
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/203.webp",
        "text": "It’s a bold strategy Cotton. Let’s see if it pays off."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/204.webp",
        "text": "Two possible mindsets."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/205.webp",
        "text": "fi You can de ne yourself by what you’ve done in the past."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/206.webp",
        "text": "Or…"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/207.webp",
        "text": "fi You can de ne yourself by the problems you will solve in the future."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/208.webp",
        "text": "You can be reactive."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/209.webp",
        "text": "Or proactive."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/210.webp",
        "text": "Whatever path you choose, change is inevitable."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/211.webp",
        "text": "You are responsible for your career!"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/212.webp",
        "text": "No one can do it for you."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/213.webp",
        "text": "Fundamentals will always serve you well."
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/214.webp",
        "text": "“Excellence is doing ordinary things extraordinarily well.” – John W. Gardner"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/215.webp",
        "text": "Good luck!"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/216.webp",
        "text": "https://fundamentalsofswe.com"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/217.webp",
        "text": "Code: FOSEQCON25 Link: https://learning.oreilly.com/ get-learning/?code=FOSEQCON25"
      },
      {
        "src": "/slides/devnexus-2026-fundamentals-software-engineering-ai/218.webp",
        "text": "Nathaniel Schutta @nts.bsky.social https://www.linkedin.com/in/nate-schutta https://ntschutta.io/ Dan Vega @therealdanvega https://www.linkedin.com/in/danvega https://danvega.dev"
      }
    ]
  },
  "devnexus-2026-integrating-llms-java-mcp": {
    "pdf": "/slides/devnexus-2026-integrating-llms-java-mcp/devnexus-2026-integrating-llms-java-mcp.pdf",
    "pdfSize": 2039454,
    "width": 1920,
    "height": 1080,
    "slides": [
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/001.webp",
        "text": "Integrating LLMs in Java A Practical Guide to Model Context Protocol (MCP) Dan Vega · Spring Developer Advocate · @Brodcom"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/002.webp",
        "text": "About Me Learn more at danvega.dev 🧑🧑🧒🧒 Husband & Father 🏠 Cleveland ☕ Java Champion 🧑💻 Software Development 23 Years 🍃 Spring Developer Advocate 📖 Author"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/003.webp",
        "text": "/ / https: www.springofficehours.io"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/004.webp",
        "text": "Quick show of hands... Who's feeling overwhelmed? It's okay. This is a safe space."
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/005.webp",
        "text": "Things we're supposed to learn right now LLMs Prompt Engineering AI Agents Cursor Context Windows GPT-5 Claude Agentic Workflows LoRA MCP Multi-Agent Systems Windsurf Fine-Tuning RAG Claude Code Prompt Chaining Hallucination Mitigation A2A Protocol Tokens Llama Mistral Structured Output Constitutional AI Vector Databases Tool Calling Vibe Coding GitHub Copilot Context Engineering Gemini Embeddings Memory Systems Grok Sampling Chain of Thought ...and that's just this week Function Calling Agentic IDEs Guardrails DeepSeek RLHF Qwen Evals Computer Use Observability MoE"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/006.webp",
        "text": "The good news? You don't need to learn all of this. You need to understand the building blocks."
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/007.webp",
        "text": "The AI Developer Stack Your Application Today's focus The thing your users actually care about Agents & Workflows We're going to zoom into the Tools & Actions layer, specifically MCP. Orchestration, Multi-Agent, Agentic IDEs, Evals Tools & Actions Function Calling, Tool Use, APIs, MCP Context & Memory Prompts, RAG, Embeddings, Vector DBs, Context Windows Models GPT, Claude, Gemini, Llama, Mistral, ... Start with the layer that gives your models superpowers MCP is a single protocol that sits between your AI models and the outside world. Master this one building block, and a huge chunk of that wall of terms starts to make sense."
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/008.webp",
        "text": "Mcp 🗓 NOVEMBER 2024"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/009.webp",
        "text": "Protocol"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/010.webp",
        "text": "Model Context Protocol"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/011.webp",
        "text": "So let's start simple. What happens when an LLM isn't enough? Understanding LLM limitations → Tools → MCP"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/012.webp",
        "text": "“ LLMs are like super-smart interns. Brilliant Confidently Wrong → Draft design docs in seconds → Write complex code → Analyze data & summarize research → Explain anything to anyone → Invent APIs that don't exist → Fabricate citations & statistics → \"The Eiffel Tower was built in 1875\" → All with total confidence"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/013.webp",
        "text": "LLM Limitations For all the good, there are real constraints we need to address Hallucinations Invents facts and API names with total confidence Domain Gaps Uses generic wording where niche jargon is required Privacy & Security Proprietary data could leave your trusted boundary Stale Data Knowledge frozen at training cutoff — no live info Context Window Long threads get truncated; model forgets earlier details Cost & Latency High-token chains drain budgets and slow UX So how do we fix this? We have a Swiss-army lineup of solutions. Bias & Safety Can output stereotypes, toxic language, or policy violations Non-Deterministic Same prompt, different answer — flaky tests, review churn Weak Reasoning Multi-step calculations and logical deductions fail"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/014.webp",
        "text": "Taming LLM Limitations Four levers: start simple, escalate as needed 1 🛡 Prompt Guarding Encode rules that constrain behavior like tone, honesty, refusal policy. Think of it as terms of employment for our smart intern. 2 📄 Prompt Stuffing / RAG Inject fresh, task-specific context so the model quotes facts instead of guessing. Shove the answer into the context window. 3 🔧 Tools / Function Calling Let the model invoke code or APIs for real-time data, calculations, and business logic. In Spring AI, that's one annotation. 4 🌐 MCP (Resources + Prompts + Tools) Package those tools as reusable, versioned endpoints every client can share. Build once, use everywhere. Start with prompt rules → graduate to stuffing → escalate to tools → wrap best tools in MCP"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/015.webp",
        "text": "Two Categories of Tool Use Information Retrieval Taking Action Augment the model's knowledge with real-time external data Automate tasks that would otherwise need human intervention → What's tomorrow's date? → Send an email → Current weather forecast → Create a database record → Stock price for AAPL → Submit a form or PR → What are Dan Vega’s latest YouTube Videos? → Trigger a CI/CD workflow → What talks are at this conference? → Post a message to Slack Tools give LLMs hands and feet…"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/016.webp",
        "text": "Tools in Spring AI public class DateTimeTools { @Tool(description = “Get the current date & time\") String getCurrentDateTime() { return LocalDateTime.now() .atZone(LocaleContextHolder .getTimeZone().toZoneId()) .toString(); } } One annotation is all it takes Name + Description The @Tool annotation registers this method. The description tells the model when to use it. Model Decides You don't call the tool — the AI model reads the description and autonomously decides when this tool is needed."
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/017.webp",
        "text": ""
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/018.webp",
        "text": "Tokens & LLM Pricing Understanding the currency of AI"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/019.webp",
        "text": "Producing Pricing This is pricing for the the products that sit on top of the LLMs"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/020.webp",
        "text": "API Pricing API Pricing is based on Tokens"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/021.webp",
        "text": "What is a Token? Tokenizer Example ~¾ Tell me an interesting fact about Java 7 tokens · 38 characters [60751, 668, 448, 9559, 2840, 1078, 13114] of a word per token Context Window 100 tokens ≈ 75 words 1 token ≈ 4 characters Why it matters Everything going to and from the model is measured in tokens. More tokens = more cost. Tools add tokens too. ← Context Window Size (e.g., 200K tokens) → System → User → Assistant → Tools → TOKENS"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/022.webp",
        "text": "LLM Pricing Landscape Per 1M tokens · Prices as of mid-2025 Model Context Input Output Notes GPT-5 (OpenAI) ~400K $1.25 $10.00 Cached: $0.125 GPT-5 Mini ~400K $0.25 $2.00 Cached: $0.025 GPT-5 Nano ~400K $0.05 $0.40 Cached: $0.005 Claude Sonnet 4 200K $3.00 $15.00 Claude Opus 4.1 200K $15.00 $75.00 Gemini 2.5 Flash-Lite 1M $0.10 $0.40 Gemini 2.5 Flash 1M $0.30 $1.25 Gemini 2.5 Pro 1M $1.25 $10.00 >200K: $2.50/$15 Grok 3 (xAI) 131K $3.00 $15.00 Cached: $0.75 32K output Key insight: A single tool call can add 500-2,000 tokens of overhead. With 10 tools available, that's up to 20K tokens before the user even asks a question."
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/023.webp",
        "text": "Context Rot Bigger context windows don't mean better answers Lost in the Middle Accuracy vs. Position in Context Liu et al., 2023 Accuracy % 75% LLMs are better at using info at the beginning or end of context. Performance degrades significantly in the middle. 65% Context Length Hurts Du et al., 2025 55% 1st 5th 10th Beginning 15th 20th Middle End Even with perfect retrieval, performance still degrades 13-85% as input length increases within claimed limits. Position of answer in document Stuffing more context isn't always the answer. This is why tools and MCP matter."
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/024.webp",
        "text": "The Hidden Cost of Tools Every tool you register eats context, even when it's not used 200K Token Context Window System Prompt Tool Definitions (10 tools × ~500 tokens each) Chat History Available for user query + response Selection Accuracy Context Budget Not Reusable More tools means more chances for the model to pick the wrong one. Beyond ~20 tools, decision quality drops significantly. Each tool definition costs 200-2,000 tokens. Register 50 tools and you've burned 25-100K tokens before the conversation starts. Traditional tools are wired into one application. Want them in Slack, IntelliJ, and a CLI? Rewrite the integration 3 times. This is the exact problem MCP solves… standardized, reusable, shareable tool endpoints"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/025.webp",
        "text": "Model Context Protocol Exploring the building blocks of MCP"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/026.webp",
        "text": "“ MCP is a standardized protocol for giving LLMs structured access to tools, data, and systems."
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/027.webp",
        "text": "The Problem MCP Solves Build once and use everywhere instead of rebuilding integrations for every client. Without MCP With MCP ✗ Rewrite tool integrations per app ✓ Build a server once, any client connects ✗ Each client has its own bugs ✓ Standardized protocol, fewer bugs ✗ Separate maintenance burden ✓ One codebase to maintain ✗ Provider lock-in ✓ Model and provider agnostic"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/028.webp",
        "text": "Benefits of MCP 🧠 Modularity Keep AI apps light while deeply environment- Control 🔒 Fine-Grained Decide what data and tools your AI can access aware 💡 Reusability One server serves Claude, Cursor, IntelliJ, and & Security 🛡 Privacy Keep sensitive data local, you control visibility more Agnostic 👨💻 Language Works across Java, Python, TypeScript, and more Key Insight: MCP lets you package tools, context, and prompts as reusable, versioned endpoints that any AI client can discover and use."
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/029.webp",
        "text": "MCP Server vs. Traditional API Both expose functionality but they serve fundamentally different consumers. Traditional API MCP Server Consumer: Software systems & developers Consumer: LLMs and AI applications Discovery: Requires docs and manual integration Discovery: Auto-discovered by AI clients Schema: REST, GraphQL, gRPC — varies Schema: JSON-RPC 2.0 — always consistent Decision: Developer decides which endpoint to call Decision: Model autonomously picks the right tool Context: Not designed for AI context windows Context: Purpose-built for AI context windows"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/030.webp",
        "text": "“ API’s are for systems MCP’s are for LLMS"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/031.webp",
        "text": "MCP in Action Build one MCP server → every AI client gets the same capabilities Your MCP Server Java / Spring AI ↓ Claude Desktop Cursor / IDEs Spring Boot App CLI Tools Zero code changes. Write your MCP server once in Java. Every MCP-compatible client discovers and uses it automatically."
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/032.webp",
        "text": "Why Java Developers Should Care Java and Spring are first-class citizens in the MCP ecosystem 🏆 Official Java SDK 🍃 Spring AI Integration Spring donated the official MCP SDK for Java. This Spring AI has first-class MCP support. Use isn’t a third-party wrapper, it’s the reference @McpTool, auto-configuration, and the Spring implementation. programming model you already know. 🔧 Your Skills Transfer 🏢 Enterprise Ready Dependency injection, testing, security, OAuth2, Spring Security, Spring Authorization observability… everything you know about Spring Server… production-grade security from day one. applies directly to MCP servers."
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/033.webp",
        "text": "PRIMITIVES The Building Blocks of MCP Servers"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/034.webp",
        "text": "MCP Server Primitives Tools Resources Prompts Model-controlled: Claude decides when to call these. Results are used by Claude App-controlled: Our app decides when to call these. Results are used primarily by our app. User-controlled: The user decides when to use these. Used for: • Giving additional functionality to Claude Used for: • Getting data into our app • Adding context to messages Used for: • Workflows to run based on user input, like a slash command, button click, or menu option"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/035.webp",
        "text": "GitHubMCP Server Tools Prompts GitHub API Resources MCP Client DVAAS MCP Server YouTube API Tools Prompts Transistor API Resources Beehiiv API"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/036.webp",
        "text": "MCP Primitives: Tools WHAT WHEN Executable functions that AI applications can invoke to perform actions (e.g., file operations, API calls, database queries) AI needs to take action beyond just generating text — when it needs to DO something in the real world EXAMPLES read_file() Read contents of a file git_commit() Commit changes to repository write_file() Create or modify files slack_post() Send messages to Slack channels execute_sql() Run database queries web_search() Search the internet send_email() Send messages via email API calculate() Perform mathematical operations Tools are model-driven — the AI decides when to call them. Think function calling, standardized through MCP."
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/037.webp",
        "text": "MCP Primitives: Resources WHAT WHEN Data sources that provide contextual information to AI applications (e.g., file contents, database records, API responses) AI needs to understand or reference existing information before responding or taking action EXAMPLES file://project/README.md Documentation and project files calendar://events/today Schedule and meeting data db://users/profile/123 User records and data email://inbox/recent Email content and metadata git://repo/commit/history Version control information slack://channel/messages Chat history and conversations Resources are application-driven — your app decides when to load them. Think of it as giving AI access to your information universe."
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/038.webp",
        "text": "MCP Primitives: Prompts WHAT WHEN Reusable templates that help structure interactions with language models (e.g., system prompts, few-shot examples) You need consistent, well-crafted prompts across different conversations or want to standardize AI behavior patterns EXAMPLES code_reviewer Template for reviewing PRs with specific criteria customer_support Consistent tone and approach for user interactions meeting_summarizer Structured format for extracting action items data_analyst Framework for interpreting charts and metrics technical_writer Guidelines for creating docs in company style bug_triager Template for categorizing and prioritizing issues Prompts are user-driven — the user decides when to use them. Think prompt engineering, but modular and shareable."
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/039.webp",
        "text": "Primitives: Interaction Model Who controls each primitive, and what does it provide? PRIMITIVE Tools Resources Prompts CONTROLLED BY PROVIDES Model-Driven Actions The AI model decides when to call these Execute functions, call APIs, modify data Application-Driven Your app decides when to load these Context Files, database records, memory User-Driven Workflows The user decides when to use these Added to the context window on demand"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/040.webp",
        "text": "TRANSPORTS The Foundation for communication between clients and servers"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/041.webp",
        "text": "“ Transports in the Model Context Protocol (MCP) provide the foundation for communication between clients and servers. A transport handles the underlying mechanics of how messages are sent and received."
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/042.webp",
        "text": "Transports How messages are sent and received between MCP clients and servers. Uses JSON-RPC 2.0 as its wire format. Standard I/O stdio • • • • Building command-line tools Implementing local integrations Simple process communication Working with shell scripts Server-Sent Events SSE • Server-to-client streaming only • Working with restricted networks • Implementing simple updates Streamable HTTP HTTP • Building web-based integrations • Bidirectional streaming • Request / Response streaming • Modern HTTP infrastructure"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/043.webp",
        "text": "SECURITY Securing MCP Servers that can scale from local dev to global"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/044.webp",
        "text": "Authorization Allows Private Context Sharing Account Binding Third-Party Integrations Allows private context to be Enable MCP server authors Securely connect to third- shared from trusted data to bind the capabilities of a party integrations. Leverage sources. Creates a trust server to an account. The existing OAuth providers, boundary so MCP servers same server can provide SAML systems, or enterprise can access internal different functionality based identity providers like documents, customer data, on who's using it. Salesforce, GitHub, and and proprietary systems. internal databases. Without authorization, MCP servers are sandbox toys. With it, they become enterprise-ready tools."
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/045.webp",
        "text": ""
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/046.webp",
        "text": "Securing MCP Servers With Java / Spring SECURITY CHALLENGE While local MCP servers (stdio transport) may not need authentication, enterprise HTTP deployments require robust security and permission management. OAUTH2 INTEGRATION New MCP spec (2025-03-26) leverages OAuth2 framework — MCP server acts as both Resource Server (validates tokens) and Authorization Server (issues tokens). IMPLEMENTATION 1 2 3 Add Spring Security & Spring Authorization Server dependencies Configure OAuth2 client credentials in application.properties Create SecurityFilterChain for authentication and token validation"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/047.webp",
        "text": "Securing MCP Servers"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/048.webp",
        "text": "Securing MCP Servers with Spring AI / / https: spring.io/blog/2025/09/30/spring-ai-mcp-server-security"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/049.webp",
        "text": "/ / https: www.youtube.com/@danvega"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/050.webp",
        "text": "Advanced Features 🧠 Sampling 💡 Elicitations 👨💻 Completions 🛡 Progress Allows MCP servers to request LLM completions through the client, enabling agentic behaviors while the client maintains control over model access, selection, and permissions. Enables servers to request additional information from users during operations using structured JSON schemas to validate responses, allowing interactive workflows while maintaining human oversight. Provides a standardized way for servers to offer argument autocompletion suggestions for prompts and resource URIs, enabling IDE-like experiences where users receive contextual suggestions while entering values. Supports optional progress tracking for long-running operations through notification messages, allowing either side to send updates about operation status to keep users informed."
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/051.webp",
        "text": "Building MCP Servers How to build, secure, test and deploy MCP Servers in Java & Spring"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/052.webp",
        "text": ""
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/053.webp",
        "text": ""
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/054.webp",
        "text": "Building an MCP Server in Java / Spring SPRING PROGRAMMING MODEL It’s the same Spring you already know: dependency injection, annotations, auto configuration, with some additional MCP specific APIs layered on top. MCP APIs Tools Prompts Resources @McpTool @McpPrompt @McpResource Executable functions the AI can invoke. Define methods, annotate them, and Spring handles the rest. Reusable templates for structuring LLM interactions. Expose prompt templates your server offers to clients. Data sources the AI can reference. Expose files, database records, or API responses as addressable URIs."
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/055.webp",
        "text": "@Component public class VideoTools { / / / / / / / / / / } @McpTool(name = \"get-recent-videos\", description = \"Returns last 5 videos from Dan Vega's YouTube Channel\") public List<Video> getRecentVideos() { return List.of( new Video(\"Building a Terminal UI for Spring Initializr with Java\", \"https: www.youtube.com/watch?v=J9C2MiQTIYs\"), new Video(\"Spring Boot RestClient.Builder Explained (Builder Pattern)\", \"https: www.youtube.com/watch?v=aocKQ2-U3wU\"), new Video(\"Spring AI Prompt Caching: Stop Wasting Money on Repeated Tokens\", \"https: www.youtube.com/watch?v=eYb7BKW4QcU\"), new Video(\"Spring REST Client with Service Discovery (Eureka)\", \"https: www.youtube.com/watch?v=s9yyxyvYuq4\"), new Video(\"Claude Code Tasks: Stop Babysitting Your AI Agent\", \"https: www.youtube.com/watch?v=NAWKFRaR0Sk\") ); }"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/056.webp",
        "text": "@SpringBootTest class VideoToolsTest { @Autowired VideoTools videoTools; @Test void shouldReturnFiveRecentVideos() { List<Video> videos = videoTools.getRecentVideos(); assertThat(videos).hasSize(5); } / / > - } @Test void shouldReturnVideosWithTitleAndUrl() { List<Video> videos = videoTools.getRecentVideos(); assertThat(videos).allSatisfy(video { assertThat(video.title()).isNotBlank(); assertThat(video.url()).startsWith(\"https: www.youtube.com/watch?v=\"); }); }"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/057.webp",
        "text": "Testing Your MCP Servers RUN YOUR SERVER stdio Executable JAR Package as a JAR and run as a local process. Best for IDE integrations and CLI tools. TEST WITH AN MCP CLIENT Spring MCP Client Programmatic testing in your test suite Claude Desktop Interactive testing with Anthropic's desktop app HTTP Run the Server Start as a web server with Streamable HTTP transport. Best for shared/remote deployments. Cursor / Windsurf / Junie Test inside your IDE's AI assistant Any MCP Client The protocol is open — use whatever fits"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/058.webp",
        "text": ""
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/059.webp",
        "text": "“ You have an MCP Server, where and how do you deploy it for anyone to use?"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/060.webp",
        "text": "Tanzu Platform Delivers Governance & Observability Enables access and server management for cost-optimized agentic coding assistants"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/061.webp",
        "text": "DEMO Dan Vega As A Service (dvaas) github.com/danvega/dvaas"
      },
      {
        "src": "/slides/devnexus-2026-integrating-llms-java-mcp/062.webp",
        "text": "Thank you! [Portrait / Avatar] danvega@gmail.com https://danvega.dev"
      }
    ]
  },
  "kcdc-2026-whats-new-in-spring-boot-4": {
    "pdf": "/slides/kcdc-2026-whats-new-in-spring-boot-4/kcdc-2026-whats-new-in-spring-boot-4.pdf",
    "pdfSize": 1584314,
    "width": 1920,
    "height": 1080,
    "slides": [
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/001.webp",
        "text": "SPRING BOOT 4 · NOVEMBER 2025 What's New in Spring Boot 4 Spring Framework 7 & Spring Boot 4 DV Dan Vega Spring Developer Advocate · Broadcom"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/002.webp",
        "text": "WHO'S TALKING Dan Vega Spring Developer Advocate · Broadcom BACKGROUND FIND ME • Java Champion • danvega.dev • Author: Fundamentals of Software Engineering (O'Reilly) • YouTube · Blog · Podcast • X / Twitter: @therealdanvega • 25+ years building software • Cleveland, OH · Husband & Father Spring Boot 4 · Spring Framework 7 • LinkedIn, Bluesky"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/003.webp",
        "text": "/ / https: www.springofficehours.io"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/004.webp",
        "text": "PART ZERO Where We've Been A quick recap of the Spring Boot 3.x line."
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/005.webp",
        "text": "“ You can't really know where you are going until you know where you have been. — Maya Angelou"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/006.webp",
        "text": ""
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/007.webp",
        "text": "SPRING BOOT 3.X · 2022 → 2025 Three years, six releases 3.0 Nov 2022 3.1 May 2023 3.2 Nov 2023 JDK 17+ · Jakarta EE 9/10 · AOT & GraalVM · Observability · HTTP Interface Clients · Problem Details Docker Compose support · Testcontainers · Spring Authorization Server JDK 21 LTS · Virtual Threads · RestClient · JdbcClient · SSL bundle reloading 3.3 May 2024 3.4 Nov 2024 3.5 May 2025 CDS support · Observability upgrades · SBOM actuator · Service Connections Structured Logging · @Fallback beans · AssertJ for MockMvc · ARM images SSL bundle metrics · Properties from env vars · Quartz from Actuator · ECS logging Spring Boot 4 · Spring Framework 7"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/008.webp",
        "text": "NOVEMBER 2025 Spring Framework 7 & Spring Boot 4 The first major release in three years."
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/009.webp",
        "text": "THE ROAD TO GA Follow along, and run the code Road to GA blog series Demo repository The Spring team documented every milestone on the way to 4.0. Every example in this talk — runnable, in one place. spring.io/blog/2025/09/02/road_to_ga_introduction github.com/danvega/sb4 Spring Boot 4 · Spring Framework 7"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/010.webp",
        "text": ""
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/011.webp",
        "text": "BASELINE UPGRADES A fresh foundation under everything JDK 17+ / JDK 25 LTS Hibernate ORM 7.x Spring Boot 4 · Spring Framework 7 Jakarta EE 11 Kotlin 2.2 Servlet 6.1 · Tomcat 11 GraalVM 25 Jackson 3 JPA 3.2 JUnit 6 Bean Validation 3.1"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/012.webp",
        "text": "THE FOUNDATION Modular Auto-Config The biggest structural change in Spring Boot 4."
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/013.webp",
        "text": "SPRING-BOOT-AUTOCONFIGURE JAR 185 KB → 2 MB JAR growth from 2014 to 2025 — one monolith of auto-configuration."
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/014.webp",
        "text": "WHAT CHANGED Auto-config split into focused modules spring-boot-starter-web → spring-boot-webmvc A new, more explicit spring-boot-webmvc starter replaces the catch-all. Each starter now brings only its own auto-configuration. Smaller footprint, sharper IDE auto-complete, fewer surprises on the classpath. Spring Boot 4 · Spring Framework 7"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/015.webp",
        "text": ""
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/016.webp",
        "text": ""
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/017.webp",
        "text": ""
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/018.webp",
        "text": "JSON, REWORKED Jackson 3 A new JSON library with big improvements."
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/019.webp",
        "text": "JACKSON 3 SUPPORT What's new in the box · Immutable, builder-based configuration · Unchecked exceptions, better for lambdas & streams · Spring Boot auto-configures a JsonMapper bean · ISO-8601 date defaults out of the box · New tools.jackson packages · Jackson 2 & 3 supported side by side during migration Spring Boot 4 · Spring Framework 7"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/020.webp",
        "text": "Inject the auto-configured mapper @Component public class DataLoader implements CommandLineRunner private final JsonMapper { jsonMapper; private final ResourceLoader resourceLoader; constructor injection — Spring wires the JsonMapper bean public DataLoader(JsonMapper jsonMapper, ResourceLoader resourceLoader) { @Override public void run(String Resource args) throws Exception { resource = resourceLoader.getResource(DONUTS_JSON_PATH); this .donuts = jsonMapper.readValue(resource.getInputStream(), new TypeReference } } > < . . . Spring Boot 4 · Spring Framework 7 / / JACKSON 3 · JSONMAPPER () {});"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/021.webp",
        "text": "JACKSON · MIGRATION ESCAPE HATCH Keep Jackson 2 defaults while you migrate spring: application: name: donut-shop jackson: serialization: indent-output: true use-jackson2-defaults: true Spring Boot 4 · Spring Framework 7 # opt back in"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/022.webp",
        "text": "JACKSON · JSON VIEWS Tag each field with the view it belongs to public record Donut ( @JsonView(Views.Summary.class) String type, @JsonView(Views.Public.class) Glaze glaze, @JsonView(Views.Public.class) List<String > toppings, @JsonView(Views.Summary.class ) @JsonFormat(shape = Shape.STRING, pattern = \"$#. BigDecimal price, @JsonView(Views.Internal.class) Integer calories, @JsonView(Views.Internal.class) LocalDateTime bakedAt ) {} # # Spring Boot 4 · Spring Framework 7 \" )"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/023.webp",
        "text": "Views compose by inheritance public class Views { Minimal info for quick listings → type, price public interface Summary {} Public API consumers → Summary + glaze, toppings, isVegan public interface Public extends Summary {} Internal → Public + calories, bakedAt public interface Internal extends Public {} Admin → everything, no restrictions public interface Admin extends Internal } / / / Spring Boot 4 · Spring Framework 7 / / / / / JACKSON · JSON VIEWS {}"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/024.webp",
        "text": "From a mutable wrapper to a fluent hint ✕ Spring Boot 3 mutable wrapper required var user = new User(\"Marcel\", …); var jv = new MappingJacksonValue (user); send wrapper, not object jv.setSerializationView( Summary.class); var response = restTemplate.postForObject(\"/create\" ,jv,String.class); ✓ Spring Boot 4 clean, immutable, fluent var user = new User(\"Marcel\", …); var response = restClient.post() .uri( \"/create\" ) .hint( JsonView.class .getName(),Summary.class ) .body(user) the actual object .retrieve() .body(String.class); / / / / Spring Boot 4 · Spring Framework 7 / / / / REQUESTING FILTERED FIELDS"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/025.webp",
        "text": "WITH JSPECIFY Null Safety Say goodbye to NullPointerExceptions… maybe."
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/026.webp",
        "text": "Ever hit a NullPointe Exception? r­ Yeah. Everyone. Every single one of you."
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/027.webp",
        "text": "THE REAL PROBLEM The problem isn't null Sometimes you genuinely want to express the absence of a value. The real problem is that nullness is usually implicit and undocumented and the compiler can't help you. Spring Boot 4 · Spring Framework 7 @therealdanvega"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/028.webp",
        "text": "JSPECIFY · JSPECIFY.DEV Four annotations, one standard @Nullable @NonNull This type usage — field, return, parameter, generic — can be null. Explicitly marks that null is not a valid value here. @NullMarked @NullUnmarked Everything in this scope is non-null by default. Nullness is unspecified — opt a scope back out. Spring Boot 4 · Spring Framework 7 @therealdanvega"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/029.webp",
        "text": "ACROSS THE PORTFOLIO JSpecify replaces Spring's JSR-305 annotations @Nullable @NonNull Spring Boot 4 · Spring Framework 7 @NonNullApi @NonNullFields @therealdanvega"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/030.webp",
        "text": "Why are we doing this? Ensure null safety in the IDE or during compilation time"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/031.webp",
        "text": "Support for JSpecify Across the Spring Portfolio of Projects"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/032.webp",
        "text": "PROGRAMMATIC BEANS BeanRegistrar API A flexible way to register beans without abusing @Bean methods."
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/033.webp",
        "text": "THE IDEA Register multiple or conditional beans programmatically Decide which beans to register at runtime. This can be driven by configuration, environment, or any logic you like. Spring Boot 4 · Spring Framework 7"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/034.webp",
        "text": "BEANREGISTRAR · IN ACTION Choose the implementation at registration time public class MessageServiceRegistrar implements BeanRegistrar { @Override public void register(BeanRegistry registry, Environment env) { String messageType = env.getProperty(\"app.message-type\", \"email\"); } } switch (messageType.toLowerCase()) { case \"email\" registry.registerBean(\"messageService\", EmailMessageService.class, spec spec.description(\"Email service via BeanRegistrar\")); case \"sms\" registry.registerBean(\"messageService\", SmsMessageService.class, spec spec.description(\"SMS service via BeanRegistrar\")); } > > > - - - > - Spring Boot 4 · Spring Framework 7"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/035.webp",
        "text": "BEANREGISTRAR · WIRING IT UP Import it like any other config @Configuration @Import(MessageServiceRegistrar.class) public class ModernConfig { other bean definitions here } / / Spring Boot 4 · Spring Framework 7"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/036.webp",
        "text": "BUILT-IN API Versioning First-class support in MVC & WebFlux."
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/037.webp",
        "text": "THE SHIFT We could always version our APIs Now there's first-class support for web endpoint versioning in MVC and WebFlux. No more custom interceptors or filters. Spring Boot 4 · Spring Framework 7"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/038.webp",
        "text": "WHAT YOU GET A versioning toolkit, not just a flag · version attribute on @GetMapping / @PostMapping · Configurable strategy via ApiVersionConfigurer · No more custom interceptors or filters · Version source: header, param, media type or path · Declare supported versions + a default version · RFC 9745 deprecation hints, framework-emitted Spring Boot 4 · Spring Framework 7"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/039.webp",
        "text": "API VERSIONING · CONTROLLER Same path, two methods, one version @GetMapping(value = \"/{version}/users\", version = \"1.0\") public List<UserDTOv1 > findAllV1() { return userRepository.findAll().stream().map(userMapper toV1).toList(); } @GetMapping(value = \"/{version}/users\", version = \"2.0\") public List<UserDTOv2 > findAllV2() { return userRepository.findAll().stream().map(userMapper toV2).toList(); } : : : : Spring Boot 4 · Spring Framework 7"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/040.webp",
        "text": "API VERSIONING · CONFIGURATION Pick a strategy, configure once @Configuration public class WebConfig implements WebMvcConfigurer @Override public void configureApiVersioning(ApiVersionConfigurer c .addSupportedVersions( \"1.0\", \"1.1\", \"2.0\" ) .setDefaultVersion( \"1.0\" ) .useRequestHeader( \"X-API-Version\" ) .setVersionParser( new ApiVersionParser ()); } } Spring Boot 4 · Spring Framework 7 c) { {"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/041.webp",
        "text": "DECLARATIVE HTTP HTTP Interface Clients Declarative HTTP with @HttpExchange."
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/042.webp",
        "text": "A QUICK HISTORY Introduced in Spring Framework 6 & Spring Boot 3.0 Spring Boot 4 makes them simpler. Still declare an interface, and Spring generates the client. Spring Boot 4 · Spring Framework 7"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/043.webp",
        "text": "HTTP CLIENTS · DECLARE Describe the API as an interface @HttpExchange(url = \"/todos\", accept = \"application/json\") public interface TodoService { @GetExchange(\"/\" ) List<Todo > getAllTodos(); @GetExchange(\"/{id}\" ) Todo getTodoById(@PathVariable Long id); @PostExchange(\"/\" ) Todo createTodo(@RequestBody Todo } Spring Boot 4 · Spring Framework 7 todo);"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/044.webp",
        "text": "No proxy factory boilerplate. Just import it. @Configuration(proxyBeanMethods = false) @ImportHttpServices(TodoService.class) public class HttpClientConfig That's it! } Spring Boot 4 · Spring Framework 7 / / HTTP CLIENTS · REGISTER {"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/045.webp",
        "text": "HTTP CLIENTS · REGISTER Configuration @Configuration @ImportHttpServices(group = \"jsonplaceholder\", types = {TodoService.class, PostService.class}) @ImportHttpServices(group = \"github\", types = {RepoService.class, IssueService.class}) public class MultiApiConfig { @Bean RestClientHttpServiceGroupConfigurer groupConfigurer() { return groups { groups.filterByName(\"jsonplaceholder\") .forEachClient((group, builder) builder .baseUrl(\"https: jsonplaceholder.typicode.com/\") .build()); } } }; groups.filterByName(\"github\") .forEachClient((group, builder) builder .baseUrl(\"https: api.github.com\") .defaultHeader(\"Accept\", \"application/vnd.github.v3+json\") .build()); > > - - / / / / > - Spring Boot 4 · Spring Framework 7"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/046.webp",
        "text": "BUILT-IN Resilience No more Spring Retry dependency."
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/047.webp",
        "text": "RESILIENCE FEATURES Retry & throttling, built into the core · @Retryable — retry failed methods with backoff · RetryTemplate — dynamic, programmatic control · @ConcurrencyLimit — throttle concurrent calls · Exponential backoff (1s, 2s, 4s, 8s…) · Jitter support — prevent the thundering herd · All built into Spring Framework 7 core Spring Boot 4 · Spring Framework 7 @therealdanvega"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/048.webp",
        "text": "Retry a flaky call with one annotation @Service public class RestaurantService { @Retryable (maxAttempts = 4 ,includes = RestaurantApiException.class ,delay = public List<MenuItem> getMenuFromPartner(String calls a flaky partner API… } } Spring Boot 4 · Spring Framework 7 / / RESILIENCE · DECLARATIVE RETRY id) { 1000 ,multiplier = 2 )"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/049.webp",
        "text": "RESILIENCE · GOING FURTHER Resilience in Action public DriverAssignmentService(DriverRetryListener driverRetryListener) { this.driverRetryListener = driverRetryListener; RetryPolicy retryPolicy = RetryPolicy.builder() .maxAttempts(10) .delay(Duration.ofMillis(2000)) .multiplier(1.5) .maxDelay(Duration.ofMillis(10000)) .includes(NoDriversAvailableException.class) .build(); } retryTemplate = new RetryTemplate(retryPolicy); retryTemplate.setRetryListener(driverRetryListener); Spring Boot 4 · Spring Framework 7"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/050.webp",
        "text": "RESILIENCE · GOING FURTHER Concurrency Cap @Service public class RestaurantNotificationService { private static final Logger log = LoggerFactory.getLogger(RestaurantNotificationService.class); @ConcurrencyLimit(3) public void notifyRestaurant(Order order) { LocalTime start = LocalTime.now(); log.info(\"[CONCURRENT] Sending notification to restaurant for order {} (Thread: {})\", order.id(), Thread.currentThread().getName()); Simulate notification taking time (network call, webhook, etc.) simulateDelay(Duration.ofSeconds(2)); } LocalTime end = LocalTime.now(); log.info(\"[CONCURRENT] Notification sent for order {} (took {}ms)\", order.id(), Duration.between(start, end).toMillis()); } / / Spring Boot 4 · Spring Framework 7"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/051.webp",
        "text": "A MODERN TESTING FACADE RestTestClient The WebTestClient API you know — for Spring MVC."
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/052.webp",
        "text": "A QUICK HISTORY LESSON One fluent, AssertJ-style client for testing It reads like a sentence, supports typed bodies and records, and is versioning-aware out of the box. Spring Boot 4 · Spring Framework 7"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/053.webp",
        "text": "RESTTESTCLIENT · IN ACTION Assertions that read like a sentence @WebMvcTest(TodoSimpleController.class) @AutoConfigureRestTestClient public class TodoSimpleControllerTest { @Autowired RestTestClient client; @Test public void findAllTodos() { List<Todo > todos = client.get() .uri(\"/api/todos/simple/\") .exchange() .expectStatus().isOk() .expectBody(new ParameterizedTypeReference .returnResult().getResponseBody(); assertEquals(1 , todos.size()); } } > < Spring Boot 4 · Spring Framework 7 () {})"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/054.webp",
        "text": "OBSERVABILITY OpenTelemetry A new Spring Boot starter."
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/055.webp",
        "text": "KEY CONCEPTS One dependency, production-ready Single dependency spring-boot-starter-opentelemetry replaces the complex setup Auto-instrumentation HTTP server / client, JDBC & more — out of the box Log correlation Automatic trace / span ID injection into your logs OTLP export Works with any OpenTelemetry-compatible backend Production ready Official Spring support! No alpha dependencies Spring Boot 4 · Spring Framework 7"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/056.webp",
        "text": "THE LGTM STACK Where your telemetry lands L G T M Loki Grafana Tempo Mimir Log aggregation Dashboards & visualization Distributed tracing Long-term metrics storage Spring Boot 4 · Spring Framework 7"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/057.webp",
        "text": "OPENTELEMETRY · CONFIGURATION Point traces, metrics & logs at a collector management: tracing: sampling.probability: 1.0 # 100% for dev otlp: metrics.export.url: http: localhost:4318/v1/metrics opentelemetry: tracing.export.otlp.endpoint: http: localhost:4318/v1/traces logging.export.otlp.endpoint: http: localhost:4318/v1/logs / / / / / / Spring Boot 4 · Spring Framework 7"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/058.webp",
        "text": ""
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/059.webp",
        "text": "MESSAGING, MODERNIZED JMS Client A fluent unified client, in the RestClient family."
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/060.webp",
        "text": "UNIFIED JMS CLIENT A modern alternative to JmsTemplate · Fluent API, like RestClient & JdbcClient · Unified exception translation · Customizable QoS settings · Supports jakarta.jms and Spring messaging Spring Boot 4 · Spring Framework 7"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/061.webp",
        "text": "JMS CLIENT · IN ACTION Send a message in two fluent lines @Service public class OrderMessagingService \\ private final JmsClient { jmsClient; public OrderMessagingService(JmsClient jmsClient) { this .jmsClient = jmsClient; } public void sendOrder(Order order) { jmsClient.send(\"orders.queue\" ).withBody(order); } } Spring Boot 4 · Spring Framework 7"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/062.webp",
        "text": "PROJECT LOOM Virtual Threads Loom is landing across the JDK and Spring is ready."
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/063.webp",
        "text": "PROJECT LOOM · THE JDK PATH Maturing release by release JDK 21 JDK 24 JDK 25 JDK 27 Virtual Threads arrive No more pinning issues Scoped Values Structured Concurrency? Spring Boot 4 · Spring Framework 7"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/064.webp",
        "text": "VIRTUAL THREADS · IN SPRING One property turns it on spring.threads.virtual.enabled=true Controllers, RestClient , schedulers and listeners all benefit. In 4.0, Spring uses the JDK's virtualthread executor under the hood wherever appropriate. Spring Boot 4 · Spring Framework 7"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/065.webp",
        "text": "BEYOND THE FRAMEWORK The Spring Portfolio AI, gRPC, Data and Security move in lockstep with Boot 4."
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/066.webp",
        "text": "GENERATIVE AI Spring AI Integrating Generative AI into your Spring applications."
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/067.webp",
        "text": "SPRING AI We're consumers of models, not trainers VERSIONS Spring Boot 3 → Spring AI 1.1.5 Spring Boot 4 → Spring AI 2.0.0 (Now GA!) THE JAVA OPPORTUNITY As application developers we aren't training models, we’re consuming them. Spring AI is far more than a facility for making REST calls. https: / / Spring Boot 4 · Spring Framework 7 www.danvega.dev/blog/can-you-use-java-for-ai"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/068.webp",
        "text": "GOOGLE REMOTE PROCEDURE CALL Spring gRPC A new first-class Spring Boot module (1.1.0 M1)."
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/069.webp",
        "text": "SPRING GRPC Why teams reach for gRPC High performance Strong typing Binary protocol over HTTP/2 — lower latency than REST. Protocol Buffers give type safety across services. Streaming support Spring integration Bidirectional streaming out of the box. Familiar auto-config, DI and annotations. Spring Boot 4 · Spring Framework 7"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/070.webp",
        "text": "SPRING DATA AOT Repositories Generate repository code at build time."
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/071.webp",
        "text": "SPRING DATA · REPOSITORIES The query methods you already write @Repository public interface CoffeeRepository extends ListCrudRepository<Coffee, Long > { List<Coffee> findByNameContainingIgnoreCase(String name); List<Coffee > findBySizeAndPriceGreaterThan(Size size, BigDecimal } Spring Boot 4 · Spring Framework 7 price);"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/072.webp",
        "text": "THE PAYOFF 50–70% faster startup with AOT repositories Query parsing happens at build time, not runtime."
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/073.webp",
        "text": "SPRING SECURITY Multi-Factor Authentication First-class MFA, built into Spring Security."
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/074.webp",
        "text": "MULTI-FACTOR AUTH First-class, and configurable · @EnableMultiFactorAuthentication · Global or selective, per-endpoint MFA · Factor tracking via FactorGrantedAuthority · PASSWORD + One-Time Token out of the box Spring Boot 4 · Spring Framework 7"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/075.webp",
        "text": "WHAT IS MFA Combine something you know, have, or are Know: password, PIN Have: SMS, email, token Are: biometrics Where: geolocation Do: behavior profiling THE SPRING SECURITY APPROACH At authentication time, Spring adds a FactorGrantedAuthority per verified factor. Authorization rules then require multiple factors e.g. FACTOR_PASSWORD + FACTOR_OTT. Spring Boot 4 · Spring Framework 7"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/076.webp",
        "text": "MFA · GLOBAL Require both factors everywhere @Configuration @EnableWebSecurity(debug = true) @EnableMultiFactorAuthentication (authorities = { FactorGrantedAuthority .PASSWORD_AUTHORITY, FactorGrantedAuthority.OTT_AUTHORITY }) class SecurityConfig { @Bean SecurityFilterChain filterChain(HttpSecurity http) throws Exception return http .authorizeHttpRequests(a a .requestMatchers( \"/\", \"/ott/sent\" ).permitAll() .requestMatchers( \"/admin \").hasRole(\"ADMIN\" ) .anyRequest().authenticated()) .formLogin(withDefaults()) .oneTimeTokenLogin(withDefaults()).build(); } } 💡 Smart Redirect: Automatically sends user to missing factor's login * * / > - Spring Boot 4 · Spring Framework 7 {"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/077.webp",
        "text": "MFA · SELECTIVE Demand MFA only where it matters @Bean SecurityFilterChain filterChain(HttpSecurity http) throws Exception { var mfa = AuthorizationManagerFactories .multiFactor().requireFactors( FactorGrantedAuthority .PASSWORD_AUTHORITY, FactorGrantedAuthority .OTT_AUTHORITY) .build(); http.authorizeHttpRequests(a a .requestMatchers( \"/admin \").access(mfa.hasRole(\"ADMIN\" )) .requestMatchers( \"/user/settings \" ).access(mfa.authenticated()) .anyRequest().authenticated()); return http.build(); } /admin/** → Requires MFA + ADMIN role * * / * > * - / Spring Boot 4 · Spring Framework 7 /user/settings/** → Requires MFA only Everything else → Single factor OK"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/078.webp",
        "text": "ROADMAP · WHAT'S NEXT Spring Boot 4.1 · May 21, 2026 gRPC first-party server / client / test modules, BOM-managed, same cadence as Boot Type Safe Paths Introduces type-safe property paths in Spring Data Commons SSRF protection InetAddressFilter blocks outbound calls to disallowed addresses Async propagation observability context follows @Async automatically Lazy JDBC connection-fetch=lazy defers the physical connection until a statement runs Spring Boot 4 · Spring Framework 7"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/079.webp",
        "text": "START.SPRING.IO Spring Boot 4.1.0 is available now Generate a project, pick Java 26, and start building."
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/080.webp",
        "text": "DEMO TIME Show Me The Code github.com/danvega/sb4"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/081.webp",
        "text": "PART ZERO Spring & Security in the times of AI How a flood of AI-generated security reports is reshaping open source, and why Spring users have nothing to panic about."
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/082.webp",
        "text": "BUT THERE IS A REAL STORY UNDERNEATH AI made finding vulnerabilities cheap. Code-scanning models have collapsed the skill and effort needed to surface a potential flaw. The result is a flood of security reports hitting open-source projects, all at once."
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/083.webp",
        "text": "SPRING, APRIL 2026 482 new security reports in a single month ≈ 6.5 65 26 historic average per month projects scanned new CVEs announced"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/084.webp",
        "text": "AND SPRING IS NOT ALONE The whole ecosystem is adjusting at once FREEBSD 270+ 20-yr vulnerabilities fixed in Firefox 150, surfaced by an AI code- old CVE in one of the industry s most secure operating scanning preview. systems, found via AI. ' MOZILLA"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/085.webp",
        "text": "SECURITY REPORTS SUBMITTED, 2026 Reports by month 482 370 internal + 112 community 72 55 6.5 Historic avg March April May per month community new AI scanning community"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/086.webp",
        "text": "VOLUME IS NOT THE SAME AS RISK Not every report is a CVE 37% Most CVEs are medium-to-low severity. of internal scan results were scope and impact. It s the sheer volume , not the danger of duplicates or invalid findings, any one finding, that makes this release worth your attention. Every report is triaged with the researcher to agree on real ' filtered out before any CVE."
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/087.webp",
        "text": "BEHIND EVERY ADVISORY Every report gets an expert STEP 01 STEP 02 STEP 03 Triaged by a committer Scope with the reporter Reporter validates the fix An expert on the very project it was reported The team works directly with the The researcher verifies the patch is correct against owns the issue. researcher to confirm the real concern. before it ships. For context: between Jan 2024 and Sep 2025, only 2.6% of vulnerabilities reported to MITRE had a public proof of concept, making this level of reporter collaboration the exception, not the norm."
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/088.webp",
        "text": "WHEN THE PATCH CADENCE SPEEDS UP, TIMING MATTERS VMware Tanzu Spring can help Day 0 access First-party support Application Advisor Fixes land in the enterprise repository The only provider that can release a fix Automated, real code upgrades as pull before the public CVE is even announced. ahead of public disclosure. requests in your CI, not just dependency bumps."
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/089.webp",
        "text": "THE TAKEAWAY New times, steady hands. The volume of reports won t return to historic norms soon, but the process protecting you hasn t changed. Stay patched, and stay calm. enterprise.spring.io calendar.spring.io ' RELEASE SCHEDULE ' SPRING ENTERPRISE"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/090.webp",
        "text": "RESOURCES Where to go next Spring Framework 7.0 release notes Spring Boot 4.0 release notes Road to GA blog series Demo repository Spring Portfolio Version Mappings Spring Release Highlights Spring Boot 4 · Spring Framework 7 spring-projects/spring-framework/wiki spring-projects/spring-boot/wiki spring.io/blog/2025/09/02/road_to_ga_introduction github.com/danvega/sb4 spring.io/projects/generations spring.io/projects/release-highlights"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/091.webp",
        "text": "ROADMAP How we got to Framework 7 Framework 6.2 Nov 2024 Framework 7.0 Nov 2025 • Final 6.x with long-term support • Foundation for Spring Boot 4.0+ • Foundation for Boot 3.4 & 3.5 • JDK 17+, optimized for JDK 25 • JDK 17 & JDK 21 LTS • Jakarta EE 11, JSpecify, Kotlin 2.x • Deep core container revision • Bean registration, API versioning Spring Boot 4 · Spring Framework 7"
      },
      {
        "src": "/slides/kcdc-2026-whats-new-in-spring-boot-4/092.webp",
        "text": "THANKS FOR WATCHING Thank you! dan.vega@broadcom.com danvega.dev @therealdanvega"
      }
    ]
  },
  "kcdc-2026-zero-to-superpowers-claude-code": {
    "pdf": "/slides/kcdc-2026-zero-to-superpowers-claude-code/kcdc-2026-zero-to-superpowers-claude-code.pdf",
    "pdfSize": 2678496,
    "width": 1920,
    "height": 1080,
    "slides": [
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/001.webp",
        "text": "C L A U D E C O D E A practical intro for engineers new to coding agents Start simple. Scale smart. Dan Vega Spring Developer Advocate · Broadcom start simple. scale smart."
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/002.webp",
        "text": "One quick disclaimer. If you're already running five terminals with custom agent and skills… This talk probably isn't for you. Go grab another coffee. We'll be in the fundamentals for most of this talk. disclaimer"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/003.webp",
        "text": "CODING AGENTS One tool today. Most of it translates to your favorite. Codex alternatives Gemini CLI Copilot Cursor Windsurf Grok Build Kiro"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/004.webp",
        "text": "I want to describe a feeling I get these days. a feeling"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/005.webp",
        "text": ""
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/006.webp",
        "text": ""
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/007.webp",
        "text": ""
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/008.webp",
        "text": ""
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/009.webp",
        "text": ""
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/010.webp",
        "text": "Social media driven development. smdd"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/011.webp",
        "text": "QUICK SHOW OF HANDS… Who's feeling overwhelmed? It's okay. This is a safe space. show of hands"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/012.webp",
        "text": "Things we're supposed to learn in coding agents. CLAUDE.md Agents the wall Hooks /clear Subagents SKILL.md MCP Memory Worktrees /init Plan Mode Plugins Skills Agent Teams"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/013.webp",
        "text": "Things we're supposed to learn in coding agents. CLAUDE.md Agents Harness Hooks /clear Subagents SKILL.md Checkpoints Permissions Routines MCP /init Memory PostToolUse Tokens Marketplace the wall Worktrees Status Line /goal Plan Mode Plugins /resume Agent Teams /context Compaction Skills Sonnet PreToolUse"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/014.webp",
        "text": "Things we're supposed to learn in coding agents. CLAUDE.md Agents Harness Hooks /clear Subagents SKILL.md Checkpoints MCP /goal Routines Tokens Marketplace /resume SessionStart Dispatch Auto-Accept Edits Plan Mode Plugins Compaction Auto Mode Slash Commands Cowork Effort Levels Skills Agent Teams /context Status Line Permissions Background Sessions /init Memory PostToolUse Side Chat Worktrees Sonnet PreToolUse Context Window Headless Mode Haiku Opus .claude/ Computer Use the wall …and that's just this week"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/015.webp",
        "text": "You are not behind. You don't need to learn all of this. You need the building blocks. Scale later. We're all on our own journey. the turn"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/016.webp",
        "text": "HELLO 👋 About me. 25 Years as a software engineer Java Champion Spring Developer Advocate · Broadcom Author danvega.dev about me"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/017.webp",
        "text": "TO DAY What we'll cover. 01 The fundamentals 02 Getting started 03 Context is the job 04 Scaling up agenda agent · harness · token · context window three surfaces · slash commands · permissions CLAUDE.md · skills · MCP subagents · hooks · goals"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/018.webp",
        "text": "SECTION 01 / 04 The fundamentals. The vocabulary everything else hangs on. section 01 01 The fundamentals 02 Getting started 03 Context is the job 04 Scaling up"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/019.webp",
        "text": "FUNDAMENTALS · 01 Agent. fundamentals"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/020.webp",
        "text": ""
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/021.webp",
        "text": "FUNDAMENTALS · 02 Harness. fundamentals"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/022.webp",
        "text": "HARNESS The machinery that builds and runs the loop. Claude Code is a harness. So are Codex, Cursor, Gemini CLI, and Copilot's agent mode. Same model, different harness, different results. harness"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/023.webp",
        "text": "harness ·the car agent ·the driver model ↓ → decide use a tool → observe ↻ repeats until the goal is done tools context safety rails orchestration read, edit, run what the model sees sandbox, approvals retries, loops driver and car"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/024.webp",
        "text": "FUNDAMENTALS · 03 Token. fundamentals"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/025.webp",
        "text": "TOKEN You don't pay for words. You pay for tokens. Ref actor tests = 9 the payment service and Roughly three quarters of a word. Claude reads, writes, and bills in them. token run the"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/026.webp",
        "text": "FUNDAMENTALS · 04 Context window. fundamentals"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/027.webp",
        "text": "CONTEXT WINDOW Working memory for one session. > /context system prompt ▮▮ tool definitions ▮▮▮▮▮▮ memory files ▮▮▮ messages ▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮ free space ▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮ 3% 9% 4% auto-compact at 95% Everything Claude is holding in its head right now. Big, but finite. 41% 43%"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/028.webp",
        "text": "T H E C AT C H Context rot. output quality More context is not better context. 18 frontier models tested. All 18 got worse as the window filled. tokens in context → context rot"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/029.webp",
        "text": "SECTION 02 / 04 Getting started. Three surfaces, slash commands, permissions. section 02 01 The fundamentals 02 Getting started 03 Context is the job 04 Scaling up"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/030.webp",
        "text": "T H R E E WAY S I N Same engine underneath. terminal desktop web fast, scriptable parallel sessions runs while you're away three ways in"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/031.webp",
        "text": "B E F O R E YO U S TA R T Two ways to pay. $/month $/token Subscription. Flat, predictable. API. Metered, no ceiling. Pro, Max, or a Team seat. One pool across chat and Code. Great for scripts and CI. Pricey for daily coding. A stray ANTHROPIC_API_KEY silently moves you to the right column. /status shows your route. pricing"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/032.webp",
        "text": "D E M O · 0 1 A first session. Open a project. Run claude. Ask for one small thing. Watch the loop. → jump to claude code demo 01"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/033.webp",
        "text": "TRUST, BUT VERIFY Permissions. plan mode permissions ask every time auto-accept edits auto mode skip everything"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/034.webp",
        "text": "THE ONE FOLDER TO KNOW .claude/ .claude/ ├── commands/your custom slash commands ├── agents/subagent configs (YAML) ├── skills/SKILL.md folders ├── hooks/lifecycle shell scripts Everything custom about your Claude ├── settings.json project settings Code setup lives here. Memory. └── settings.local.json your overrides (gitignored) Commands. Agents. Skills. Hooks. CLAUDE.md project memory (root of repo) .claude"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/035.webp",
        "text": ".claude/settings.json INSIDE .CLAUDE settings.json { \"model\": \"sonnet\", \"permissions\": { \"allow\": [\"Bash(./mvnw *)\", \"Bash(git diff *)\", \"Read\"], \"deny\": [\"Bash(rm -rf *)\", \"Bash(mvn deploy *)\", One JSON file controls permissions, environment, and team-wide defaults. Checked into the repo, it travels with the project. \"Read(./.env)\"], \"ask\": [\"Bash(git commit *)\", \"Bash(git push *)\"] }, \"env\": { \"SPRING_PROFILES_ACTIVE\": \"test\" } } settings.json"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/036.webp",
        "text": "M AY B E M Y FAVO R I T E F E AT U R E Plan mode. Hit ⇧ Tab twice. Claude goes read-only. The difference between \"oh no\" and \"yes, do exactly that.\" plan mode 01 Explore the codebase 02 Ask clarifying questions 03 Write a markdown plan 04 You approve · it executes"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/037.webp",
        "text": "D E M O · 0 2 Permissions and plan mode. A new project, from first prompt to trusted setup. → jump to claude code demo 02"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/038.webp",
        "text": "SECTION 03 / 04 Context is the job. Steering Claude with what you already know. section 03 01 The fundamentals 02 Getting started 03 Context is the job 04 Scaling up"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/039.webp",
        "text": "This is where you can take a coding agent from a nice parlor trick to an irreplaceable teammate. context is the job"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/040.webp",
        "text": "The model is only as good as the context you give it. context is the job"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/041.webp",
        "text": "THREE GAPS, THREE FIXES Three ways the model comes up short. GAP 01 GAP 02 GAP 03 CLAUDE.md Skills MCP What it should always What it should know how to What it cannot see from know about this project. do. where it sits. the three gaps"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/042.webp",
        "text": "CLAUDE.md A plain markdown file at the root of your repo. Claude reads it every session, automatically. What this project is The stack and key conventions How to run, test, and build Gotchas: what you wish someone told you on day one 20 minutes writing a good one = every future session is sharper. # # claude.md # # # # PROJECT MEMORY CLAUDE.md # spring-petclinic Java 21 · Spring Boot 3.4 · PostgreSQL · Maven Conventions - Constructor injection only - Records for DTOs - Tests use Testcontainers, not H2 Run it $ ./mvnw spring-boot:run Gotchas - Migrations live in db/migration, not resources/"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/043.webp",
        "text": "PROJECT MEMORY · THE CRAFT Write one that actually helps. VAGUE · DON'T SPECIFIC · DO \"Write good code.\" \"Use 2-space indent, no semicolons.\" \"Follow best practices.\" \"Constructor injection only.\" \"Format things properly.\" \"DTOs are records in model/.\" \"Test your changes.\" \"Run ./mvnw verify before done.\" Claude already tries to do all of this. Zero signal. Concrete rules Claude can't guess. Real signal. Structure it. Headings and bullets, not prose. claude.md craft Keep it tight. Every line costs context. Revisit it. Fix the file, not just the chat."
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/044.webp",
        "text": "CLAUDE.md KEEP IT LEAN Progressive disclosure. # Payments API Constructor injection only. Run ./mvnw verify before done. Testing conventions: @docs/testing.md Point at the details instead of pasting DB migrations: @docs/migrations.md them. Claude reads a file only when Release process: @docs/release.md the task needs it. Loaded up front: 8 lines. Loaded on demand: everything else. progressive disclosure"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/045.webp",
        "text": "G A P 0 2 · W H AT I T S H O U L D K N O W H O W T O D O A skill is a folder with a SKILL.md. Expertise packaged once, pulled in on demand. Not crammed into every prompt. skills"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/046.webp",
        "text": "SKILLS What one looks like. The description is the trigger. Claude reads it to decide when the skill applies. The body is the playbook. Steps, conventions, commands. name: readme description: Write, rewrite, or review a README so it serves its actual reader. Use whenever the task is creating or improving a README. A README has one job: get the reader to what they came for in under a minute. Ground rules It's just markdown. In the repo, reviewed and versioned - Open with one plain sentence saying like code. what the project is and who it's for - Verify every command against the repo - No hype. Show a code sample instead. - - # - skill.md - # - - .claude/skills/readme/SKILL.md"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/047.webp",
        "text": "SKILLS If you explain it twice, make it a skill. new-endpoint scaffold a REST endpoint the way this team does it db-migration write a Flyway migration, naming and all code-review review a diff against the team's checklist release-notes turn merged PRs into a changelog, in house style skill examples"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/048.webp",
        "text": "SKILLS IN THE WILD One video, nine skills. PLAN video-develop-idea Is this worth making? Research demand, find the angle, scope it. video-packaging Lock the title, thumbnail concept, and first 30 seconds. video-project Scaffold the project folder from my template. → BUILD PUBLISH video-demo-design video-thumbnail Design and build the demo code the camera sees. Render the final thumbnail in the channel's style. → video-rough-cut Trim dead air, filler words, and retakes. video-motion-graphics Add lower thirds, titles, callouts, punch-in zooms. video-shorts Chop it into vertical shorts with burned-in captions. video-x-clips Cut clips for X with the post copy written. Also in the library: Spring Boot 4 reference skills (modular-auto-config, rest-test-client, jackson-3 , writing skills (readme, newsletter-publish, blogseo-optimize), and the Spring Office Hours episode pipeline. ) skill library"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/049.webp",
        "text": "G A P 0 3 · W H AT I T C A N N O T S E E F R O M W H E R E I T S I T S MCP is a standard plug for outside tools. One protocol. Any tool that speaks it, Claude can see and use. mcp"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/050.webp",
        "text": "MCP What connecting looks like. One command to connect. The server does the rest. Claude discovers the tools. The server advertises what it can do. You stay in charge. Tool use runs through the same permissions. / / mcp connect terminal $ claude mcp add danvega \\ https: mcp.danvega.dev ✓ Connected to danvega ✓ 4 tools discovered: get_posts · get_talks · get_courses · search_content"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/051.webp",
        "text": "MCP Wherever Claude is guessing, plug in the source. github postgres read the real issue, comment on the real PR query the actual schema, not a guess at it chrome-devtools figma drive a real browser: live DOM, console, network build from the design file, not a screenshot cloudflare context7 manage workers, DNS, and logs on your real account current docs for your framework version, not training data mcp examples"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/052.webp",
        "text": "CONTEXT IS THE JOB Skills versus MCP. SKILLS MCP Teach Claude how. Give Claude tools. Markdown playbooks for repeatable work. Static. Can't reach outside the repo. Live connections to tickets, databases, APIs. Capabilities. They don't teach taste. \"how we write Flyway migrations\" TOGETHER skills vs mcp \"read the production schema\" MCP reads the real schema. The skill writes the migration your way."
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/053.webp",
        "text": "D E M O · 0 3 Skills and MCP. Teach it a skill, then plug in mcp.danvega.dev. → jump to claude code demo 03"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/054.webp",
        "text": "SECTION 04 / 04 Scaling up. One session to many. Watching to delegating. section 04 01 The fundamentals 02 Getting started 03 Context is the job 04 Scaling up"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/055.webp",
        "text": "An agent is a file. .claude/agents/code-reviewer.md Its own prompt you decide how it behaves name: code-reviewer Only these tools description: Reviews code for quality read only, in this case tools: Read, Glob, Grep A cheaper model model: haiku haiku for mechanical work You are a code reviewer. Give specific, actionable feedback. Its own context window the whole reason to use one It reads 40 files. You get back a paragraph. - - - what is a subagent - - - SCALING UP"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/056.webp",
        "text": "D E L E G AT I N G S A F E LY Hooks. Hard rules, not vibes. CLAUDE.md HOOKS Advises. Enforce. The model reads it. The model can drift. A script at a lifecycle point. Runs every time, no judgment call. The more you delegate, the more you want rules that cannot be talked out of. hooks"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/057.webp",
        "text": "W O R K T H AT R E P E AT S Loops and routines. Recurring and scheduled work. Your laptop does not need to be on. schedule api webhook cron-like fire from CI GitHub events loops and routines"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/058.webp",
        "text": "F R O M WAT C H I N G T O D E L E G AT I N G /goal Set the outcome, not the task. Claude keeps working, turn after turn, until it gets there. /goal Every task in PLAN.md is marked complete, and ./mvnw verify passes with output shown for each one. A task is not complete until it has a unit test and an integration test covering its behavior. Update PLAN.md after each task. Stop after 25 turns. goal"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/059.webp",
        "text": "KNOW THE DIFFERENCE /goal is not spec driven development. SPEC DRIVEN /goal The decisions, written down first. A termination condition. A full spec up front. The agent builds to it. The Keep going until this is true. Not a planning tool. spec is the contract. Don't reach for it when the task needs design decisions you haven't made yet. goal vs sdd"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/060.webp",
        "text": "RUNNING MORE THAN ONE Two agents, one repo, one mess. Git worktrees give each branch its own folder. Same history, separate working files. FROM CLAUDE One .git history, shared across all of them. claude Separate files, so builds and tests don't collide. worktree feature-auth No stashing, no branch switching mid task. OR BY HAND git worktree add /api-auth auth-fix git worktree remove . . . . - - worktrees /api-auth Cost: each folder needs its own install and build."
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/061.webp",
        "text": "D E M O · 0 4 Agents Working with subagents → jump to claude code demo 04"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/062.webp",
        "text": "Remember the wall? You know the ones that matter. CLAUDE.md Agents Harness Hooks /clear Subagents SKILL.md Checkpoints MCP /goal Routines Tokens Marketplace /resume SessionStart Dispatch Auto-Accept Edits Plan Mode Plugins Compaction Auto Mode Slash Commands Cowork Effort Levels Sonnet PreToolUse Context Window Headless Mode Haiku Computer Use the wall Skills Agent Teams /context Status Line Permissions Background Sessions /init Memory PostToolUse Side Chat Worktrees You are not behind. Start simple, scale later. We're all on our own journey. Opus .claude/"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/063.webp",
        "text": "S AV E YO U R S E L F A F E W W E E K S Mistakes I made so you don't have to. 01 Vague one-line prompts. \"Fix the bug.\" Cool. Which one? Where? What did you try? Be specific. 04 No CLAUDE.md. Re-explaining your stack every session. Twenty minutes, write it once. 02 Skipping plan mode for real work. Five minutes of planning saves an hour of \"what did you just do?\" 05 Trusting the first answer. Read the diff. Run the tests. Push back. Claude likes the pushback. 03 Never running /clear. Stale context bleeds into new tasks. Wipe between unrelated jobs. 06 Reaching for Skills/MCP/Agents too early. First learn what Claude does well bare. Then add scaffolding. mistakes"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/064.webp",
        "text": "github.com/danvega/claude-code-start-simple The code from this talk"
      },
      {
        "src": "/slides/kcdc-2026-zero-to-superpowers-claude-code/065.webp",
        "text": "That's it. Thanks.Questions? Dan Vega Spring Developer Advocate · Broadcom danvega.dev · @therealdanvega thanks"
      }
    ]
  }
}
