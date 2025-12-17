---
title: "Spring Security 7 Multi-Factor Authentication: Complete Tutorial with @EnableMultiFactorAuthentication"
slug: spring-security-7-multi-factor-authentication
date: "2025-12-16T09:00:00.000Z"
published: true
description: Learn how to implement multi-factor authentication (MFA) in Spring Boot 4 using Spring Security 7's new @EnableMultiFactorAuthentication annotation. Step-by-step tutorial with one-time token login and custom PIN codes.
author: Dan Vega
tags:
  - Spring Boot
  - Spring Security
cover: spring_security_mfa_cover.png
video: https://www.youtube.com/embed/KmNAqlaKwjw
github: https://github.com/danvega/mfa
keywords: spring security mfa, spring security 7 multi factor authentication, spring boot 4 mfa, EnableMultiFactorAuthentication, spring boot two factor authentication, spring security one time token, FactorGrantedAuthority, spring boot 4 security tutorial, spring security 7 new features, how to add mfa spring boot
---

Passwords alone aren't enough anymore. You've probably experienced this yourself when logging into your bank or a 
secure website. You enter your username and password, and then you're prompted to enter a code sent to your phone or email. 
That extra step is multi-factor authentication, and Spring Security 7 now has built-in support for it.

In this tutorial, you'll learn how to implement MFA in Spring Boot 4 using the new `@EnableMultiFactorAuthentication` 
annotation. By the end, you'll have a working example that requires both a password and a one-time token before granting 
access to protected resources.

::GitHubRepo{url="https://github.com/danvega/mfa"}
Follow along with the complete working example.
::

## What is Multi-Factor Authentication?

Multi-factor authentication (MFA) requires users to verify their identity using multiple factors. OWASP categorizes these factors as:

- **Something you know**: A password, PIN, or security question answer
- **Something you have**: Access to a phone, email, or hardware token
- **Something you are**: Biometrics like fingerprints or facial recognition
- **Somewhere you are**: Geolocation
- **Something you do**: Behavioral patterns

The most common implementation combines something you know (password) with something you have (a code sent to your phone). That's exactly what you'll build in this tutorial.

## How Does Spring Security 7 Handle MFA?

Spring Security 7 introduces a clean approach to multi-factor authentication through `FactorGrantedAuthority`. 
When a user authenticates with their password, Spring Security adds a `FACTOR_PASSWORD` authority to their authentication. 
When they complete a one-time token login, it adds `FACTOR_OTT`.

Your authorization rules can then require multiple factors before granting access. If a user has only completed one factor, 
Spring Security automatically redirects them to complete the missing one. This "smart redirect" feature means you don't 
need to write custom logic to track which factors have been completed.

## Prerequisites

To follow along with this Spring Security 7 MFA tutorial, you'll need:

- Java 17 or later (Java 25 recommended for latest features)
- Spring Boot 4.0.0 or later
- Maven or Gradle
- Your favorite IDE

## Creating the Spring Boot 4 Project

