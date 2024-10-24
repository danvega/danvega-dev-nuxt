---
title: Building a Spring Security Login Form with JTE
description: Learn how to create a secure login form using Spring Security and JTE (Java Template Engine) with support for both traditional authentication and OAuth2 providers.
slug: spring-boot-oauth-demo
date: 2024-10-24T17:00:00.000Z
published: true
author: Dan Vega
tags:
  - Spring Boot
  - Spring Security
cover: ./spring-security-jte-login.png
video: https://www.youtube.com/embed/f1h4GkhxMp8
github: https://github.com/danvega/spring-security-jte-demo
keywords: spring security, jte, java template engine, oauth2, login form, authentication, spring boot, java
---

Spring Security is a powerful framework for adding authentication and authorization to your applications. When combined with JTE (Java Template Engine), you can create elegant, secure login forms while maintaining clean separation between your security logic and presentation layer. In this tutorial, we'll build a custom login form that supports both traditional username/password authentication and OAuth2 providers like Google and GitHub.

## Setting Up the Project

Start by creating a new Spring Boot project with the following dependencies:

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-oauth2-client</artifactId>
    </dependency>
    <dependency>
        <groupId>gg.jte</groupId>
        <artifactId>jte-spring-boot-starter</artifactId>
        <version>3.1.9</version>
    </dependency>
</dependencies>
```

## Configuring Spring Security

Create a `SecurityConfig` class to configure Spring Security with support for both form-based and OAuth2 authentication:

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/login", "/error").permitAll()
                .anyRequest().authenticated())
            .formLogin(form -> form
                .loginPage("/login")
                .defaultSuccessUrl("/dashboard")
                .permitAll())
            .oauth2Login(oauth -> oauth
                .loginPage("/login")
                .defaultSuccessUrl("/dashboard"))
            .logout(logout -> logout
                .logoutSuccessUrl("/"))
            .build();
    }

    @Bean
    public InMemoryUserDetailsManager userDetailsManager() {
        UserDetails user = User.withUsername("admin")
            .password("{noop}admin123")
            .roles("ADMIN")
            .build();
        return new InMemoryUserDetailsManager(user);
    }
}
```

## Building the Template Structure

JTE templates are organized in a clear hierarchy under `/src/main/jte`:

```
src/
  main/
    jte/
      layout/
        default.jte    # Base layout template
      pages/
        login.jte      # Login form
        dashboard.jte  # Protected dashboard
        home.jte       # Public home page
```

Create a base layout template (`default.jte`):

```html
@import org.springframework.security.web.csrf.CsrfToken
@param CsrfToken csrf = null
@param Content content

<!DOCTYPE html>
<html>
<head>
    <title>Spring Security with JTE</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    ${content}
</body>
</html>
```

## Implementing the Login Form

Create the login form template (`login.jte`):

```html
@param String error = null
@param String logout = null
@param CsrfToken csrf

@layout.default(csrf = csrf)
    <div class="min-h-screen flex items-center justify-center">
        <div class="max-w-md w-full space-y-8">
            <div>
                <h2 class="text-center text-3xl font-bold">Sign in to your account</h2>
            </div>

            @if(error != null)
                <div class="bg-red-100 p-4 rounded-md">
                    Invalid username or password
                </div>
            @endif

            <form class="mt-8 space-y-6" action="/login" method="POST">
                @if(csrf != null)
                    <input type="hidden" name="${csrf.parameterName}" value="${csrf.token}">
                @endif

                <div>
                    <input type="text" name="username" required 
                           class="appearance-none rounded-md relative block w-full px-3 py-2 border"
                           placeholder="Username">
                </div>

                <div>
                    <input type="password" name="password" required 
                           class="appearance-none rounded-md relative block w-full px-3 py-2 border"
                           placeholder="Password">
                </div>

                <div>
                    <button type="submit" 
                            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                        Sign in
                    </button>
                </div>
            </form>

            <div class="mt-6">
                <div class="relative">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                        <span class="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                </div>

                <div class="mt-6 grid grid-cols-2 gap-3">
                    <a href="/oauth2/authorization/google" 
                       class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        Google
                    </a>
                    <a href="/oauth2/authorization/github"
                       class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        GitHub
                    </a>
                </div>
            </div>
        </div>
    </div>
```

