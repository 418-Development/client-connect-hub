package com.example.agile.services;
import com.example.agile.objecs.ERole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void insertRolesIfNotExist() {
        for (ERole role : ERole.values()) {
            String roleName = role.name();
            int count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM public.roles WHERE name = ?", Integer.class, roleName);
            if (count == 0) {
                jdbcTemplate.update("INSERT INTO public.roles (name) VALUES (?)", roleName);
            }
        }
    }
}
