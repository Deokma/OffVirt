package com.deokma.offvirt.controllers;

import com.deokma.offvirt.models.User;
import com.deokma.offvirt.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.security.Principal;

/**
 * @author Denis Popolamov
 */
@ControllerAdvice
@RequiredArgsConstructor
public class EverewhereController {

    private final UserService userService;

    /**
     * The method adds the logged-in user
     * attribute to all page
     *
     * @param model     Model
     * @param principal The user who logged in
     */
    @ModelAttribute
    public void addModelInformation(Model model, Principal principal) {
        User user_session = userService.getUserByPrincipal(principal);
        model.addAttribute("usersession", user_session);
    }


}
