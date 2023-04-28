package com.deokma.offvirt.repo;


import com.deokma.offvirt.models.User;
import org.springframework.data.repository.CrudRepository;

/**
 * @author Denis Popolamov
 */
public interface UserRepository extends CrudRepository<User, Long> {
    User findByUsername(String username);
}
