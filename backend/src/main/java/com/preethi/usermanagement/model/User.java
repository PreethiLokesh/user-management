package com.preethi.usermanagement.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "Name cannot be blank")
    private String name;

    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Enter a valid email address")
    private String email;

    @NotBlank(message = "Phone cannot be blank")
    @Size(min = 10, max = 10, message = "Phone number must be 10 digits")
    private String phone;

    @NotBlank(message = "Address cannot be blank")
    private String address;
}