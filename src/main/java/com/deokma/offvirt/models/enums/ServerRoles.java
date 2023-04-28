package com.deokma.offvirt.models.enums;

import org.springframework.security.core.GrantedAuthority;

/**
 * @author Denis Popolamov
 */
public enum ServerRoles implements GrantedAuthority {
    USER, ADMIN, MODERATOR;

    @Override
    public String getAuthority() {
        return name();
    }
}
