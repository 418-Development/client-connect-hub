package com.example.agile.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class ApplicationStartup {

    @Autowired
    private RoleService roleService;

    @EventListener(ApplicationReadyEvent.class)
    public void initializeRoles() {
        roleService.insertRolesIfNotExist();
    }
}
