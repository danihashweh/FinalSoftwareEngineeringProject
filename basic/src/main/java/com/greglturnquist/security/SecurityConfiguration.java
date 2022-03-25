package com.greglturnquist.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private AuthenticationRedirect authenticationSuccessHandler;

    @Autowired
    public SecurityConfiguration(AuthenticationRedirect atshandler) {
        this.authenticationSuccessHandler = atshandler;
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers( "/admin").hasRole("ADMIN")
                .antMatchers( "/answerResults").hasRole("ADMIN")
                .antMatchers( "/controlPanel").hasRole("ADMIN")
                .antMatchers( "/dataForm").hasRole("ADMIN")
                .antMatchers( "/formResult").hasRole("ADMIN")
                .antMatchers( "/login").permitAll()
                .antMatchers( "/questions").permitAll()
                .antMatchers( "/result").permitAll()
                .antMatchers( "/survey").permitAll()
                .antMatchers( "/survey2").permitAll()
                .antMatchers( "/Thanks").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/login.html")
                .successHandler(authenticationSuccessHandler)
                .failureUrl("/login-error.html")
                .permitAll();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser("user")
                .password("{noop}pass") // Spring Security 5 requires specifying the password storage format
                .roles("USER")
                .and()
                .withUser("admin")
                .password("{noop}admin")
                .roles("ADMIN");
    }

}