## Handling Login Logic

Create a controller to handle the login process:

```java
@Controller
public class LoginController {

    @GetMapping("/login")
    public String login(HttpServletRequest request, Model model) {
        String error = request.getParameter("error");
        String logout = request.getParameter("logout");
        
        if (error != null) {
            model.addAttribute("error", "Invalid username or password");
        }
        
        if (logout != null) {
            model.addAttribute("logout", "You have been logged out");
        }
        
        CsrfToken csrf = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
        if (csrf != null) {
            model.addAttribute("csrf", csrf);
        }
        
        return "pages/login";
    }
}
```

## Setting Up OAuth2 Providers

### Google OAuth2 Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Configure the OAuth consent screen:
    - Navigate to "APIs & Services" > "OAuth consent screen"
    - Choose "External" user type
    - Fill in the required information:
        - App name
        - User support email
        - Developer contact information
    - Add scopes: email, profile, openid
    - Add test users if using external user type

4. Create OAuth2 credentials:
    - Go to "APIs & Services" > "Credentials"
    - Click "Create Credentials" > "OAuth client ID"
    - Choose "Web application"
    - Add these URLs:
       - Authorized JavaScript origins: http://localhost:8080
       - Authorized redirect URIs: http://localhost:8080/login/oauth2/code/google
    - Save your client ID and client secret

### GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the application details:
    - Application name: Your App Name
    - Homepage URL: `http://localhost:8080`
    - Authorization callback URL: `http://localhost:8080/login/oauth2/code/github`
4. Register the application
5. Note your client ID and generate a client secret

### Configuring OAuth2 in Your Application

Add the following configuration to your `application.yml`:

```yaml
spring:
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: ${GOOGLE_CLIENT_ID}
            client-secret: ${GOOGLE_CLIENT_SECRET}
            scope:
              - email
              - profile
          github:
            client-id: ${GITHUB_CLIENT_ID}
            client-secret: ${GITHUB_CLIENT_SECRET}
            scope:
              - user:email
              - read:user
```

For local development, you can set these environment variables in your IDE's run configuration or export them in your terminal:

```bash
export GOOGLE_CLIENT_ID=your_google_client_id
export GOOGLE_CLIENT_SECRET=your_google_client_secret
export GITHUB_CLIENT_ID=your_github_client_id
export GITHUB_CLIENT_SECRET=your_github_client_secret
```

### Security Best Practices

When working with OAuth2 credentials:

1. Never commit credentials to version control
2. Use environment variables or a secure configuration management system
3. Restrict OAuth scopes to only what's necessary
4. Always use HTTPS in production
5. Regularly rotate client secrets
6. Monitor OAuth usage for suspicious activity

### Troubleshooting OAuth2 Integration

Common issues and solutions:

1. Redirect URI Mismatch:
    - Double-check the exact URIs in your OAuth provider settings
    - Ensure no trailing slashes
    - Verify the correct protocol (http/https)
    - Confirm the port number matches

2. Authentication Errors:
    - Clear browser cookies and cache
    - Verify environment variables are set correctly
    - Check application logs for detailed error messages
    - Confirm OAuth provider console settings

## Conclusion

By combining Spring Security with JTE, you can create a secure, maintainable authentication system with a clean separation of concerns. The template engine makes it easy to create professional-looking login forms while Spring Security handles all the security concerns behind the scenes.

Some key takeaways:
- JTE provides a clean way to structure your templates and maintain a clear separation between logic and presentation
- Spring Security's configuration can be customized to support both traditional and OAuth2 authentication
- CSRF protection and error handling can be cleanly integrated into your templates

To extend this further, consider adding:
- Remember-me functionality
- Custom success/failure handlers
- Additional OAuth2 providers
- User registration flow

The complete source code for this tutorial is available on GitHub, where you can find additional configuration options and examples.