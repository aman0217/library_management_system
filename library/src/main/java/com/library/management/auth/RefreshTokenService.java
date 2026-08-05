package com.library.management.auth;

import com.library.management.entity.RefreshToken;
import com.library.management.entity.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

public interface RefreshTokenService {

    RefreshToken createRefreshToken(User user);

    RefreshToken verifyRefreshToken(String token);

    @Modifying
    @Transactional
    void deleteByUser(User user);
}