Head over to [start.spring.io](https://start.spring.io) and create a new project with the following settings:

- **Project**: Maven
- **Language**: Java
- **Spring Boot**: 4.0.0
- **Group**: dev.danvega (or your own package)
- **Artifact**: mfa
- **Java**: 25
- **Dependencies**: Spring Web, Spring Security

Generate the project, extract the zip file, and open it in your IDE.

## Building the Application Endpoints

Before adding MFA, you need something to protect. Create a controller with two endpoints: a public home page and a protected admin page.

```java
package dev.danvega.mfa;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Hello World!";
    }

    @GetMapping("/admin")
    public String admin() {
        return "Admin Page";
    }

    @GetMapping("/ott/sent")
    String ottSent() {
        return "OneTimeToken Sent";
    }

}
```

The `/ott/sent` endpoint will display a confirmation message after Spring Security sends a one-time token to the user.

## Configuring Spring Security with @EnableMultiFactorAuthentication

Now for the interesting part. Create a security configuration class that enables MFA using the `@EnableMultiFactorAuthentication` annotation:

```java
package dev.danvega.mfa;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.ott.OneTimeTokenService;
import org.springframework.security.config.annotation.authorization.EnableMultiFactorAuthentication;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.authority.FactorGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import java.time.Duration;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@EnableMultiFactorAuthentication(authorities = {
        FactorGrantedAuthority.PASSWORD_AUTHORITY,
        FactorGrantedAuthority.OTT_AUTHORITY
})
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) {
        return http
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers("/", "/ott/sent").permitAll()
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                )
                .formLogin(withDefaults())
                .oneTimeTokenLogin(withDefaults())
                .build();
    }

    @Bean
    UserDetailsService userDetailsService() {
        var user = User.withUsername("user")
                .password("{noop}password")
                .roles("USER")
                .build();
        var admin = User.withUsername("admin")
                .password("{noop}password")
                .roles("ADMIN","USER")
                .build();

        return new InMemoryUserDetailsManager(user, admin);
    }

}
```

There's a lot happening here, so let's break it down.

### Understanding the @EnableMultiFactorAuthentication Annotation

The `@EnableMultiFactorAuthentication` annotation is the key to enabling MFA in Spring Security 7. The `authorities` 
parameter specifies which factors are required for a user to be considered fully authenticated:

```java
@EnableMultiFactorAuthentication(authorities = {
        FactorGrantedAuthority.PASSWORD_AUTHORITY,
        FactorGrantedAuthority.OTT_AUTHORITY
})
```

You're telling Spring Security that users need both a password (`PASSWORD_AUTHORITY`) and a one-time token (`OTT_AUTHORITY`) 
to access protected resources. You could add more factors if needed, but two is typically enough. Adding too many creates friction for your users.

### Configuring the Security Filter Chain

The `securityFilterChain` bean configures how requests are authorized and which login mechanisms are available:

```java
.formLogin(withDefaults())
.oneTimeTokenLogin(withDefaults())
```

By including both `formLogin()` and `oneTimeTokenLogin()`, Spring Security provides built-in templates for both login methods. 
The framework is smart enough to know which endpoint to redirect to based on which `FactorGrantedAuthority` is missing.

### Setting Up Test Users

The `userDetailsService` bean creates two in-memory users for testing. The `{noop}` prefix tells Spring Security to store 
passwords in plain text (only for development, never in production).

## Handling One-Time Token Generation

When a user needs to complete the one-time token factor, Spring Security generates a token. But how does that token get to the user? 
That's where `OneTimeTokenGenerationSuccessHandler` comes in.

```java
package dev.danvega.mfa;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.ott.OneTimeToken;
import org.springframework.security.web.authentication.ott.OneTimeTokenGenerationSuccessHandler;
import org.springframework.security.web.authentication.ott.RedirectOneTimeTokenGenerationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;

@Component
public class OttSuccessHandler implements OneTimeTokenGenerationSuccessHandler {

    private static final Logger log = LoggerFactory.getLogger(OttSuccessHandler.class);

    private final OneTimeTokenGenerationSuccessHandler redirectHandler = 
            new RedirectOneTimeTokenGenerationSuccessHandler("/ott/sent");

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, 
            OneTimeToken oneTimeToken) throws IOException, ServletException {
        String magicLink = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/login/ott")
                .queryParam("token", oneTimeToken.getTokenValue())
                .toUriString();

        // In production, send via email, SMS, or other delivery mechanism
        System.out.println("Magic Link: " + magicLink);
        this.redirectHandler.handle(request, response, oneTimeToken);
    }

}
```

In this example, the magic link is printed to the console. In a real application, you'd send it via email using something 
like SendGrid, or via SMS using Twilio. The `RedirectOneTimeTokenGenerationSuccessHandler` 
redirects the user to `/ott/sent` after the token is generated.

## Testing the Spring Security MFA Flow

Run your application and navigate to `http://localhost:8080/admin`. You'll be redirected to the login page.

1. Enter `admin` as the username and `password` as the password
2. Instead of seeing the admin page, you'll be redirected to the one-time token login page
3. Check your console for the magic link
4. Copy the URL and paste it in your browser (or click the link if your console supports it)
5. The token field will be auto-populated
6. Click sign in

Now you've authenticated with both factors and can access the admin page.

Notice the URL when you're redirected to the OTT login: `/login?factor.type=OTT&factor.reason=MISSING`. 
Spring Security is telling you which factor is missing. This smart redirect feature eliminates the need for custom redirect logic.

## Creating a Custom One-Time Token Service

By default, Spring Security generates a UUID for the one-time token. That works fine, but some applications prefer shorter, more user-friendly codes like a 5-digit PIN.

You can create a custom `OneTimeTokenService` to change how tokens are generated:

```java
package dev.danvega.mfa;

import org.jspecify.annotations.Nullable;
import org.springframework.security.authentication.ott.*;
import org.springframework.util.Assert;

import java.security.SecureRandom;
import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class PinOneTimeTokenService implements OneTimeTokenService {

    private static final int PIN_LENGTH = 5;
    private static final int MAX_PIN_VALUE = 100_000;

    private final Map<String, OneTimeToken> oneTimeTokenByToken = new ConcurrentHashMap<>();
    private final SecureRandom secureRandom = new SecureRandom();

    private Clock clock = Clock.systemUTC();
    private Duration tokenExpiresIn = Duration.ofMinutes(5);

    @Override
    public OneTimeToken generate(GenerateOneTimeTokenRequest request) {
        String token = generatePin();
        Instant expiresAt = this.clock.instant().plus(this.tokenExpiresIn);
        OneTimeToken ott = new DefaultOneTimeToken(token, request.getUsername(), expiresAt);
        this.oneTimeTokenByToken.put(token, ott);
        cleanExpiredTokensIfNeeded();
        return ott;
    }

    @Override
    public @Nullable OneTimeToken consume(OneTimeTokenAuthenticationToken authenticationToken) {
        OneTimeToken ott = this.oneTimeTokenByToken.remove(authenticationToken.getTokenValue());
        if (ott == null || isExpired(ott)) {
            return null;
        }
        return ott;
    }

    public void setTokenExpiresIn(Duration tokenExpiresIn) {
        Assert.notNull(tokenExpiresIn, "tokenExpiresIn cannot be null");
        Assert.isTrue(!tokenExpiresIn.isNegative() && !tokenExpiresIn.isZero(),
                "tokenExpiresIn must be positive");
        this.tokenExpiresIn = tokenExpiresIn;
    }

    private String generatePin() {
        int pin = secureRandom.nextInt(MAX_PIN_VALUE);
        return String.format("%0" + PIN_LENGTH + "d", pin);
    }

    private void cleanExpiredTokensIfNeeded() {
        if (this.oneTimeTokenByToken.size() < 100) {
            return;
        }
        for (Map.Entry<String, OneTimeToken> entry : this.oneTimeTokenByToken.entrySet()) {
            if (isExpired(entry.getValue())) {
                this.oneTimeTokenByToken.remove(entry.getKey());
            }
        }
    }

    private boolean isExpired(OneTimeToken ott) {
        return this.clock.instant().isAfter(ott.getExpiresAt());
    }

    public void setClock(Clock clock) {
        Assert.notNull(clock, "clock cannot be null");
        this.clock = clock;
    }

}
```

A few things to note about this implementation:

- **5-digit PINs**: Easier for users to type, especially on mobile devices
- **Shorter expiration**: The default is set to 5 minutes, but you can adjust it. Shorter-lived tokens are more secure since they're more susceptible to brute force than UUIDs.
- **In-memory storage**: This example stores tokens in a `ConcurrentHashMap`. For production, consider using the `JdbcOneTimeTokenService` that Spring Security provides.

Register this custom service as a bean in your security configuration:

```java
@Bean
public OneTimeTokenService oneTimeTokenService() {
    PinOneTimeTokenService service = new PinOneTimeTokenService();
    service.setTokenExpiresIn(Duration.ofMinutes(3));
    return service;
}
```

Restart your application and go through the MFA flow again. This time, the magic link will contain a 5-digit PIN instead of a UUID.

## Advanced MFA Configuration with AuthorizationManagerFactories

The `@EnableMultiFactorAuthentication` annotation applies MFA requirements globally. 
If you need more control over which endpoints require multi-factor authentication, you can configure MFA at the 
endpoint level using `AuthorizationManagerFactories`.

First, use the annotation without authorities:

```java
@EnableMultiFactorAuthentication
```

Then create authorization rules in your security filter chain:

```java
@Bean
SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    var mfa = AuthorizationManagerFactories.multiFactor()
            .requireFactors(
                FactorGrantedAuthority.PASSWORD_AUTHORITY,
                FactorGrantedAuthority.OTT_AUTHORITY
            )
            .build();
    
    return http
            .authorizeHttpRequests((authorize) -> authorize
                    .requestMatchers("/admin/**").access(mfa.hasRole("ADMIN"))
                    .requestMatchers("/user/**").access(mfa.authenticated())
                    .anyRequest().authenticated()
            )
            .formLogin(withDefaults())
            .oneTimeTokenLogin(withDefaults())
            .build();
}
```

This approach lets you require MFA for some endpoints while allowing single-factor authentication for others.

### Time-Based Re-Authentication

You can also require re-authentication after a certain amount of time:

```java
var passwordIn30m = AuthorizationManagerFactories.multiFactor()
        .requireFactor((factor) -> factor
                .passwordAuthority()
                .validDuration(Duration.ofMinutes(30))
        )
        .build();
```

This configuration requires users to re-enter their password if they authenticated more than 30 minutes ago. This is useful for sensitive operations like changing account settings or making purchases.

## Debugging Spring Security MFA Issues

If you run into issues, Spring Security provides excellent debugging tools.

### Enable Debug Mode

Add `debug = true` to your `@EnableWebSecurity` annotation:

```java
@EnableWebSecurity(debug = true)
```

This prints detailed information about the security filter chain. Remember to remove this before deploying to production since it can expose sensitive information.

### Enable Trace Logging

For even more detail, add this to your `application.yaml`:

```yaml
logging:
  level:
    org.springframework.security: TRACE
```

This logs every security decision, which is invaluable when troubleshooting authentication failures.

## Common Questions About Spring Security MFA

### What's the difference between OTT and OTP?

One-Time Token (OTT) and One-Time Password (OTP) serve similar purposes but differ in implementation. OTT tokens are generated by your application and delivered to the user (via email or SMS). OTP codes are generated by an external tool like Google Authenticator using a shared secret. Spring Security 7's built-in MFA support focuses on OTT, though you can implement OTP with custom authentication providers.

### Can I use more than two factors?

Yes, you can add as many `FactorGrantedAuthority` values as you need to the `@EnableMultiFactorAuthentication` annotation. However, each additional factor adds friction for your users. Two factors (password + OTT) is the most common configuration.

### Should I use InMemoryOneTimeTokenService or JdbcOneTimeTokenService?

The `InMemoryOneTimeTokenService` is fine for development and testing, but tokens are lost when the application restarts and won't work in clustered environments. For production, use `JdbcOneTimeTokenService` to persist tokens in a database.

## Source Code and Resources

You can find the complete code for this tutorial on [GitHub](https://github.com/danvega/mfa).

For more details on Spring Security 7's MFA capabilities, check out these resources:

- [Spring Security MFA Documentation](https://docs.spring.io/spring-security/reference/servlet/authentication/mfa.html)
- [One-Time Token Login Documentation](https://docs.spring.io/spring-security/reference/servlet/authentication/onetimetoken.html)
- [What's New in Spring Security 7](https://docs.spring.io/spring-security/reference/whats-new.html)

Happy Coding!